# Testing & Audit Guide — PortoSpace Frontend

Panduan testing dan audit kualitas untuk proyek Astro + Tailwind CSS v4 + GSAP + Lenis.

---

## Stack Referensi

| Tool            | Fungsi                                        |
| --------------- | --------------------------------------------- |
| Astro Build     | Validasi output static (HTML/CSS/JS)          |
| Browser DevTools| Inspeksi layout, animasi, network, performance|
| Lighthouse      | Audit Core Web Vitals (LCP, CLS, FID, INP)   |
| axe / WAVE      | Accessibility audit                           |

---

## 1. Build Validation

### Jalankan Build Sebelum Audit
```bash
astro build
astro preview   # Buka preview di localhost:4321
```

Pastikan tidak ada error kompilasi di terminal.

---

## 2. Layout & Responsive Audit

### Breakpoints yang Digunakan

| Token       | Nilai   | Tailwind Class Prefix |
| ----------- | ------- | --------------------- |
| `tablet`    | 768px   | `md:`             |
| `desktop`   | 1024px  | `lg:`            |
| `desktop-lg`| 1440px  | `xl:`         |

### Checklist Responsive per Section

Untuk setiap section di homepage (`heroSection`, `mahasiswaSection`, `ProgramUnggulanSection`, dst.), cek di DevTools:

- [ ] **Mobile (< 768px)**: Konten tidak overflow horizontal, padding `px-5` (20px) aktif
- [ ] **Tablet (768px–1023px)**: Layout menyesuaikan, padding `px-7` (28px) aktif
- [ ] **Desktop (1024px–1439px)**: Layout full desktop, padding `px-8` (32px) aktif
- [ ] **Desktop-LG (≥ 1440px)**: Container `max-w-[1440px]` lepas (`max-w-none`), padding `px-8` (32px) tetap aktif di kiri dan kanan

### Container Standard yang Benar
Semua konten section wajib menggunakan pola ini:

```html
<div class="w-full max-w-[1440px] mx-auto xl:max-w-none
            px-[20px] md:px-[28px] lg:px-[32px] xl:px-[32px]">
```

❌ **Cegah**: Margin overflow kanan karena `mx-[32px]` pada `w-full`.

---

## 3. Animasi GSAP Audit

### Checklist GSAP Per Komponen

- [ ] Tidak ada `registerPlugin(ScrollTrigger)` duplikat (sudah ada di `smoothScroll.ts`)
- [ ] Setiap `gsap.from()` dengan `y:` menggunakan `clearProps: "transform"` atau `clearProps: "transform,opacity"`
- [ ] ScrollTrigger entrance menggunakan `once: true`
- [ ] Tidak ada animasi yang mengubah `width`, `height` (menyebabkan CLS)
- [ ] `ScrollTrigger.refresh()` dipanggil setelah DOM berubah (accordion toggle, dll.)

### Cara Cek Animasi di DevTools
1. Buka **Chrome DevTools → Animations** (tab di sebelah Console)
2. Scroll ke section yang ada animasi
3. Pastikan animasi berjalan smooth, tidak ada `jump`

---

## 4. Sticky / Pin Header Audit

### FAQ Section (`faq.astro`)
- [ ] Di desktop (≥ 1024px): `#faq-header` harus pin/fixed saat scroll accordion
- [ ] Tidak ada `transform` inline tertinggal di `#faq-header` setelah animasi entrance
- [ ] Setelah klik accordion, header tidak bergeser naik/turun

### Cara Cek
1. Buka DevTools → **Elements**, pilih `#faq-header`
2. Scroll ke section FAQ
3. Klik beberapa accordion, perhatikan `style` attribute di element — harus tidak ada `transform` tertinggal

---

## 5. Performance Audit (Lighthouse)

### Jalankan Lighthouse
1. Buka `astro preview` → buka browser
2. DevTools → **Lighthouse** tab
3. Centang: Performance, Accessibility, Best Practices, SEO
4. Pilih **Mobile** dan **Desktop**, klik Analyze

### Target Skor

| Metrik         | Target |
| -------------- | ------ |
| Performance    | ≥ 90   |
| Accessibility  | ≥ 95   |
| Best Practices | ≥ 95   |
| SEO            | ≥ 95   |

