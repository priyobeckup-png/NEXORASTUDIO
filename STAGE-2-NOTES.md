# NEXORA Studio — Stage 2 Notes

## Fokus
Penyajian portofolio sebagai studi kasus yang menjelaskan konteks kebutuhan, pendekatan solusi, dan fitur yang tercatat pada konfigurasi proyek.

## Perubahan
- Menambahkan konteks jenis bisnis (`business`) untuk empat proyek yang sudah ada.
- Menambahkan ringkasan solusi (`solution`) yang disusun dari deskripsi kebutuhan dan daftar fitur yang sebelumnya tersedia.
- Memperbarui kartu portofolio agar menampilkan jenis bisnis, kebutuhan proyek, solusi, dan fitur utama.
- Memperbarui dialog detail proyek agar memuat struktur studi kasus yang lebih lengkap.
- Menambahkan keterangan bahwa ringkasan tidak menyatakan hasil bisnis atau peningkatan penjualan.
- Memperbaiki alt text screenshot Rumahijo.
- Menyediakan label dan copy portofolio dalam bahasa Indonesia dan Inggris.
- Mempertahankan filter kategori, tautan website, CTA konsultasi WhatsApp, dan modal detail yang sudah ada.

## Data yang tidak diubah
- Empat entri proyek dan URL yang telah ada.
- Harga dan konfigurasi paket.
- Nomor WhatsApp, email, domain, dan akun sosial.
- Generator `tools/build-en.js`.

## Validasi
- `node --check` untuk `js/config.js`, `js/i18n.js`, dan `js/script.js`.
- `node tools/build-en.js` berhasil dijalankan.
- Generator EN dijalankan dua kali dan hasilnya konsisten.
- Tidak ditemukan ID HTML duplikat pada `index.html` dan `en/index.html`.
- Tidak ditemukan referensi aset lokal yang hilang pada kedua halaman tersebut.
- Keempat gambar portofolio diperiksa secara visual.

## Catatan sebelum publikasi
- URL website proyek dipertahankan dari konfigurasi sumber dan belum diverifikasi ketersediaannya secara live.
- Nomor WhatsApp, email, domain, dan akun sosial masih berupa placeholder dari proyek sumber.
- Belum dilakukan uji lintas perangkat fisik atau audit performa produksi.

## Revisi tahap 2.1 — visual dan ukuran kartu portofolio
- Screenshot Sehatku Store dibersihkan dari chrome browser dan taskbar desktop agar fokus pada tampilan website.
- Screenshot Rumahijo dipotong dari area dekoratif luar dan ditata ulang pada kanvas netral 16:9 agar konsisten dengan screenshot proyek lain.
- Kartu portofolio diringkas: kartu menampilkan jenis proyek, nama, kategori bisnis, dan ringkasan kebutuhan. Detail solusi serta fitur tetap tersedia melalui tombol detail/modal.
- Desktop/tablet lebar memakai dua kolom (empat proyek tersusun dua baris); mobile memakai satu kolom agar teks dan tombol tetap nyaman dibaca.
- Harga, konfigurasi, URL proyek, dan identitas bisnis tidak diubah.
- Validasi ulang: sintaks JavaScript, generator EN dua kali, ID HTML unik, dan referensi aset lokal pada halaman ID/EN.
