KOPIKUY

Website coffee shop Kopikuy (Jl. Merdeka, Tanjungpinang), dibuat untuk Tugas 8: website dengan HTML, Tailwind CSS, dan JavaScript yang mengambil data dari API.

Desain dibuat di Figma, lalu diimplementasikan menjadi website statis dua halaman.

Nama: Muhammad Fadel f
NIM: 2501020149
Fitur
Halaman Home: hero, harga mulai dari, lokasi + peta, fasilitas, dan cara pesan (dine-in / take-away).
Halaman Menu: daftar minuman Hot dan Iced yang diambil dari API.
Navigasi responsif dengan menu hamburger di mobile.
Status loading, penanganan error, dan tombol "Coba lagi".
Menu cadangan otomatis kalau API tidak bisa diakses.
Teknologi
HTML5
Tailwind CSS (via CDN)
JavaScript (vanilla, fetch + async/await)
Google Fonts: Rozha One, DM Sans, Gaegu
API yang dipakai

SampleAPIs Coffee

Endpoint	Isi
https://api.sampleapis.com/coffee/hot	Daftar kopi panas
https://api.sampleapis.com/coffee/iced	Daftar kopi dingin

Tiap item punya id, title, description, ingredients, dan image.

Catatan:

API tidak menyediakan harga, jadi harga adalah data lokal di js/menu.js (HARGA).
API ini gratis dan kadang down. Jika request gagal atau melewati 8 detik, website otomatis memakai data/menu-fallback.json dan menampilkan pemberitahuan di halaman Menu.
Struktur folder
.
├── index.html
├── menu.html
├── assets/              # logo dan gambar
├── css/
│   └── style.css        # CSS tambahan (shadow, tombol, fokus)
├── data/
│   └── menu-fallback.json
└── js/
    ├── tailwind-config.js  # warna dan font brand
    ├── main.js             # menu mobile dan tahun footer
    └── menu.js             # fetch API, render me
