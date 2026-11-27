// Dimuat SETELAH script Tailwind CDN.
// Semua warna & font brand KOPIKUY didefinisikan di sini, jadi bisa dipakai
// sebagai class: bg-brand, text-cream, font-display, dst.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#04533A", dark: "#033B2A" },
        cream: { DEFAULT: "#FBF4E0", deep: "#EFE5C8" },
      },
      fontFamily: {
        display: ['"Rozha One"', "serif"], // judul
        sans: ['"DM Sans"', "sans-serif"], // teks biasa
        hand: ["Gaegu", "cursive"], // aksen tulisan tangan
      },
    },
  },
};