/**
 * SEO Schema Definitions — PortoSpace
 * ────────────────────────────────────
 * Satu tempat terpusat untuk semua Schema.org structured data.
 * Import dari sini dan gunakan bersama komponen <SchemaOrg />.
 *
 * @usage
 * ```astro
 * ---
 * import { schemas } from "@/seo/schemas";
 * import SchemaOrg from "@/seo/SchemaOrg.astro";
 * ---
 * <SchemaOrg schema={schemas.organization} />
 * ```
 */

// ─── Base Organization (digunakan ulang di banyak schema) ────────────
const organization = {
  "@type": "EducationalOrganization" as const,
  name: "PortoSpace",
  url: "https://portospace.id",
  logo: "https://portospace.id/favicon.svg",
  description:
    "Platform Mentorship Riset, Robotics, Coding, dan Entrepreneurship untuk Siswa.",
  sameAs: [
    "https://www.instagram.com/portospace.id",
    "https://www.linkedin.com/company/portospace",
  ],
};

// ─── Homepage ────────────────────────────────────────────────────────
const homepage = {
  "@type": "WebSite" as const,
  name: "PortoSpace",
  url: "https://portospace.id",
  description:
    "Program mentorship riset, robotics, dan coding untuk siswa kelas 9–12. Dibimbing langsung oleh PhD, Master, dan pakar industri lulusan global.",
  publisher: organization,
};

// ─── About Page ──────────────────────────────────────────────────────
const aboutPage = {
  "@type": "AboutPage" as const,
  name: "Tentang Kami — PortoSpace",
  description:
    "Mengenal PortoSpace: Misi kami mencetak inovator muda Indonesia melalui pembimbingan riset, inovasi teknologi, dan portofolio akademis.",
  url: "https://portospace.id/about",
  mainEntity: organization,
};

// ─── How It Works ────────────────────────────────────────────────────
const howItWorks = {
  "@type": "HowTo" as const,
  name: "Tahapan Mentorship Riset & Teknologi PortoSpace",
  description:
    "Pelajari tahapan mentorship di PortoSpace dari ideasi, perancangan prototipe, pengujian, hingga publikasi dan kompetisi nasional/internasional.",
  step: [
    {
      "@type": "HowToStep" as const,
      name: "Goal Setting & Discovery",
      text: "Mengenali potensi, menentukan target, dan menyusun rencana belajar yang terarah bersama mentor.",
    },
    {
      "@type": "HowToStep" as const,
      name: "Mentor Matching",
      text: "Didampingi mentor berpengalaman dari ITB, UI, NTU, dan pakar industri lulusan global.",
    },
    {
      "@type": "HowToStep" as const,
      name: "Learning & Foundation",
      text: "Pelajari konsep, materi, dan keterampilan mendasar sebagai fondasi proyek.",
    },
    {
      "@type": "HowToStep" as const,
      name: "Progress Evaluation",
      text: "Evaluasi rutin dan pemantauan perkembangan berkala agar proses belajar tetap terarah.",
    },
    {
      "@type": "HowToStep" as const,
      name: "Persiapan & Pendampingan Kompetisi",
      text: "Seleksi kompetisi, penyempurnaan karya, dan latihan presentasi hingga siap berkompetisi.",
    },
  ],
};

// ─── Mentors ─────────────────────────────────────────────────────────
const mentors = {
  "@graph": [
    {
      "@type": "ItemList" as const,
      name: "Daftar Mentor PortoSpace",
      description:
        "Profil mentor pembimbing dari ITB, UI, NTU, dan universitas ternama dunia yang siap mendampingi riset dan proyek teknologimu.",
      url: "https://portospace.id/mentors",
      itemListElement: [
        {
          "@type": "ListItem" as const,
          position: 1,
          item: {
            "@type": "Person" as const,
            name: "Farhan M.",
            jobTitle: "Biotechnology Mentor",
            alumniOf: "Institut Teknologi Bandung",
          },
        },
        {
          "@type": "ListItem" as const,
          position: 2,
          item: {
            "@type": "Person" as const,
            name: "Jasmine Shafa, M.Sc.",
            jobTitle: "STEM Research Mentor",
            alumniOf: "Universitas Indonesia",
          },
        },
        {
          "@type": "ListItem" as const,
          position: 3,
          item: {
            "@type": "Person" as const,
            name: "Aris Putra, Ph.D.",
            jobTitle: "Coding & AI Mentor",
            alumniOf: "Nanyang Technological University",
          },
        },
      ],
    },
    organization,
  ],
};