### Core Web Vitals Target

| Metric | Target      |
| ------ | ----------- |
| LCP    | < 2.5s      |
| CLS    | < 0.1       |
| INP    | < 200ms     |
| FCP    | < 1.8s      |

---

## 6. Image Audit

### Checklist Gambar

- [ ] Semua gambar menggunakan `<Image>` dari `astro:assets` (bukan `<img>` HTML biasa)
- [ ] Hero image dan LCP image: `loading="eager"` + `fetchpriority="high"`
- [ ] Gambar below-the-fold: `loading="lazy"`
- [ ] Pattern / dekorasi: `aria-hidden="true"` + `alt=""` + `loading="lazy"`
- [ ] Dimensi gambar eksplisit (`width` + `height`) pada semua `<Image>`

### Cara Cek di Network Tab
1. DevTools → **Network** → filter `Img`
2. Pastikan hero image load prioritas pertama (warna biru di Waterfall)
3. Gambar pattern/dekorasi load belakangan

---

## 7. Accessibility Audit

### Checklist Manual

- [ ] Semua `<img>` punya `alt` (atau `alt=""` untuk dekorasi)
- [ ] Semua tombol punya teks yang deskriptif atau `aria-label`
- [ ] Accordion button punya `aria-expanded` yang benar (true/false)
- [ ] Accordion button punya `aria-controls` yang menunjuk ke ID konten yang benar
- [ ] Heading hierarchy benar: satu `<h1>` per halaman, lalu `<h2>`, `<h3>`, dst.
- [ ] Warna konten memiliki kontras rasio ≥ 4.5:1 (text normal) dan ≥ 3:1 (text besar)
- [ ] Fokus keyboard terlihat pada semua elemen interaktif

### Accordion FAQ — Checklist Aksesibilitas

```html
<!-- ✅ Struktur accordion yang benar -->
<button
  type="button"
  aria-expanded="false"
  aria-controls="faq-answer-1"
>
  Pertanyaan
</button>
<div id="faq-answer-1" role="region">
  Jawaban
</div>
```

---

## 8. SEO Audit

### Checklist SEO di `Layout.astro`

- [ ] `<title>` tag diisi dengan judul halaman yang deskriptif
- [ ] `<meta name="description">` ada dan deskriptif (< 160 karakter)
- [ ] `<meta name="viewport" content="width=device-width">` ada
- [ ] `<link rel="icon">` ada
- [ ] `lang` attribute di `<html>` sesuai bahasa konten (`id` untuk Indonesia)

### Perbaikan `Layout.astro` yang Disarankan

```astro
---
interface Props {
  title?: string;
  description?: string;
}

const {
  title = "PortoSpace — Maker's Academy untuk Pelajar",
  description = "Program pendampingan intensif membangun portofolio unggulan STEM, Coding, AI, Riset, dan Entrepreneurship untuk siswa SD, SMP, SMA."
} = Astro.props;
---
<html lang="id">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="description" content={description} />
    <title>{title}</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  </head>
</html>
```

---

## 9. Navbar Audit

### Checklist Navbar (`navbar.astro`)

- [ ] Navbar scroll behavior berjalan: warna berubah sesuai `data-navbar` attribute section aktif
- [ ] Mobile menu: toggle buka/tutup berfungsi
- [ ] Link navigasi scroll ke section yang benar
- [ ] CTA button "Konsultasi Portfolio Gratis" terlihat di semua breakpoint

---

## 10. Checklist Final Pre-Production

### Kualitas Kode
- [ ] Tidak ada `console.log` atau debug output
- [ ] Tidak ada kode yang di-comment-out tanpa alasan
- [ ] Semua `TODO` sudah ditangani

### Performa
- [ ] `astro build` berhasil tanpa warning
- [ ] Lighthouse Performance ≥ 90
- [ ] Tidak ada gambar besar yang tidak dioptimasi

### Aksesibilitas
- [ ] Lighthouse Accessibility ≥ 95
- [ ] Semua interactive element bisa diakses keyboard

### SEO
- [ ] Title dan meta description sudah diisi
- [ ] `lang="id"` di `<html>`
- [ ] Heading hierarchy benar
