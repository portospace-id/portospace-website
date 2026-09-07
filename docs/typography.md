# Typography Context

Panduan tipografi responsif untuk PortoSpace.

---

## Font Families

| Role          | Font                          | Keterangan                                      |
| ------------- | ----------------------------- | ----------------------------------------------- |
| `display`     | `Momo Trust Sans`             | Digunakan untuk heading utama                   |
| `handwriting` | `Caveat`                      | Aksen di akhir kalimat heading                  |
| `body`        | `Plus Jakarta Sans`           | Digunakan untuk deskripsi dan teks umum         |
| `mono`        | `JetBrains Mono`              | Digunakan untuk kode                            |

---

## Heading Style

Setiap heading terdiri dari dua bagian:

1. **Teks utama** — menggunakan font `Momo Trust Sans`
2. **Aksen akhir kalimat** — menggunakan font `Caveat` dengan ukuran yang lebih besar

Contoh struktur heading:

```html
<h1>
  <span class="heading-display">Build Your</span>
  <span class="heading-accent">Portfolio</span>
</h1>
```

---

## Skala Tipografi per Breakpoint

### Heading

| Variant          | Mobile   | Tablet   | Desktop  | Desktop-Large |
| ---------------- | -------- | -------- | -------- | ------------- |
| `heading-xl`     | `32px`   | `40px`   | `54px`   | `54px`        |
| `heading-lg`     | `24px`   | `32px`   | `48px`   | `48px`        |
| `heading-accent` | `38px`   | `48px`   | `64px`   | `64px`        |

> `heading-xl` → dipakai untuk judul seksi paling menonjol  
> `heading-lg` → dipakai untuk sub-judul seksi  
> `heading-accent` → aksen Caveat di akhir kalimat heading

### Body / Deskripsi

| Variant       | Mobile   | Tablet   | Desktop  | Desktop-Large |
| ------------- | -------- | -------- | -------- | ------------- |
| `body`        | `16px`   | `16px`   | `16px`   | `16px`        |

---

## Implementasi CSS

### CSS Custom Properties

```css
/* ── Font Size Tokens ───────────────────── */
:root {
  /* Heading */
  --text-heading-xl: 2rem;       /* 32px – mobile */
  --text-heading-lg: 1.5rem;     /* 24px – mobile */
  --text-heading-accent: 2.375rem; /* 38px – mobile */

  /* Body */
  --text-body: 1rem;             /* 16px – semua breakpoint */
}

@media (min-width: 768px) {
  :root {
    --text-heading-xl: 2.5rem;      /* 40px – tablet */
    --text-heading-lg: 2rem;        /* 32px – tablet */
    --text-heading-accent: 3rem;    /* 48px – tablet */
  }
}

@media (min-width: 1024px) {
  :root {
    --text-heading-xl: 3.375rem;    /* 54px – desktop */
    --text-heading-lg: 3rem;        /* 48px – desktop */
    --text-heading-accent: 4rem;    /* 64px – desktop */
  }
}
```

### Utility Classes

```css
/* ── Heading Display (Momo Trust Sans) ── */
.heading-display {
  font-family: var(--font-display);
  font-size: var(--text-heading-xl);
  font-weight: 700;
  line-height: 1.1;
}

.heading-display-lg {
  font-family: var(--font-display);
  font-size: var(--text-heading-lg);
  font-weight: 700;
  line-height: 1.15;
}

/* ── Heading Accent (Caveat) ── */
.heading-accent {
  font-family: var(--font-handwriting);
  font-size: var(--text-heading-accent);
  font-weight: 600;
  line-height: 1.0;
}

/* ── Body / Deskripsi (Plus Jakarta Sans) ── */
.body-text {
  font-family: var(--font-sans);
  font-size: var(--text-body);
  font-weight: 400;
  line-height: 1.6;
}
```

---

## Contoh Penggunaan

```html
<!-- Heading XL dengan aksen Caveat -->
<h1>
  <span class="heading-display">We craft</span>
  <span class="heading-accent">beautiful spaces</span>
</h1>

<!-- Heading LG -->
<h2>
  <span class="heading-display-lg">About the</span>
  <span class="heading-accent">project</span>
</h2>

<!-- Deskripsi -->
<p class="body-text">
  PortoSpace membantu kamu membangun portofolio yang memukau.
</p>
```

---

## Referensi Ukuran Lengkap

```
mobile        tablet        desktop / desktop-large
─────────     ──────────    ───────────────────────
heading-xl     32px  →  40px  →  54px
heading-lg     24px  →  32px  →  48px
heading-accent 38px  →  48px  →  64px
body           16px      16px      16px
```
