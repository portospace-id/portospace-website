# Panduan SEO (Search Engine Optimization) PortoSpace

Dokumen ini berisi standar, pedoman, dan spesifikasi implementasi **SEO** pada website **PortoSpace**.

---

## 🎯 Tujuan SEO

1. **Visibilitas Pencarian Organik**: Meningkatkan peringkat PortoSpace pada kata kunci utama (*"mentorship riset SMA"*, *"kursus robotika dan IoT"*, *"program entrepreneurship siswa"*, *"pembimbingan publikasi ilmiah"*).
2. **Branding & Otoritas**: Membangun citra PortoSpace sebagai platform mentorship riset dan teknologi terdepan untuk siswa kelas 9–12 dan mahasiswa.
3. **Rasio Klik (CTR) Tinggi**: Menyajikan *Title Tag* dan *Meta Description* yang persuasif, informatif, dan relevan di halaman hasil pencarian (SERP).
4. **Pengalaman Pengguna (UX & Core Web Vitals)**: Memastikan struktur konten cepat dimuat, mudah dibaca, dan aksesibel di semua perangkat.

---

## 📑 1. Metadata & Title Tag Matrix

Setiap halaman di PortoSpace wajib memiliki **Title Tag** dan **Meta Description** unik yang mengintegrasikan kata kunci utama.

| Rute Halaman | Title Tag | Meta Description |
| :--- | :--- | :--- |
| `/` (Homepage) | `PortoSpace — Platform Mentorship Riset, Robotics & Coding` | `Program mentorship riset, robotics, dan coding untuk siswa kelas 9–12. Dibimbing langsung oleh PhD, Master, dan pakar industri lulusan global.` |
| `/about` | `Tentang Kami — PortoSpace` | `Mengenal PortoSpace: Misi kami mencetak inovator muda Indonesia melalui pembimbingan riset, inovasi teknologi, dan portofolio akademis.` |
| `/how-it-works` | `Cara Kerja Mentorship — PortoSpace` | `Pelajari tahapan mentorship di PortoSpace dari ideasi, perancangan prototipe, pengujian, hingga publikasi dan kompetisi nasional/internasional.` |
| `/makers-academy` | `Makers Academy — PortoSpace` | `Akademi riset dan teknologi terpadu di PortoSpace untuk mengasah kemampuan sains, teknik, dan pemrograman siswa.` |
| `/mentors` | `Daftar Mentor Akademisi & Praktisi — PortoSpace` | `Jelajahi profil mentor pembimbing dari ITB, UI, NTU, dan universitas ternama dunia yang siap mendampingi riset dan proyek teknologimu.` |
| `/pricing` | `Program & Biaya Mentorship — PortoSpace` | `Informasi pilihan program mentorship private dan kelompok beserta paket biaya investasi masa depan akademis siswa.` |
| `/contact` | `Hubungi Kami — PortoSpace` | `Konsultasikan ide riset dan proyek teknologimu bersama tim PortoSpace via WhatsApp atau formulir kontak resmi.` |
| `/programs/stem-research` | `STEM Research — PortoSpace` | `Program mentorship riset sains (Biologi, Kimia, Fisika, Matematika) untuk siswa kelas 9–12 bersama akademisi dan peneliti global.` |
| `/programs/robotics-iot` | `Robotics & IoT — PortoSpace` | `Pelajari robotika dan IoT melalui proyek nyata, dari merancang sistem hingga menguji prototipe bersama mentor di PortoSpace.` |
| `/programs/entrepreneurship` | `Entrepreneurship & Bisnis — PortoSpace` | `Program mentorship bisnis dan startup untuk siswa. Ubah ide menjadi solusi bisnis nyata yang tervalidasi dan siap dikompetisikan.` |

---

## 🏗️ 2. Standar Struktur HTML & Hierarki Heading

Aksesibilitas dan pemahaman *crawler* Google sangat bergantung pada hierarki heading yang terstruktur dengan baik.

### Aturan Utama Heading:
1. **Hanya 1 tag `<h1>` per halaman**: `<h1>` wajib memuat nama program atau topik utama halaman.
2. **Hierarki Berurutan**: Jangan melompati tingkat heading (misal dari `<h1>` langsung ke `<h3>`).
3. **Penggunaan Font**:
   - Heading (`<h1>` - `<h3>`): Menggunakan font **Momo Trust Sans** (`font-momo`).
   - Aksen Italic Italic Heading: Menggunakan font **Caveat** (`font-caveat`).
   - Teks Bodi (`<p>`, `<span>`, `<li>`): Menggunakan font **Plus Jakarta Sans** (`font-jakarta`).

