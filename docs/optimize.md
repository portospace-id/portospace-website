# Optimization Guide — PortoSpace Frontend

Panduan optimasi performa untuk proyek Astro + Tailwind CSS v4 + GSAP + Lenis.

---

## Stack

| Library             | Versi   | Role                              |
| ------------------- | ------- | --------------------------------- |
| `astro`             | `^7.x`  | Framework SSG / partial hydration |
| `tailwindcss`       | `^4.x`  | Utility-first CSS via Vite plugin |
| `@tailwindcss/vite` | `^4.x`  | Zero-runtime Tailwind build       |
| `gsap`              | `^3.x`  | Animation engine + ScrollTrigger  |
| `lenis`             | `^1.x`  | Smooth scroll, integrated via GSAP |
| `@lucide/astro`     | `^1.x`  | Astro-native icon components      |

---

## 1. Astro Performance

### Static Output (SSG)
Proyek ini adalah **Static Site** (default Astro). Tidak ada client-side JS framework (React/Vue), semua komponen di-render menjadi HTML statis saat build.

```bash
astro build   # Output: dist/ (HTML + CSS + minimal JS)
```

### Islands Architecture — Batasi Client-Side JS
Astro hanya mengirimkan JS yang diperlukan. Hindari `client:load` di komponen yang tidak butuh interaktivitas:

```astro
<!-- ❌ Jangan pake client:load jika tidak perlu -->
<MyComponent client:load />

<!-- ✅ Gunakan client:visible agar hydrate saat masuk viewport -->
<MyComponent client:visible />

<!-- ✅ Atau biarkan jadi static component (no client directive) -->
<MyComponent />
```

---

## 2. Image Optimization

### Gunakan `<Image>` dari `astro:assets`
Semua gambar wajib menggunakan komponen `<Image>` bawaan Astro untuk otomatisasi:
- Konversi ke format WebP
- Lazy loading default
- Dimensi otomatis (mencegah CLS)

```astro
---
import { Image } from "astro:assets";
import heroImg from "@/assets/image/hero.jpg";
---

<Image
  src={heroImg}
  alt="Deskripsi gambar"
  width={1920}
  height={1080}
  loading="eager"
  fetchpriority="high"
/>
```

### Aturan Loading Priority

| Posisi Gambar         | `loading` | `fetchpriority` |
| --------------------- | --------- | --------------- |
| Hero / LCP image      | `eager`   | `high`          |
| Above the fold        | `eager`   | `auto`          |
| Below the fold / card | `lazy`    | `auto`          |
| Dekorasi / pattern    | `lazy`    | `low`           |

### Pattern SVG — Selalu Lazy + Dimensi Eksplisit
```astro
<Image
  src={pattern4}
  alt=""
  class="absolute pointer-events-none select-none"
  style="width: 486px; height: 488px;"
  aria-hidden="true"
  loading="lazy"
/>
```

---

## 3. CSS Optimization

### Tailwind CSS v4 — Zero Runtime
Tailwind v4 di-compile via Vite plugin, menghasilkan CSS statis minimal berisi hanya utility class yang digunakan.

### Hindari Arbitrary Values yang Berlebihan
Jika sudah ada utility bawaan, gunakan itu:

```html
<!-- ❌ -->
<div class="p-[24px] text-[16px]">

<!-- ✅ -->
<div class="p-6 text-base">
```

---

## 4. GSAP Performance

### Tidak Perlu `registerPlugin` di Setiap Komponen
`ScrollTrigger` sudah di-register sekali di `src/scripts/smoothScroll.ts` yang diload global via `Layout.astro`.

```typescript
// Cukup import, tidak perlu registerPlugin lagi
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
```

### Gunakan `once: true` pada ScrollTrigger Entrance
```typescript
gsap.from(".card", {
  scrollTrigger: {
    trigger: ".card-container",
    start: "top 85%",
    once: true,
  },
  y: 30,
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
  clearProps: "transform,opacity",
});
```

### `clearProps` — Wajib Setelah Animasi Selesai
Selalu tambahkan `clearProps` agar inline style GSAP tidak mengganggu layout dan sticky positioning:

```typescript
gsap.from("#faq-header", {
  opacity: 0,
  duration: 0.6,
  ease: "power2.out",
  clearProps: "opacity",
});
```

### `ScrollTrigger.refresh()` — Kapan Menggunakannya
Panggil hanya ketika DOM berubah (accordion dibuka, konten toggle):

```typescript
setTimeout(() => {
  ScrollTrigger.refresh();
}, 50);
```

### Hindari Konflik: CSS `sticky` vs GSAP `pin`
Jangan gabung `position: sticky` (CSS) dengan `pin: true` (GSAP) pada elemen yang sama. Pilih salah satu:
- CSS `sticky` → header yang static
- GSAP `pin` → animasi scroll-driven kompleks

---

## 5. Font Optimization

### Font yang Digunakan

| Font              | Token         | Digunakan untuk          |
| ----------------- | ------------- | ------------------------ |
| Plus Jakarta Sans | `font-jakarta`| Body, label, UI elements |
| Momo Trust Sans   | `font-momo`   | Heading utama (H1, H2)   |
| Caveat            | `font-caveat` | Aksen italic di heading  |

### Tambahkan Preconnect di Layout.astro

```astro
<head>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
</head>
```

`font-display: swap` sudah disertakan di URL Google Fonts.

---

## 6. Layout Stability (CLS Prevention)

### Set Dimensi Gambar Eksplisit
```astro
<!-- ✅ -->
<Image src={img} alt="" width={800} height={600} />

<!-- ❌ Dimensi hilang = layout shift -->
<Image src={img} alt="" />
```

### Animasi GSAP — Hanya `opacity` dan `transform`
```typescript
// ✅ Safe
gsap.from(".card", { y: 30, opacity: 0, duration: 0.6 });

// ❌ Ubah dimensi = layout shift
gsap.from(".card", { height: 0, duration: 0.6 });
```

---

## 7. Scroll Performance

### Lenis — Konfigurasi Optimal (smoothScroll.ts)
```typescript
const lenis = new Lenis({ autoRaf: false });

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);
```

### Stop Scroll saat Modal / Overlay
```typescript
import lenis from "@/scripts/smoothScroll";

lenis.stop();   // block scroll
lenis.start();  // resume scroll
```

---

## 8. Build Checklist

Sebelum push ke production:

- [ ] Jalankan `astro build` dan cek output `dist/`
- [ ] Semua gambar menggunakan `<Image>` dari `astro:assets` (bukan `<img>`)
- [ ] LCP image: `loading="eager"` + `fetchpriority="high"`
- [ ] Tidak ada `registerPlugin` duplikat di komponen
- [ ] Setiap GSAP `from()` dengan `y` menggunakan `clearProps: "transform"`
- [ ] Font preconnect ada di `Layout.astro`
- [ ] Tidak ada `console.log` di production script
- [ ] Gambar dekorasi: `aria-hidden="true"` + `alt=""`
