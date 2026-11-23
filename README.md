# NEXORA Studio — Website Jasa Pembuatan Web UMKM (v3)

## Struktur folder
```
umkm-web/
├── index.html              # halaman Indonesia (sumber utama, edit di sini)
├── en/index.html           # halaman English (DIHASILKAN: node tools/build-en.js)
├── blog/                   # artikel ID
├── en/blog/                # artikel EN
├── css/style.css
├── js/
│   ├── config.js           # ★ WA, email, harga IDR/USD, pembayaran, testimoni, portofolio, blog, sosial
│   ├── i18n.js             # ★ semua teks ID/EN
│   └── script.js
├── tools/build-en.js       # generator en/index.html
├── assets/img/             # favicon, og-image, screenshot portofolio
├── robots.txt, sitemap.xml
```

## Alur kerja
- Ubah **teks** di `js/i18n.js` atau struktur di `index.html` → jalankan `node tools/build-en.js` agar `en/index.html` ikut ter-update.
- Ubah **harga/portofolio/testimoni/pembayaran/blog** di `js/config.js` (tanpa build ulang).

## Checklist sebelum online
1. `js/config.js`: nomor WA, `brand.name`, `brand.email`, link sosial, link PayPal, rekening/QRIS (jelaskan saat chat atau tambah teks).
2. Ganti `contoh-domain.com` di `index.html`, `tools/build-en.js`, artikel blog, `robots.txt`, `sitemap.xml`, lalu jalankan build.
3. **Testimoni**: ganti data contoh dengan ulasan asli, lalu set `testimonialsAreSamples: false`.
4. **Formulir**: isi `contactForm.endpoint` (Formspree/Web3Forms/Getform) agar terkirim langsung ke emailmu. Kosong = tombol membuka aplikasi email.
5. **Portofolio**: simpan screenshot WebP (±800×500) di `assets/img/portfolio/`, isi `image` di config.
6. Produksi dengan server folder: ubah `pages.en` jadi `"en/"` di config.
7. Daftarkan ke Google Search Console, kirim `sitemap.xml`.

## Harga & mata uang
- Harga dan fitur paket dikelola dari `js/config.js` pada `SITE_CONFIG.packages`.
- Setiap paket memiliki keterangan `bestFor` untuk membantu calon klien memilih layanan.
- Harga awal bukan penawaran final; konfirmasi ruang lingkup, revisi, domain/hosting, integrasi, dan biaya tambahan secara tertulis sebelum pengerjaan.
`price: { IDR: "Rp500.000", USD: "$50" }`. Halaman ID menampilkan IDR, halaman EN menampilkan USD; pengunjung bisa mengganti lewat tombol IDR/USD.

## Gambar dummy
Semua gambar di `assets/img/` (hero, service-*, portfolio/*, blog-*, avatar-*) adalah ilustrasi SVG placeholder buatan `tools/make-images.py`.
Ganti kapan saja dengan file asli (nama/path sama, atau ubah path di `js/config.js` dan `index.html`):
- Portofolio: screenshot asli → `image` di `portfolio` (config.js)
- Testimoni: foto klien → `avatar` di `testimonials`
- Blog: sampul → `image` di `blog`


## Identitas brand NEXORA Studio
- Nama brand: NEXORA Studio
- Tagline: Build Your Digital Presence.
- Logo utama: `assets/img/nexora-mark.svg`
- Logo untuk latar gelap: `assets/img/nexora-mark-light.svg`
- Favicon: `assets/img/nexora-favicon.svg`
- Palet: Navy `#0B1F44`, Gold `#D4AF37`, Light Gray `#F8FAFC`, Slate `#64748B`.
- Warna dan gaya utama website diatur melalui variabel di bagian `:root` pada `css/style.css`.


## FAQ / Pusat Bantuan (v5)

Bagian FAQ dikelompokkan menjadi empat topik: Sebelum Memesan, Harga & Pembayaran, Fitur & Pengerjaan, serta Setelah Website Selesai. Terdapat 16 pertanyaan dalam Bahasa Indonesia dan Inggris. Ubah teks FAQ pada `js/i18n.js`, lalu jalankan `node tools/build-en.js` untuk memperbarui halaman Inggris.
