# Design Implementation Guide

Panduan implementasi desain dari Figma ke frontend menggunakan **Tailwind CSS v4**, **GSAP**, dan **Lenis**.

---

## Stack

| Library         | Versi    | Fungsi                                     |
| --------------- | -------- | ------------------------------------------ |
| `tailwindcss`   | `^4.x`   | Styling utility-first                      |
| `gsap`          | `^3.x`   | Animasi (timeline, ScrollTrigger, dll)     |
| `lenis`         | `^1.x`   | Smooth scroll yang diintegrasikan ke GSAP  |

---

## Alur Kerja: Figma → Frontend

```
Figma Design
    ↓
Inspect token (warna, spacing, radius, tipografi)
    ↓
Mapping ke Tailwind @theme / custom properties
    ↓
Markup HTML di komponen .astro
    ↓
Styling dengan Tailwind classes
    ↓
Animasi dengan GSAP (+ ScrollTrigger)
    ↓
Smooth scroll via Lenis
```

---

## 1. Tailwind CSS v4

### Setup

Project menggunakan Tailwind v4 via plugin Vite (`@tailwindcss/vite`). Konfigurasi dilakukan langsung di `src/styles/global.css` menggunakan `@theme`.

```css
/* src/styles/global.css */
@import "tailwindcss";

@theme {
  /* Warna */
  --color-violet-normal: #7b20e8;
  --color-citrus-normal: #bfed45;
  --color-spicy-normal:  #4dd3f2;
  --color-orange-normal: #fe9b2a;

  /* Tipografi */
  --font-sans:        "Plus Jakarta Sans", system-ui, sans-serif;
  --font-display:     "Momo Trust Sans", "Plus Jakarta Sans", system-ui, sans-serif;
  --font-handwriting: "Caveat", cursive;

  /* Breakpoint */
  --breakpoint-md:        768px;
  --breakpoint-lg:       1024px;
  --breakpoint-lg-large: 1440px;
}
```

### Aturan Penggunaan Tailwind

#### ✅ DO — Pakai token dari @theme & utility class bawaan Tailwind

Selalu prioritaskan token dari `@theme` dan utility class bawaan Tailwind CSS (misal: `text-base` untuk `16px`, `text-2xl` untuk `24px`, `rounded-sm` untuk `4px`, `flex-1`, `p-6` untuk `24px`, dll.).

```html
<!-- Gunakan nama token & utility bawaan yang tersedia -->
<div class="bg-violet-normal text-white text-base font-semibold rounded-sm px-5 lg:px-8">
```

#### ❌ DON'T — Menggunakan arbitrary value jika Tailwind/theme sudah menyediakan nilainya

Hindari penggunaan *arbitrary value* (seperti `bg-[#7b20e8]`, `text-[16px]`, `p-[24px]`) apabila Tailwind CSS atau `@theme` sudah menyediakan token/utility yang setara.

```html
<!-- ❌ HINDARI: arbitrary value jika sudah ada utility / token-nya -->
<div class="bg-[#7b20e8] text-[16px] p-[24px]">

<!-- ✅ GUNAKAN: utility & token bawaan Tailwind / @theme -->
<div class="bg-violet-normal text-base p-6">
```

### Content Margin (Horizontal Padding)

Sesuai `responsive.md`, margin konten diterapkan via class:

```html
<div class="px-5 md:px-7 lg:px-8 max-w-[1440px] mx-auto">
  <!-- Konten halaman -->
</div>
```

| Class    | Breakpoint | Nilai  |
| -------- | ---------- | ------ |
| `px-5`   | mobile     | `20px` |
| `px-7`   | tablet     | `28px` |
| `px-8`   | desktop+   | `32px` |

### Tipografi

Sesuai `typography.md`, gunakan class font yang sudah dikonfigurasi:

```html
<!-- Heading XL (Momo Trust Sans) -->
<h1 class="font-display text-[32px] md:text-[40px] lg:text-[54px] font-bold leading-tight tracking-tight">
  Build Your
</h1>

<!-- Aksen Caveat di akhir kalimat -->
<span class="font-handwriting text-[38px] md:text-[48px] lg:text-[64px] font-semibold text-citrus-normal">
  Portfolio.
</span>

<!-- Body / Deskripsi -->
<p class="font-sans text-base leading-relaxed text-white/60">
  Deskripsi konten di sini.
</p>
```

### Border Radius

Sesuai `radius.md`, semua elemen pakai `rounded-sm` (= 4px di Tailwind v4 default, atau override via `--radius-sm: 4px`):

```html
<button class="rounded-sm">...</button>
<div class="rounded-sm">...</div>
```

---

## 2. GSAP — Animasi

### Setup Global

GSAP dan ScrollTrigger sudah diinisialisasi di `src/scripts/smoothScroll.ts` yang diimport oleh `Layout.astro`.

### Import di Komponen

```typescript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
```

> **Catatan:** Tidak perlu `gsap.registerPlugin(ScrollTrigger)` lagi di komponen individual karena sudah dilakukan di `smoothScroll.ts`.

