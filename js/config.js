/* =====================================================================
   config.js — SATU-SATUNYA FILE YANG PERLU KAMU EDIT untuk update rutin
   ---------------------------------------------------------------------
   1. Nomor WhatsApp  -> SITE_CONFIG.whatsapp.number
   2. Harga / paket   -> SITE_CONFIG.packages
   3. Portofolio      -> SITE_CONFIG.portfolio
   4. Sosial media    -> SITE_CONFIG.social
   Semua teks dwibahasa ditulis sebagai { id: "...", en: "..." }
   ===================================================================== */
window.SITE_CONFIG = {
  brand: {
    name: "NEXORA Studio",            // GANTI dengan nama brand kamu
    email: "hello@contoh-domain.com", // GANTI: email bisnis
  },

  // Domain final (tanpa slash di akhir) — dipakai untuk referensi, ganti juga di index.html (canonical, og:url, JSON-LD)
  domain: "https://www.contoh-domain.com",

  // Mata uang default mengikuti bahasa: ID -> IDR, EN -> USD. Pengunjung bisa mengganti manual.
  currencyByLang: { id: "IDR", en: "USD" },

  // Halaman per bahasa (relatif dari root). Saat produksi boleh diganti "en/" jika server mendukung folder.
  pages: { id: "index.html", en: "en/index.html" },

  // Formulir kontak. Isi `endpoint` dengan URL Formspree / Web3Forms / Getform dsb. agar terkirim langsung.
  // Jika kosong, tombol "Kirim via Email" membuka aplikasi email (mailto) dengan isi terisi otomatis.
  contactForm: { endpoint: "" },

  // Metode pembayaran. `key` -> teks di i18n.js (pay.<key>). Isi `url` bila ada tautan (mis. paypal.me).
  payments: {
    local: [{ key: "bank" }, { key: "qris" }],
    international: [], // Tambahkan metode internasional setelah akun pembayaran resmi tersedia.
  },

  // Testimoni hanya ditampilkan jika sudah ada ulasan klien yang benar-benar diberikan.
  testimonialsAreSamples: false,
  testimonials: [], // Bagian testimoni otomatis disembunyikan sampai ulasan asli tersedia.

  // Artikel blog. `lang` = halaman bahasa tempat artikel tampil. `href` relatif dari root situs.
  blog: [
    { lang: "id", image: "assets/img/blog-umkm.svg", href: "blog/kenapa-umkm-perlu-website.html",
      title: "Kenapa UMKM Perlu Website, dan Cara Memulainya",
      desc: "Media sosial saja tidak cukup. Ini alasan dan langkah praktis memulai website pertama usahamu." },
    { lang: "en", image: "assets/img/blog-global.svg", href: "en/blog/why-smes-need-multilingual-website.html",
      title: "Why Your SME Needs a Multilingual Website to Go Global",
      desc: "How a simple bilingual website helps small businesses earn trust and reach overseas buyers." },
  ],

  whatsapp: {
    // Format internasional TANPA "+", "0" depan, atau spasi. Contoh: 6281234567890
    number: "628XXXXXXXXXX",
    display: "+62 8XX-XXXX-XXXX",     // teks yang tampil di footer
  },

  // Kosongkan url ("") untuk menyembunyikan ikon tertentu
  social: [
    { key: "instagram", label: "Instagram", short: "IG", url: "https://instagram.com/usernamekamu" },
    { key: "tiktok",    label: "TikTok",    short: "TT", url: "https://tiktok.com/@usernamekamu" },
    { key: "facebook",  label: "Facebook",  short: "FB", url: "https://facebook.com/usernamekamu" },
    { key: "youtube",   label: "YouTube",   short: "YT", url: "https://youtube.com/@usernamekamu" },
    { key: "linkedin",  label: "LinkedIn",  short: "in", url: "https://linkedin.com/company/usernamekamu" },
    { key: "x",         label: "X",         short: "X",  url: "https://x.com/usernamekamu" },
  ],

  /* ------------------------------------------------------------------
     PAKET HARGA
     - Isi `price` (mis. "Rp500.000") + `priceTag` untuk harga angka.
     - Kosongkan `price` dan isi `priceText` untuk label harga fleksibel.
     - `featured: true` memberi highlight "Paling Dicari".
     - Tombol WhatsApp otomatis memakai nama paket di pesan.
     ------------------------------------------------------------------ */
  packages: [
    {
      id: "starter-landing",
      featured: true,
      name: { id: "Starter Landing Page", en: "Starter Landing Page" },
      desc: {
        id: "Halaman fokus untuk memperkenalkan satu produk, layanan, atau promo dan mengarahkan calon pelanggan menghubungi bisnismu.",
        en: "A focused page to introduce one product, service, or promotion and guide visitors to contact your business.",
      },
      bestFor: { id: "Usaha yang ingin mulai promosi online dengan satu halaman yang fokus.", en: "Businesses starting online promotion with one focused page." },
      priceTag: { id: "Mulai dari", en: "Starting from" },
      price: { IDR: "Rp500.000", USD: "$50" },   // harga per mata uang
      priceNote: { id: "Harga awal paket Starter", en: "Entry price for the Starter package" },
      features: [
        { id: "1 halaman, dibuat dari nol", en: "1 page, built from scratch" },
        { id: "Desain responsif & mobile-first", en: "Responsive, mobile-first design" },
        { id: "Tombol WhatsApp pesan otomatis", en: "WhatsApp button with pre-filled message" },
        { id: "SEO dasar (title, meta, semantic HTML)", en: "Basic SEO (title, meta, semantic HTML)" },
        { id: "Opsi tambahan bahasa Inggris", en: "Optional English version add-on" },
      ],
    },
    {
      id: "company-profile",
      name: { id: "Web Statis / Company Profile", en: "Static Site / Company Profile" },
      desc: {
        id: "Website beberapa halaman untuk menjelaskan profil, layanan, keunggulan, dan cara menghubungi bisnismu.",
        en: "A multi-page website explaining your business profile, services, strengths, and contact details.",
      },
      bestFor: { id: "Bisnis jasa, toko, komunitas, dan perusahaan yang membutuhkan profil lengkap.", en: "Service businesses, shops, communities, and companies needing a complete profile." },
      priceText: { id: "Harga bertahap", en: "Tiered pricing" },
      priceNote: { id: "Menyesuaikan jumlah halaman & bahasa", en: "Based on number of pages & languages" },
      features: [
        { id: "Multi-halaman (Beranda, Tentang, Layanan, Kontak)", en: "Multi-page (Home, About, Services, Contact)" },
        { id: "Multi-bahasa ID/EN", en: "Multi-language ID/EN" },
        { id: "Struktur SEO on-page lengkap", en: "Full on-page SEO structure" },
        { id: "Mudah di-update per bagian", en: "Easy to update section by section" },
        { id: "Integrasi WhatsApp & Google Maps", en: "WhatsApp & Google Maps integration" },
      ],
    },
    {
      id: "web-store",
      name: { id: "Web Store / Katalog Online", en: "Web Store / Online Catalog" },
      desc: {
        id: "Katalog online untuk menampilkan produk, kategori, detail, dan jalur pemesanan melalui WhatsApp.",
        en: "An online catalog to showcase products, categories, details, and ordering through WhatsApp.",
      },
      bestFor: { id: "UMKM yang memiliki beberapa produk dan ingin katalog mudah dibagikan.", en: "SMEs with multiple products that need an easy-to-share catalog." },
      priceText: { id: "Harga bertahap", en: "Tiered pricing" },
      priceNote: { id: "Menyesuaikan jumlah produk & fitur", en: "Based on number of products & features" },
      features: [
        { id: "Katalog produk dengan kategori", en: "Product catalog with categories" },
        { id: "Checkout/pemesanan via WhatsApp", en: "Checkout/ordering via WhatsApp" },
        { id: "Halaman detail produk ramah SEO", en: "SEO-friendly product pages" },
        { id: "Siap jualan lokal & ekspor (ID/EN)", en: "Ready for local & export sales (ID/EN)" },
        { id: "Produk bisa ditambah bertahap", en: "Add products gradually" },
      ],
    },
    {
      id: "custom-system",
      name: { id: "Web Sistem Custom", en: "Custom Web System" },
      desc: {
        id: "Aplikasi web dengan alur kerja dan fitur khusus yang dirancang berdasarkan proses bisnismu.",
        en: "A web application with custom workflows and features designed around your business processes.",
      },
      bestFor: { id: "Bisnis yang membutuhkan otomatisasi, booking, dashboard, atau pengelolaan data.", en: "Businesses needing automation, booking, dashboards, or data management." },
      priceText: { id: "Sesuai kebutuhan", en: "Based on scope" },
      priceNote: { id: "Dihitung setelah konsultasi & kesepakatan fitur", en: "Quoted after consultation & feature agreement" },
      features: [
        { id: "Analisis kebutuhan bisnis dulu", en: "Business needs analysis first" },
        { id: "Fitur disusun per tahap (modular)", en: "Features built in modular phases" },
        { id: "Panel pengelolaan data", en: "Data management panel" },
        { id: "Keamanan & struktur kode terjaga", en: "Secure, clean code structure" },
        { id: "Bisa dikembangkan bertahap", en: "Can grow step by step" },
      ],
    },
  ],

  /* ------------------------------------------------------------------
     PORTOFOLIO
     - Tambah objek baru ke array di bawah untuk item baru.
     - `categories`: pilih dari "landing" | "company" | "store" | "custom".
       Tombol filter dibuat otomatis dari kategori yang dipakai.
     - `image`: path screenshot (mis. "assets/img/portfolio/rumahijo.webp").
       Kosongkan untuk memakai mockup bawaan.
     ------------------------------------------------------------------ */
  portfolio: [
    {
      id: "rumahijo",
      url: "https://rumahijo.my.id",
      domain: "rumahijo.my.id",
      categories: ["company", "store"],
      image: "assets/img/portfolio/rumahijo.webp",   // screenshot asli
      imageAlt: { id: "Screenshot halaman utama Rumahijo untuk layanan percetakan dan katalog produk", en: "Screenshot of Rumahijo homepage for printing services and product catalog" },
      accent: ["#16a34a", "#065f46"],
      type: { id: "Web Percetakan / Katalog Produk", en: "Printing Business / Product Catalog" },
      business: { id: "Percetakan lokal", en: "Local printing business" },
      solution: {
        id: "Menyajikan layanan percetakan dalam etalase digital yang memadukan katalog, galeri hasil cetak, informasi promo, dan jalur pemesanan melalui WhatsApp.",
        en: "Presents printing services in a digital storefront that brings together a catalog, print gallery, promotion information, and WhatsApp ordering.",
      },
      goal: {
        id: "Etalase digital percetakan lokal (undangan, kemasan, buku) dengan katalog produk dan pemesanan langsung via WhatsApp.",
        en: "A digital showcase for a local printing business (invitations, packaging, books) with a product catalog and direct WhatsApp ordering.",
      },
      features: [
        { id: "Katalog produk & galeri hasil cetak", en: "Product catalog & print gallery" },
        { id: "Pesan langsung via WhatsApp + chat admin", en: "Direct WhatsApp ordering + admin chat" },
        { id: "Menu Promo, Testimoni & Cara Pesan", en: "Promo, Testimonials & How-to-Order pages" },
      ],
    },
    {
      id: "sehatku-store",
      url: "https://sehatku.store",
      domain: "sehatku.store",
      categories: ["store"],
      image: "assets/img/portfolio/sehatku-store.webp",
      imageAlt: { id: "Screenshot halaman utama Sehatku Store, apotek online", en: "Screenshot of Sehatku Store online pharmacy homepage" },
      accent: ["#009B78", "#006B5A"],
      type: { id: "Web Store / Apotek Online", en: "Web Store / Online Pharmacy" },
      business: { id: "Apotek / toko kebutuhan kesehatan", en: "Pharmacy / healthcare store" },
      solution: {
        id: "Menyediakan katalog yang dapat ditelusuri, pencarian produk, keranjang, kategori, serta akses konsultasi dan informasi operasional apotek.",
        en: "Provides a browsable catalog, product search, cart, categories, and access to pharmacy consultation and operating information.",
      },
      goal: {
        id: "Etalase apotek online untuk membantu pelanggan melihat katalog obat dan kebutuhan kesehatan, mencari produk, serta menghubungi apotek dari rumah.",
        en: "An online pharmacy storefront that helps customers browse medicine and healthcare products, search the catalog, and contact the pharmacy from home.",
      },
      features: [
        { id: "Pencarian dan katalog produk", en: "Product search and catalog" },
        { id: "Keranjang belanja dan navigasi kategori", en: "Shopping cart and category navigation" },
        { id: "Akses konsultasi kebutuhan kondisi", en: "Health-needs consultation access" },
        { id: "Informasi kontak dan jam operasional", en: "Contact and operating-hours information" },
      ],
    },
    {
      id: "les-privat-ungaran",
      url: "https://parjojuminet-cpu.github.io/lesprivatungaranweb/index.html",
      domain: "Les Privat Ungaran",
      categories: ["landing", "company"],
      image: "assets/img/portfolio/lesprivat-ungaran.webp",
      imageAlt: { id: "Tampilan website Les Privat Ungaran", en: "Les Privat Ungaran website preview" },
      accent: ["#facc15", "#064e3b"],
      type: { id: "Landing Page / Pendidikan", en: "Education Landing Page" },
      business: { id: "Layanan pendidikan / les privat", en: "Education / private tutoring service" },
      solution: {
        id: "Menyusun informasi layanan, jenjang pendidikan, keunggulan, proses, pengumuman, dan galeri dalam satu website dengan jalur pendaftaran serta WhatsApp.",
        en: "Organizes services, grade levels, benefits, process, announcements, and gallery in one website with registration and WhatsApp contact paths.",
      },
      goal: {
        id: "Website layanan les privat yang menjelaskan layanan, keunggulan, jenjang pendidikan, dan mengarahkan orang tua untuk mendaftar atau bertanya melalui WhatsApp.",
        en: "A private tutoring website that explains services, benefits, grade levels, and guides parents to register or contact via WhatsApp.",
      },
      features: [
        { id: "Informasi layanan dan jenjang les", en: "Tutoring services and grade levels" },
        { id: "CTA pendaftaran dan WhatsApp", en: "Registration and WhatsApp CTAs" },
        { id: "Keunggulan, proses, pengumuman, dan galeri", en: "Benefits, process, announcements, and gallery" },
      ],
    },
    {
      id: "vyora-studio",
      url: "https://vyora-studio-1918.ai.studio/",
      domain: "VYORA Studio",
      categories: ["custom"],
      image: "assets/img/portfolio/vyora.webp",
      imageAlt: { id: "Tampilan katalog film dan streaming VYORA Studio", en: "VYORA Studio movie and streaming catalog interface" },
      accent: ["#8b5cf6", "#11121a"],
      type: { id: "Platform Katalog / UI Showcase", en: "Catalog Platform / UI Showcase" },
      business: { id: "Showcase antarmuka katalog media", en: "Media catalog interface showcase" },
      solution: {
        id: "Menampilkan konsep antarmuka katalog media bertema dark mode dengan kategori, kartu konten, pencarian, pilihan bahasa, preview, dan halaman detail.",
        en: "Showcases a dark-mode media catalog interface concept with categories, content cards, search, language selection, previews, and detail views.",
      },
      goal: {
        id: "Showcase antarmuka katalog media dengan tema dark mode, kategori konten, kartu film, preview, dan navigasi platform.",
        en: "A media catalog interface showcase with dark mode, content categories, film cards, previews, and platform navigation.",
      },
      features: [
        { id: "Katalog kartu media dan kategori", en: "Media cards and category catalog" },
        { id: "Navigasi, pencarian, dan pilihan bahasa", en: "Navigation, search, and language selector" },
        { id: "Preview dan detail konten", en: "Content preview and detail" },
      ],
    },

  ],
};
