# Responsive Design Context

Panduan breakpoint dan layout responsif untuk PortoSpace berdasarkan standar Tailwind CSS.

---

## Predefined Breakpoints

Proyek PortoSpace menggunakan breakpoint berbasis standar Tailwind CSS yang terkonfigurasi di `@theme` (`src/styles/global.css`):

| Prefix | Minimum Width | Typical Device | Layout Adaptations |
| ------ | ------------- | -------------- | ------------------ |
| *(default)* | `0px`    | Mobile Portrait | Layout 1-kolom, padding ringkas `px-[20px]`, mobile-first approach |
| `sm:`  | `640px`       | Large Smartphones | Penyesuaian padding `sm:px-[24px]`, grid 2-kolom ringkas |
| `md:`  | `768px`       | Tablets | Transisi grid multi-kolom `md:grid-cols-2`, padding `md:px-[28px]` |
| `lg:`  | `1024px`      | Laptops / Desktops | Layout penuh desktop, flex-row side-by-side, header sticky, padding `lg:px-[32px]` |
| `xl:`  | `1440px`      | Large Desktops / Max Limit | Container `xl:max-w-none` aktif, margin 32px rata kiri-kanan |

---

## Content Margin & Padding Hierarchy

Margin horizontal dan padding internal di setiap breakpoint:

| Prefix | Screen Width | Horizontal Padding | Container Max Width Behavior |
| ------ | ------------ | ------------------ | ---------------------------- |
| *(default)* | `0px – 639px` | `20px` (`px-[20px]`) | Full width (`w-full`) |
| `sm:`  | `640px – 767px` | `24px` (`sm:px-[24px]`) | Full width (`w-full`) |
| `md:`  | `768px – 1023px` | `28px` (`md:px-[28px]`) | Centered (`max-w-[1440px] mx-auto`) |
| `lg:`  | `1024px – 1439px` | `32px` (`lg:px-[32px]`) | Centered (`max-w-[1440px] mx-auto`) |
| `xl:`  | `≥ 1440px` | `32px` (`xl:px-[32px]`) | Full-bleed dengan margin 32px (`xl:max-w-none`) |

---

## Konfigurasi Theme (`src/styles/global.css`)

```css
@theme {
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1440px;
}
```

---

## Pattern Standard Container Component

Gunakan pola class berikut pada wrapper utama setiap section:

```html
<div class="w-full max-w-[1440px] mx-auto xl:max-w-none
            px-[20px] sm:px-[24px] md:px-[28px] lg:px-[32px] xl:px-[32px]">
  <!-- Konten section -->
</div>
```

---

## Guideline Per Responsif Breakpoint

### 1. Mobile Default (`< 640px`)
- Layout flex bertumpuk secara vertikal (`flex-col`).
- Ukuran heading utama `text-[32px] font-momo`.
- Padding horizontal `20px`.

### 2. Large Smartphones (`sm: 640px`)
- Penyesuaian grid sederhana `sm:grid-cols-2`.
- Padding horizontal `24px`.
- Ukuran teks deskripsi & tombol disesuaikan secara proporsional.

### 3. Tablets (`md: 768px`)
- Transisi dari 1 kolom ke 2 kolom pada card/list (`md:grid-cols-2`).
- Padding horizontal `28px`.
- Heading berskala ke `md:text-[44px]`.

### 4. Laptops / Desktops (`lg: 1024px`)
- Layout berubah menjadi berdampingan (`lg:flex-row`).
- Grid 3 kolom untuk card (`lg:grid-cols-3`).
- Navigasi desktop penuh & sticky header aktif.
- Heading berskala ke `lg:text-[54px]`.
- Padding horizontal `32px`.

### 5. Ultra-wide / Large Desktops (`xl: 1440px`)
- Batas `max-w-[1440px]` dilepas (`xl:max-w-none`).
- Konten tidak lagi berada di tengah (`mx-auto` dinonaktifkan oleh fill-width), melainkan memenuhi layar dengan **padding persis 32px** di tepi kiri dan kanan.
