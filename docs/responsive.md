# Responsive Design Context

Panduan breakpoint dan layout responsif untuk PortoSpace.

---

## Breakpoints

| Context         | Min Width | Max Width |
| --------------- | --------- | --------- |
| `mobile`        | `0px`     | `767px`   |
| `tablet`        | `768px`   | `1023px`  |
| `desktop`       | `1024px`  | `1439px`  |
| `desktop-large` | `1440px`  | `∞`       |

---

## Content Margin (Horizontal Padding)

Margin kiri dan kanan konten utama di setiap breakpoint:

| Context         | Margin Horizontal |
| --------------- | ----------------- |
| `mobile`        | `20px`            |
| `tablet`        | `28px`            |
| `desktop`       | `32px`            |
| `desktop-large` | `32px`            |

> **Catatan:** Margin ini diterapkan sebagai `padding-inline` pada wrapper/container utama konten, bukan pada elemen `body` secara langsung.

---

## Implementasi CSS

### Custom Properties (CSS Variables)

```css
:root {
  --content-margin: 20px; /* mobile default */
}

@media (min-width: 768px) {
  :root {
    --content-margin: 28px; /* tablet */
  }
}

@media (min-width: 1024px) {
  :root {
    --content-margin: 32px; /* desktop */
  }
}

@media (min-width: 1440px) {
  :root {
    --content-margin: 32px; /* desktop-large (sama dengan desktop) */
  }
}
```

### Penggunaan pada Container

```css
.content-wrapper {
  padding-inline: var(--content-margin);
}
```

---

## Implementasi Tailwind (jika diperlukan)

Karena project ini menggunakan Tailwind v4, breakpoint dapat dikonfigurasi via `@theme`:

```css
@theme {
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
  --breakpoint-desktop-large: 1440px;
}
```

Gunakan class utility untuk content margin:

```html
<div class="px-5 md:px-7 lg:px-8">
  <!-- px-5 = 20px | px-7 = 28px | px-8 = 32px -->
</div>
```

> `md` = tablet (768px+), `lg` = desktop (1024px+)

---

## Konteks Penggunaan

- **`mobile`** — Prioritas utama desain (mobile-first approach)
- **`tablet`** — Layout mulai menyesuaikan menjadi 2-kolom atau lebih
- **`desktop`** — Layout penuh, sidebar atau navigasi muncul
- **`desktop-large`** — Konten dibatasi max-width agar tidak terlalu lebar

### Contoh Max Width Container

Untuk `desktop-large`, gunakan `max-width` agar konten tidak membentang terlalu lebar:

```css
.content-wrapper {
  max-width: 1440px;
  margin-inline: auto;
  padding-inline: var(--content-margin);
}
```
