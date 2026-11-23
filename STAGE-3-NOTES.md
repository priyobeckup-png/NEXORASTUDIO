# Stage 3 — Penyempurnaan Tampilan Mobile & Media Sosial

## Perubahan
- Merapikan header mobile: ukuran logo, tombol bahasa, tombol menu, tinggi header, dan menu yang dapat discroll pada layar pendek.
- Menata ulang hero agar judul, deskripsi, CTA, chip, dan gambar lebih seimbang pada layar ponsel.
- Merapikan jarak antarbagian, heading, kartu layanan, kartu harga, portofolio, form kontak, CTA, dan footer.
- Kartu layanan dan paket harga menggunakan dua kolom pada ponsel normal; kembali satu kolom pada layar sangat sempit (di bawah 360 px) agar tetap terbaca.
- Menjaga portofolio satu kolom pada ponsel agar detail studi kasus tidak terlalu sempit.
- Menata footer menjadi dua kolom pada ponsel, dengan area identitas brand selebar penuh.
- Mengganti tautan sosial placeholder dengan Instagram, Facebook, dan TikTok menggunakan handle `nexorastudio` serta label NEXORA Studio; tautan ditampilkan pada area Kontak dan footer.
- Menerapkan perubahan konfigurasi pada halaman Inggris melalui generator yang sudah tersedia.

## Catatan penting media sosial
URL yang dipasang:
- https://instagram.com/nexorastudio
- https://facebook.com/nexorastudio
- https://tiktok.com/@nexorastudio

Handle tersebut mengikuti nama brand yang diminta, tetapi belum diverifikasi sebagai akun yang sudah dibuat/dimiliki. Jika username resmi berbeda atau akun belum dibuat, ubah URL pada `js/config.js` sebelum publikasi.

## Pemeriksaan
- `node --check js/config.js` — lulus.
- `node --check js/script.js` — lulus.
- `node tools/build-en.js` — berhasil.
- Output generator bahasa Inggris deterministik pada pengujian ulang.
- `index.html` dan `en/index.html`: masing-masing 47 ID, tanpa ID duplikat.
- Uji screenshot browser headless tidak berhasil diselesaikan pada lingkungan kerja ini; mohon lakukan pemeriksaan visual akhir di perangkat nyata sebelum publikasi.

## Tidak diubah
- Harga dan paket di `js/config.js`.
- Nomor WhatsApp, email, domain, dan placeholder kontak lainnya.
- Isi artikel, FAQ, data portofolio, serta alur fungsional JavaScript.