### Pola Animasi: Fade Up (Entrance)

Digunakan untuk elemen yang muncul saat halaman dimuat:

```typescript
gsap.from(".hero__heading", {
  y: 30,
  opacity: 0,
  duration: 0.8,
  ease: "power3.out",
  delay: 0.2,
});
```

### Pola Animasi: Stagger (Multiple Elements)

Digunakan untuk list item atau card yang muncul berurutan:

```typescript
gsap.from(".card", {
  y: 40,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
  stagger: 0.1, // setiap elemen delay 0.1s setelah sebelumnya
});
```

### Pola Animasi: ScrollTrigger (Scroll-based)

Digunakan untuk animasi yang dipicu saat elemen masuk viewport:

```typescript
gsap.from(".section-title", {
  scrollTrigger: {
    trigger: ".section-title",
    start: "top 80%",   // mulai animasi saat top elemen di 80% viewport
    end: "top 40%",
    toggleActions: "play none none reverse",
  },
  y: 40,
  opacity: 0,
  duration: 0.7,
  ease: "power3.out",
});
```

### Pola Animasi: Timeline (Berurutan)

Digunakan ketika beberapa elemen perlu dianimasi dalam urutan yang presisi:

```typescript
const tl = gsap.timeline({ delay: 0.1 });

tl.from(".hero__badge",       { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" })
  .from(".hero__heading",     { y: 30, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.2")
  .from(".hero__description", { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.2")
  .from(".hero__actions",     { y: 20, opacity: 0, duration: 0.5, ease: "power2.out" }, "-=0.1");
```

### Easing yang Direkomendasikan

| Use Case              | Ease              |
| --------------------- | ----------------- |
| Entrance element      | `power3.out`      |
| Button / hover        | `power2.inOut`    |
| Scroll-triggered      | `power2.out`      |
| Exit / leave          | `power2.in`       |
| Elastic / bouncy      | `elastic.out(1, 0.5)` |

---

## 3. Lenis — Smooth Scroll

### Setup

Lenis sudah terintegrasi dengan GSAP ScrollTrigger di `src/scripts/smoothScroll.ts`:

```typescript
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ autoRaf: false });

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

export default lenis;
```

### Mengakses Instance Lenis

Jika perlu mengontrol scroll secara programatik (misal dari tombol):

```typescript
import lenis from "../scripts/smoothScroll";

// Scroll ke elemen tertentu
document.querySelector("#cta-btn")?.addEventListener("click", () => {
  lenis.scrollTo("#next-section", { duration: 1.2, easing: (t) => 1 - Math.pow(1 - t, 4) });
});

// Scroll ke posisi tertentu
lenis.scrollTo(0); // scroll ke top

// Pause / resume (misal saat modal terbuka)
lenis.stop();
lenis.start();
```

### Stop Scroll Saat Modal / Overlay

```typescript
import lenis from "../scripts/smoothScroll";

function openModal() {
  lenis.stop();
  // ...buka modal
}

function closeModal() {
  lenis.start();
  // ...tutup modal
}
```

---

## 4. Struktur Komponen Astro

### Konvensi Penamaan File

```
src/components/
  pages/
    homepage/
      heroSection.astro
      aboutSection.astro
      projectsSection.astro
  ui/
    Button.astro
    Badge.astro
    Card.astro
```

### Template Komponen Astro

```astro
---
// Props (jika ada)
interface Props {
  title: string;
  description?: string;
}
const { title, description } = Astro.props;
---

<section id="section-name" class="section">
  <div class="mx-auto max-w-[1440px] px-5 md:px-7 lg:px-8">
    <h2 class="font-display text-[24px] md:text-[32px] lg:text-[48px] font-bold text-white">
      {title}
      <span class="font-handwriting text-[30px] md:text-[38px] lg:text-[54px] text-citrus-normal">accent.</span>
    </h2>
    {description && (
      <p class="font-sans text-base text-white/60 leading-relaxed mt-4 max-w-xl">
        {description}
      </p>
    )}
    <slot />
  </div>
</section>

<script>
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.from("#section-name h2", {
    scrollTrigger: {
      trigger: "#section-name",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
    y: 40,
    opacity: 0,
    duration: 0.7,
    ease: "power3.out",
  });
</script>
```

---

## 5. Checklist Implementasi per Komponen

Saat mengimplementasikan komponen baru dari Figma:

- [ ] Inspect token di Figma (warna, spacing, radius, font size)
- [ ] Mapping token ke `@theme` jika belum ada
- [ ] Markup HTML semantik di file `.astro`
- [ ] Styling dengan Tailwind classes
- [ ] Tambahkan animasi GSAP entrance (fade up / stagger)
- [ ] Tambahkan animasi ScrollTrigger jika section
- [ ] Pastikan responsive: mobile → tablet → desktop
- [ ] Pastikan border radius `rounded-sm` (4px) konsisten
- [ ] Pastikan content padding sesuai breakpoint (`px-5 / px-7 / px-8`)
