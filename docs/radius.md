# Border Radius Context

Panduan border radius untuk PortoSpace.

---

## Aturan Umum

**Semua elemen menggunakan border radius `4px`.**

Tidak ada variasi ukuran radius — konsisten `4px` di seluruh komponen dan breakpoint.

---

## Token

```css
:root {
  --radius: 4px;
}
```

---

## Penggunaan

```css
.card,
.button,
.input,
.badge,
.tag {
  border-radius: var(--radius);
}
```

---

## Catatan

- Tidak ada `border-radius: 50%` (circular) kecuali untuk elemen avatar/icon khusus yang didefinisikan terpisah.
- Tidak ada `border-radius: 9999px` (pill) kecuali ada kebutuhan spesifik yang didokumentasikan.
- Semua breakpoint menggunakan nilai yang sama — radius tidak berubah antar device.
