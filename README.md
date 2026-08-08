# PortoSpace — Dokumentasi Proyek

## Gambaran Umum

**PortoSpace** adalah portfolio website yang dibangun dari awal dengan styling custom, menggunakan stack berikut:

| Teknologi | Versi | Fungsi |
|---|---|---|
| [Astro](https://astro.build) | v7.2 | Framework utama (SSG/SSR) |
| [Tailwind CSS](https://tailwindcss.com) | v4.3 | Styling utility-first |
| [GSAP](https://gsap.com) | v3.15 | Animasi JavaScript |
| [Lenis](https://lenis.darkroom.engineering) | v1.3 | Smooth scroll |
| [Bun](https://bun.sh) | latest | Package manager & runtime |

---

## Struktur Direktori

```
PortoSpace/
├── public/                  # Aset statis (favicon, gambar, dll)
├── src/
│   ├── layouts/
│   │   └── Layout.astro     # Base layout (HTML shell, global script loader)
│   ├── pages/
│   │   └── index.astro      # Halaman utama (route: /)
│   ├── scripts/
│   │   ├── smoothScroll.ts  # Setup Lenis + integrasi GSAP ScrollTrigger
│   │   └── animations.ts    # Animasi GSAP per halaman
│   └── styles/
│       └── global.css       # Global styles + import Tailwind & Lenis CSS
├── astro.config.mjs         # Konfigurasi Astro + Tailwind Vite plugin
├── package.json
└── tsconfig.json
```

---

## Setup & Konfigurasi

### Menjalankan Dev Server

```bash
bun dev
# atau
bunx astro dev --background   # background mode (tidak blokir terminal)
```

> [!TIP]
> Gunakan `--background` agar terminal tetap bebas. Kelola server dengan:
> ```bash
> bunx astro dev stop     # hentikan
> bunx astro dev status   # cek status
> bunx astro dev logs     # lihat log
> ```

### Build Production

```bash
bun run build
bun run preview   # preview hasil build secara lokal
```

---

## Penjelasan File Kunci

### `astro.config.mjs`

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],  // Tailwind v4 via Vite plugin (bukan astro integration)
  },
});
```

> [!IMPORTANT]
> Tailwind v4 tidak menggunakan `@astrojs/tailwind`. Plugin dipasang langsung di Vite.

---

### `src/styles/global.css`

```css
@import "tailwindcss";          /* Tailwind v4 — satu baris, menggantikan 3 direktif lama */
@import "lenis/dist/lenis.css"; /* CSS bawaan Lenis */
```

> [!NOTE]
> Berbeda dengan Tailwind v3 yang membutuhkan tiga direktif (`@tailwind base`, `@tailwind components`, `@tailwind utilities`), Tailwind v4 cukup satu baris `@import "tailwindcss"`.

---

### `src/layouts/Layout.astro`

Layout dasar yang dipakai oleh semua halaman. Bertanggung jawab untuk:
- Mengimport CSS global (Tailwind + Lenis)
- Memuat script animasi global (Lenis + GSAP)

```astro
---
import "../styles/global.css";
---
<html lang="en">
  <head>...</head>
  <body>
    <slot />
    <script>
      import "../scripts/smoothScroll.ts";
      import "../scripts/animations.ts";
    </script>
  </body>
</html>
```

> [!WARNING]
> **Jangan** gunakan `<script src="...">` untuk file TypeScript lokal di Astro.
>
> ```astro
> <!-- ❌ Salah — dikirim ke browser sebagai URL, TS tidak diproses -->
> <script src="../scripts/smoothScroll.ts"></script>
>
> <!-- ✅ Benar — diproses oleh Vite, TypeScript support penuh -->
> <script>
>   import "../scripts/smoothScroll.ts";
> </script>
> ```

---

### `src/scripts/smoothScroll.ts`

Mengintegrasikan Lenis dengan GSAP ScrollTrigger agar keduanya sinkron.

```ts
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  autoRaf: false,   // matikan RAF bawaan Lenis, gunakan GSAP ticker
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

export default lenis;
```

**Kenapa `autoRaf: false`?**
Lenis secara default menggunakan `requestAnimationFrame`-nya sendiri. Karena GSAP ScrollTrigger juga perlu tahu posisi scroll terkini, keduanya harus dijalankan dalam satu ticker yang sama (GSAP ticker) agar tidak terjadi desync antara animasi dan scroll.

---

### `src/scripts/animations.ts`

Tempat mendefinisikan animasi GSAP per elemen. Dijalankan setelah DOM siap.

```ts
import { gsap } from "gsap";

const heroTitle = document.querySelector(".hero-title");

if (heroTitle) {
  gsap.from(heroTitle, {
    y: 80,        // mulai dari 80px di bawah
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
}
```

**Cara menambah animasi ScrollTrigger:**

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.from(".card", {
  y: 50,
  opacity: 0,
  duration: 0.8,
  stagger: 0.15,
  scrollTrigger: {
    trigger: ".card",
    start: "top 80%",
  },
});
```

---

## Cara Menambah Halaman Baru

1. Buat file di `src/pages/`, contoh `src/pages/about.astro`
2. Gunakan layout:

```astro
---
import Layout from "../layouts/Layout.astro";
---

<Layout>
  <main class="min-h-screen bg-black text-white">
    <h1 class="text-5xl font-bold">About</h1>
  </main>
</Layout>
```

Script Lenis dan GSAP otomatis termuat karena sudah ada di `Layout.astro`.

---

## Referensi

- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/docs)
- [GSAP Docs](https://gsap.com/docs)
- [Lenis Docs](https://lenis.darkroom.engineering)
- [Astro + GSAP Guide](https://gsap.com/resources/frameworks/astro/)
