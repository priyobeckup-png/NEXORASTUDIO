# NEXORA Studio — Stage 2.2

## Fokus revisi
- Alur pemesanan: empat langkah ditampilkan dalam grid 2 kolom pada smartphone 360–639px; layar sangat kecil (<360px) tetap satu kolom agar teks tidak sesak.
- Kartu ketentuan pengerjaan: dua kolom pada smartphone, kartu ketiga melebar penuh.
- Wawasan UMKM: kartu artikel menjadi dua kolom pada smartphone; ringkasan dibatasi tiga baris agar kartu lebih ringkas. Isi lengkap tetap tersedia di halaman artikel.
- FAQ: empat kelompok pertanyaan disusun dua kolom; semua pertanyaan dan jawaban dipertahankan. Jawaban tidak terbuka otomatis sehingga halaman tidak memanjang sejak awal. Pengunjung dapat membuka jawaban yang dibutuhkan.
- Pada layar sangat kecil (<360px), layout kembali satu kolom untuk menjaga keterbacaan.
- Generator halaman Inggris tetap digunakan untuk menghasilkan `en/index.html`.

## Pengujian
- `node --check js/script.js`: lulus.
- `node tools/build-en.js`: berhasil.
- Build generator berulang menghasilkan `en/index.html` identik.
- Pemeriksaan ID HTML halaman ID dan EN: tidak ada ID duplikat.

Catatan: pengujian visual lintas perangkat fisik/browser belum dilakukan. Domain dan kontak placeholder dari versi sebelumnya tetap tidak diubah.