### Contoh Struktur Halaman Program (`/programs/robotics-iot`):
```html
<main>
  <!-- Hero Section -->
  <h1>Dari Ide Menjadi Prototipe yang Bisa Bergerak, Merespons, dan Bekerja.</h1>
  
  <!-- Manfaat Section -->
  <h2>Belajar Membangun, Menguji, dan Menyempurnakan Solusi Nyata.</h2>
  
  <!-- Process Section -->
  <h2>Dari Sketsa Pertama hingga Prototipe yang Siap Diuji.</h2>
  
  <!-- Tools Section -->
  <h2>Kenali Teknologi yang Digunakan untuk Membangun Prototype</h2>
  
  <!-- Projects Section -->
  <h2>Ide Sederhana yang Dikembangkan Menjadi Prototipe Nyata.</h2>
  
  <!-- Mentors Section -->
  <h2>Belajar Bersama Mentor yang Berpengalaman di Dunia Riset.</h2>
  <h3>Farhan M., M.Sc.</h3>
  
  <!-- Kompetisi Section -->
  <h2>Kembangkan Prototipemu Menjadi Karya yang Siap Berkompetisi.</h2>
  <h3>Kompetisi Riset</h3>
  <h3>Publikasi Ilmiah</h3>
</main>
```

---

## 🌐 3. Open Graph (OG) & Social Media Tags

Untuk memastikan tampilan preview menarik saat link dibagikan di WhatsApp, LinkedIn, Telegram, dan Twitter:

```html
<!-- Open Graph / Facebook / WhatsApp -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://portospace.id/programs/robotics-iot" />
<meta property="og:title" content="Robotics & IoT — PortoSpace" />
<meta property="og:description" content="Pelajari robotika dan IoT melalui proyek nyata bersama mentor akademisi dan praktisi global di PortoSpace." />
<meta property="og:image" content="https://portospace.id/og-image.png" />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:url" content="https://portospace.id/programs/robotics-iot" />
<meta name="twitter:title" content="Robotics & IoT — PortoSpace" />
<meta name="twitter:description" content="Pelajari robotika dan IoT melalui proyek nyata bersama mentor akademisi dan praktisi global di PortoSpace." />
<meta name="twitter:image" content="https://portospace.id/og-image.png" />
```

---

## 🔍 4. Canonical URL & Language Attributes

1. **Tag Bahasa HTML**:
   ```html
   <html lang="id">
   ```
2. **Canonical Tag**: Mencegah isu *duplicate content*.
   ```html
   <link rel="canonical" href="https://portospace.id/programs/robotics-iot" />
   ```

---

## 🤖 5. Structured Data (Schema.org / JSON-LD)

Menggunakan JSON-LD untuk membantu Google menampilkan *Rich Snippets* di hasil pencarian.

### Contoh Schema Organization (Homepage / `Layout.astro`):
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "name": "PortoSpace",
  "url": "https://portospace.id",
  "logo": "https://portospace.id/favicon.svg",
  "description": "Platform Mentorship Riset, Robotics, Coding, dan Entrepreneurship untuk Siswa.",
  "sameAs": [
    "https://www.instagram.com/portospace.id",
    "https://www.linkedin.com/company/portospace"
  ]
}
</script>
```

### Contoh Schema Course / Program Mentorship:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Course",
  "name": "Robotics & IoT Mentorship Program",
  "description": "Pelajari robotika dan IoT melalui proyek nyata bersama mentor akademisi dan praktisi global.",
  "provider": {
    "@type": "Organization",
    "name": "PortoSpace",
    "sameAs": "https://portospace.id"
  }
}
</script>
```

---

## 🖼️ 6. Optimasi Asset Gambar untuk SEO & Performa

1. **Penggunaan Atribut `alt`**:
   - Wajib menyertakan teks `alt` yang deskriptif pada setiap tag `<img>` atau `<Image />`.
   - Gambar dekoratif menggunakan `alt=""` dan `aria-hidden="true"`.
2. **Format Gambar**:
   - Gunakan format modern **WebP** atau **SVG** untuk gambar vektor/pattern.
3. **Lazy Loading & Priority**:
   - Gambar Hero Utama (Above-the-fold): `fetchpriority="high"` dan `loading="eager"`.
   - Gambar Section Bawah: `loading="lazy"`.

---

## 📋 7. Checklist Audit SEO Sebelum Release Production

- [ ] Every page has a unique `<title>` and `<meta name="description">`.
- [ ] Exactly one `<h1>` per page.
- [ ] All interactive elements have descriptive IDs and accessible aria-labels.
- [ ] Images have appropriate `alt` descriptions and format optimizations (WebP/SVG).
- [ ] Open Graph metadata (`og:title`, `og:description`, `og:image`) configured properly.
- [ ] Sitemap (`sitemap-index.xml`) and `robots.txt` are active.
- [ ] Canonical URLs match the canonical domain `https://portospace.id`.
- [ ] `npm run build` succeeds without broken imports or missing static assets.
