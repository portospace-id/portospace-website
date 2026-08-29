# PortoSpace — Developer Guide & Documentation

Selamat datang di repositori **PortoSpace**! Dokumen ini dirancang sebagai panduan lengkap untuk pengembang (developers) mengenai instalasi, alur kerja Git, struktur folder, konvensi penamaan file, hingga penggunaan icon dan styling.

---

## 🛠️ Stack Teknologi

| Teknologi | Versi | Fungsi |
|---|---|---|
| [Astro](https://astro.build) | v7.2 | Framework utama (SSG/SSR) |
| [Tailwind CSS](https://tailwindcss.com) | v4.3 | Framework styling utility-first |
| [Lucide Icons](https://lucide.dev) | `@lucide/astro` | Library Icon resmi untuk Astro |
| [GSAP](https://gsap.com) | v3.15 | Engine animasi JavaScript |
| [Lenis](https://lenis.darkroom.engineering) | v1.3 | Smooth scroll library |
| [Bun](https://bun.sh) | latest | Package Manager & JavaScript Runtime |

---

## 🚀 Panduan Instalasi & Setup Lokal

### Prasyarat
- **Bun**: Pastikan Bun sudah terinstall di komputer Anda ([Panduan Install Bun](https://bun.sh)).

### Langkah-Langkah Instalasi

1. **Clone Repositori**:
   ```bash
   git clone <repository-url>
   cd PortoSpace
   ```

2. **Instalasi Dependencies**:
   ```bash
   bun install
   ```

3. **Menjalankan Dev Server**:
   ```bash
   bun dev
   ```
   Aplikasi akan berjalan secara lokal di `http://localhost:4321`.

   > [!TIP]
   > Anda juga dapat menjalankan dev server di background mode agar terminal tidak terblokir:
   > ```bash
   > bunx astro dev --background
   > ```

4. **Build untuk Production**:
   ```bash
   bun run build
   
   # Preview hasil build secara lokal:
   bun run preview
   ```

---

## 🌿 Alur Kerja Git & Aturan Branching (Wajib Dibaca)

Untuk menjaga histori commit tetap rapi dan menghindari *conflict* pada branch utama, seluruh tim pengembang wajib mengikuti alur kerja berikut:

### ⚠️ Aturan Pembuatan Branch Baru:

Sebelum mulai mengerjakan fitur, halaman, atau komponen baru:

1. **Switch ke branch `development`**:
   ```bash
   git switch development
   ```

2. **Pull update terbaru dari `development`**:
   ```bash
   git pull origin development
   ```

3. **Buat branch baru dari branch `development`**:
   - Untuk fitur/komponen: `git checkout -b feature/nama-fitur`
   - Untuk halaman baru: `git checkout -b page/nama-halaman`
   - Untuk perbaikan bug: `git checkout -b fix/nama-bug`

4. **Kirim Pull Request (PR)**:
   Setiap PR yang dibuat **wajib ditujukan ke branch `development`** (bukan langsung ke branch `main`). Branch `main` hanya digunakan untuk rilis rilis production yang sudah stabil.

---

## 📁 Struktur Folder Project

```text
PortoSpace/
├── docs/                        # Dokumentasi desain, responsive, & tipografi
│   ├── designImplementation.md  # Token warna, aturan Tailwind, & panduan desain
│   ├── responsive.md            # Breakpoints & grid margin
│   └── typography.md            # Penggunaan font family & skala teks
├── public/                      # Asset statis publik (favicon, robots.txt, dll)
├── src/
│   ├── assets/                  # Asset gambar & vector SVG
│   │   ├── pattern/             # File SVG pattern dekoratif (pattern_line.svg, pattern_4.svg)
│   │   └── student/             # Foto & gambar siswa/mentor
│   ├── components/              # Seluruh komponen UI Astro
│   │   ├── card/                # Komponen kartu reusable (cardProgramUnggulan.astro)
│   │   ├── pages/               # Komponen section spesifik per halaman
│   │   │   └── homepage/        # Section khusus halaman depan (heroSection.astro, etc)
│   │   └── ui/                  # Komponen UI atomik/dasar (button.astro, sectionTitle.astro)
│   ├── layouts/
│   │   └── Layout.astro         # Base layout (HTML shell, import CSS global & Lenis)
│   ├── pages/
│   │   └── index.astro          # Halaman utama (route: /)
│   ├── scripts/
│   │   ├── smoothScroll.ts      # Integrasi Lenis Smooth Scroll + GSAP ScrollTrigger
│   │   └── animations.ts        # Script animasi global GSAP
│   └── styles/
│       └── global.css           # Styling global & import Tailwind v4 (@import "tailwindcss";)
├── astro.config.mjs             # Konfigurasi Astro + Plugin Tailwind Vite
├── package.json
└── README.md
```

---

## 🏷️ Konvensi Penamaan File (*Naming Conventions*)

Agar repositori konsisten dan teratur, ikuti aturan penamaan file berikut:

1. **Komponen Section Halaman (`src/components/pages/<halaman>/`)**:
   - Gunakan format **`camelCase`** dengan suffix **`Section.astro`**.
   - Contoh:
     - `heroSection.astro`
     - `mahasiswaSection.astro`
     - `programUnggulanSection.astro`
     - `successStorySection.astro`

2. **Komponen Card / Kartu (`src/components/card/`)**:
   - Gunakan format **`camelCase`** dengan prefix **`card`** + **`.astro`**.
   - Contoh:
     - `cardProgramUnggulan.astro`
     - `cardTestimonial.astro`

3. **Komponen UI Reusable / Atomik (`src/components/ui/`)**:
   - Gunakan format **`camelCase`** + **`.astro`**.
   - Contoh:
     - `button.astro`
     - `sectionTitle.astro`
     - `badge.astro`

4. **File Halaman (`src/pages/`)**:
   - Gunakan format `kebab-case.astro` atau `index.astro`.
   - Contoh: `index.astro`, `about-us.astro`, `programs.astro`.

---

## 📸 Format Asset Gambar & Pattern

Untuk menjaga performa loading dan kualitas visual:

1. **Foto / Media Gambar (`.webp`)**:
   - Seluruh foto siswa, mentor, produk, atau background hero **wajib menggunakan format WebP** (`.webp`).
   - Simpan foto di folder `src/assets/student/` atau `src/assets/images/`.
   - Gunakan komponen `<Image />` bawaan Astro dari `astro:assets` untuk optimasi otomatis.

2. **Pattern & Dekorasi Vektor (`.svg`)**:
   - Seluruh elemen pattern dekoratif, aksen garis, dan icon vektor **wajib menggunakan format SVG** (`.svg`).
   - Simpan file pattern di folder `src/assets/pattern/`.

---

## 🎨 Penggunaan Icon (Lucide Icons)

Proyek ini menggunakan **Lucide Icons** via package `@lucide/astro`.

### Cara Menggunakan Icon di Komponen Astro:

```astro
---
import { ArrowRight, ChevronDown, CheckCircle } from "@lucide/astro";
---

<!-- Contoh Penggunaan Icon -->
<button class="inline-flex items-center gap-2 bg-citrus-normal text-black font-semibold px-4 py-2 rounded">
  <span>Konsultasi Gratis</span>
  <ArrowRight size={18} class="text-black" />
</button>
```

> [!TIP]
> Cari dan temukan nama icon yang tersedia melalui [Lucide Icons Directory](https://lucide.dev/icons/).

---

## 🎭 Animasi & Smooth Scroll (GSAP + Lenis)

Proyek ini menggabungkan **Lenis Smooth Scroll** dan **GSAP ScrollTrigger** untuk pengalaman pengeluar smooth scrolling dan animasi interaktif.

### Integrasi Smooth Scroll (`src/scripts/smoothScroll.ts`)
- Lenis berjalan tersinkronisasi dengan GSAP ticker (`autoRaf: false` pada Lenis) agar animasi ScrollTrigger tidak mengalami *desync*.
- Di-import secara global di `src/layouts/Layout.astro`.

### Panduan Animasi GSAP per Komponen:
```astro
<script>
  import { gsap } from "gsap";
  import { ScrollTrigger } from "gsap/ScrollTrigger";

  gsap.registerPlugin(ScrollTrigger);

  const initAnimations = () => {
    gsap.from(".my-element", {
      scrollTrigger: {
        trigger: "#my-section",
        start: "top 85%",
        once: true, // Animasi diputar 1 kali dan elemen tetap tampil permanen
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      clearProps: "transform,opacity", // Hapus inline style setelah animasi selesai
    });

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAnimations);
  } else {
    initAnimations();
  }
</script>
```

---

## 🎨 Styling & Breakpoints

### 1. Tailwind CSS v4 & Theme Tokens
- Selalu utamakan menggunakan **Theme Tokens** yang terdefinisi di `@theme` (`global.css`) dan **utility class bawaan Tailwind** (seperti `text-base`, `text-2xl`, `rounded-sm`, `p-6`, `flex-1`).
- **Hindari penggunaan *arbitrary value*** (`text-[16px]`, `p-[24px]`) jika Tailwind atau `@theme` sudah menyediakan nilainya.
- Baca panduan lengkap styling di **[docs/designImplementation.md](docs/designImplementation.md)**.

### 2. Grid Margin & Breakpoints Responsif
- Margin horizontal seksi disesuaikan per breakpoint: `px-5 tablet:px-7 desktop:px-8`.
- Breakpoint kustom:
  - `tablet:` -> `768px`
  - `desktop:` -> `1024px`
  - `desktop-large:` -> `1440px`
- Baca panduan lengkap di **[docs/responsive.md](docs/responsive.md)**.

---

## 📚 Dokumen Referensi Lainnya

- **[docs/designImplementation.md](docs/designImplementation.md)**: Panduan warna (@theme), aturan Tailwind, dan desain UI.
- **[docs/responsive.md](docs/responsive.md)**: Panduan sistem responsif dan breakpoint.
- **[docs/typography.md](docs/typography.md)**: Panduan penggunaan font family (`font-momo`, `font-jakarta`, `font-caveat`).