// ─── Pricing ─────────────────────────────────────────────────────────
const pricing = {
  "@type": "OfferCatalog" as const,
  name: "Paket Mentorship PortoSpace",
  url: "https://portospace.id/pricing",
  description:
    "Informasi pilihan program mentorship private dan kelompok beserta paket biaya investasi masa depan akademis siswa.",
  itemListElement: [
    {
      "@type": "Offer" as const,
      itemOffered: {
        "@type": "Course" as const,
        name: "Paket Mentorship Lite",
        description:
          "Sudah punya dasar? Tingkatkan kemampuanmu dengan bimbingan mentor dan pengalaman belajar yang terarah.",
      },
    },
    {
      "@type": "Offer" as const,
      itemOffered: {
        "@type": "Course" as const,
        name: "Paket Mentorship Pro",
        description:
          "Bangun portofolio yang lebih kuat dengan pendampingan intensif dan proyek yang siap dipublikasikan maupun dilombakan.",
      },
    },
    {
      "@type": "Offer" as const,
      itemOffered: {
        "@type": "Course" as const,
        name: "Paket Mentorship Pro Max",
        description:
          "Program pendampingan paling lengkap untuk membangun portofolio, mempersiapkan kompetisi, hingga meraih peluang studi di universitas terbaik dunia.",
      },
    },
  ],
};

// ─── Contact ─────────────────────────────────────────────────────────
const contact = {
  "@graph": [
    {
      "@type": "ContactPage" as const,
      name: "Hubungi Kami — PortoSpace",
      description:
        "Konsultasikan ide riset dan proyek teknologimu bersama tim PortoSpace via WhatsApp atau formulir kontak resmi.",
      url: "https://portospace.id/contact",
      mainEntity: {
        ...organization,
        email: "admin@portospace.id",
        telephone: "+6285793057466",
        contactPoint: {
          "@type": "ContactPoint" as const,
          telephone: "+6285793057466",
          contactType: "Customer Support",
          email: "admin@portospace.id",
          availableLanguage: ["Indonesian", "English"],
          hoursAvailable: {
            "@type": "OpeningHoursSpecification" as const,
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
            ],
            opens: "09:00",
            closes: "18:00",
          },
        },
      },
    },
  ],
};

// ─── Program: STEM Research ──────────────────────────────────────────
const stemResearch = {
  "@type": "Course" as const,
  name: "STEM Research Mentorship Program",
  description:
    "Program mentorship riset sains (Biologi, Kimia, Fisika, Matematika) untuk siswa kelas 9–12 bersama akademisi dan peneliti global.",
  provider: {
    "@type": "Organization" as const,
    name: "PortoSpace",
    sameAs: "https://portospace.id",
  },
};

// ─── Program: Robotics & IoT ────────────────────────────────────────
const roboticsIot = {
  "@type": "Course" as const,
  name: "Robotics & IoT Mentorship Program",
  description:
    "Pelajari robotika dan IoT melalui proyek nyata, dari merancang sistem hingga menguji prototipe bersama mentor di PortoSpace.",
  provider: {
    "@type": "Organization" as const,
    name: "PortoSpace",
    sameAs: "https://portospace.id",
  },
};

// ─── Program: Entrepreneurship ───────────────────────────────────────
const entrepreneurship = {
  "@type": "Course" as const,
  name: "Entrepreneurship & Business Mentorship Program",
  description:
    "Program mentorship bisnis dan startup untuk siswa. Ubah ide menjadi solusi bisnis nyata yang tervalidasi dan siap dikompetisikan.",
  provider: {
    "@type": "Organization" as const,
    name: "PortoSpace",
    sameAs: "https://portospace.id",
  },
};

// ─── Program: Coding & AI ────────────────────────────────────────────
const codingAi = {
  "@type": "Course" as const,
  name: "Coding & AI Mentorship Program",
  description:
    "Belajar coding, AI, dan pengembangan produk melalui proyek nyata bersama mentor.",
  provider: {
    "@type": "Organization" as const,
    name: "PortoSpace",
    sameAs: "https://portospace.id",
  },
};

// ─── Makers Academy ──────────────────────────────────────────────────
const makersAcademy = {
  "@type": "Course" as const,
  name: "Makers Academy by PortoSpace",
  description:
    "Akademi riset dan teknologi terpadu di PortoSpace untuk mengasah kemampuan sains, teknik, dan pemrograman siswa.",
  provider: organization,
};

// ─── FAQ Page ────────────────────────────────────────────────────────
const faqPage = {
  "@graph": [
    {
      "@type": "FAQPage" as const,
      mainEntity: [
        {
          "@type": "Question" as const,
          name: "Apa itu Maker's Academy?",
          acceptedAnswer: {
            "@type": "Answer" as const,
            text: "Maker's Academy adalah program pendampingan 1-on-1 berbasis proyek dari PortoSpace yang membantu siswa mengembangkan keterampilan, membangun portofolio, dan mempersiapkan kompetisi maupun jenjang pendidikan berikutnya.",
          },
        },
        {
          "@type": "Question" as const,
          name: "Apakah tersedia Trial Class?",
          acceptedAnswer: {
            "@type": "Answer" as const,
            text: "Ya. Kamu dapat mengikuti sesi trial untuk mengenal metode pembelajaran, berdiskusi dengan mentor, dan memastikan program sesuai dengan kebutuhanmu sebelum bergabung.",
          },
        },
        {
          "@type": "Question" as const,
          name: "Apa perbedaan paket Lite, Pro, dan Pro Max?",
          acceptedAnswer: {
            "@type": "Answer" as const,
            text: "Perbedaannya terletak pada jumlah sesi, durasi pendampingan, target karya, serta fasilitas yang didapatkan. Kamu dapat memilih paket sesuai kebutuhan dan tujuan belajarmu.",
          },
        },
        {
          "@type": "Question" as const,
          name: "Siapa saja mentor di PortoSpace?",
          acceptedAnswer: {
            "@type": "Answer" as const,
            text: "Mentor PortoSpace berasal dari berbagai bidang keahlian dengan pengalaman di dunia akademik, riset, maupun industri, dan dipilih melalui proses seleksi untuk memastikan kualitas pendampingan.",
          },
        },
        {
          "@type": "Question" as const,
          name: "Project seperti apa yang akan dikerjakan?",
          acceptedAnswer: {
            "@type": "Answer" as const,
            text: "Jenis proyek disesuaikan dengan bidang yang dipilih dan tujuan belajar masing-masing siswa, mulai dari riset, teknologi, pemrograman, robotika, hingga kewirausahaan.",
          },
        },
        {
          "@type": "Question" as const,
          name: "Apakah program dilakukan secara online atau offline?",
          acceptedAnswer: {
            "@type": "Answer" as const,
            text: "Sebagian besar program dilaksanakan secara online sehingga dapat diikuti dari mana saja. Program offline atau hybrid akan diinformasikan jika tersedia.",
          },
        },
        {
          "@type": "Question" as const,
          name: "Apakah PortoSpace mendukung persiapan kompetisi atau aplikasi universitas?",
          acceptedAnswer: {
            "@type": "Answer" as const,
            text: "Ya. Mentor akan membantu menyempurnakan proyek, membangun portofolio, serta memberikan pendampingan untuk kompetisi maupun persiapan aplikasi ke universitas sesuai kebutuhan siswa.",
          },
        },
        {
          "@type": "Question" as const,
          name: "Siapa yang dapat mengikuti program ini?",
          acceptedAnswer: {
            "@type": "Answer" as const,
            text: "Program PortoSpace dirancang untuk siswa Grade 9–12 yang ingin mengembangkan keterampilan, membangun portofolio, dan mempersiapkan masa depan melalui pembelajaran berbasis proyek.",
          },
        },
        {
          "@type": "Question" as const,
          name: "Apakah orang tua akan mendapatkan laporan perkembangan?",
          acceptedAnswer: {
            "@type": "Answer" as const,
            text: "Ya. Orang tua akan menerima update perkembangan secara berkala mengenai proses belajar, proyek yang sedang dikerjakan, dan perkembangan siswa selama mengikuti program.",
          },
        },
        {
          "@type": "Question" as const,
          name: "Berapa lama waktu respons tim PortoSpace?",
          acceptedAnswer: {
            "@type": "Answer" as const,
            text: "Tim PortoSpace berusaha merespons setiap pertanyaan secepat mungkin pada jam operasional. Untuk pertanyaan yang lebih kompleks, kami akan memberikan informasi lanjutan setelah melakukan koordinasi dengan tim terkait.",
          },
        },
      ],
    },
    organization,
  ],
};

// ─── Export ──────────────────────────────────────────────────────────
export const schemas = {
  organization,
  homepage,
  aboutPage,
  howItWorks,
  mentors,
  pricing,
  contact,
  stemResearch,
  roboticsIot,
  entrepreneurship,
  codingAi,
  makersAcademy,
  faqPage,
} as const;
