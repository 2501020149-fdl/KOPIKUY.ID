// ===== MENU DARI API (dengan menu cadangan) =====
// API utama : https://api.sampleapis.com/coffee/hot  dan  /iced
// Tiap item : id, title, description, ingredients (array), image
// Kalau API down / timeout, otomatis pakai data/menu-fallback.json
const API_URL = "https://api.sampleapis.com/coffee";
const FALLBACK_URL = "data/menu-fallback.json";
const TIMEOUT_MS = 8000;

// API tidak punya harga, jadi ini harga lokal (placeholder, silakan ubah).
// Angka dalam ribuan: 20 = Rp 20.000. Item cadangan punya harga sendiri (field price).
const HARGA = { hot: 20, iced: 23 };

const listEl = document.getElementById("menu-list");
const statusEl = document.getElementById("status");
const buttons = document.querySelectorAll(".filter-btn");
const cache = {}; // hasil per tipe: { items, live }

// ===== HELPER =====
// Data dari luar jangan langsung dimasukkan ke innerHTML.
const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const rupiah = (k) => "Rp " + (k * 1000).toLocaleString("id-ID");

function card(item, type) {
  const chips = (item.ingredients || [])
    .map((i) => `<li class="rounded-full bg-cream/15 px-3 py-1 text-sm">${esc(i)}</li>`)
    .join("");

  const price = item.price ?? HARGA[type];

  // Foto hanya dirender kalau ada. Kalau gambar gagal dimuat, elemennya dibuang.
  const photo = item.image
    ? `<img src="${esc(item.image)}" alt="${esc(item.title)}" loading="lazy"
           class="h-48 w-full object-cover" onerror="this.remove()" />`
    : "";

  return `
    <article class="card-shadow flex flex-col overflow-hidden rounded-3xl bg-brand text-cream">
      ${photo}
      <div class="flex flex-1 flex-col p-6">
        <h3 class="font-display text-2xl">${esc(item.title)}</h3>
        <p class="mt-2 text-cream/90">${esc(item.description)}</p>
        <ul class="mt-4 flex flex-wrap gap-2" aria-label="Bahan">${chips}</ul>
        <p class="mt-auto pt-5 text-xl font-bold">${rupiah(price)}</p>
      </div>
    </article>`;
}

// ===== FETCH =====
async function fetchJson(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), TIMEOUT_MS); // server gateway error sering menggantung
  try {
    const res = await fetch(url, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`Server membalas ${res.status}`);
    return await res.json();
  } finally {
    clearTimeout(timer);
  }
}

async function getMenu(type) {
  if (cache[type]) return cache[type];
  try {
    const data = await fetchJson(`${API_URL}/${type}`);
    if (!Array.isArray(data)) throw new Error("Format data API tidak sesuai");
    cache[type] = { items: data, live: true };
  } catch (err) {
    console.warn("API gagal, pakai menu cadangan:", err);
    const backup = await fetchJson(FALLBACK_URL); // kalau ini gagal juga, ditangani showMenu
    cache[type] = { items: backup[type] || [], live: false };
  }
  return cache[type];
}

async function showMenu(type) {
  buttons.forEach((b) => {
    const active = b.dataset.type === type;
    b.setAttribute("aria-pressed", active);
    b.classList.toggle("bg-brand", active);
    b.classList.toggle("text-cream", active);
  });

  listEl.innerHTML = "";
  statusEl.textContent = "Memuat menu...";

  try {
    const { items, live } = await getMenu(type);
    statusEl.textContent = live ? "" : "Server API lagi bermasalah, jadi yang tampil menu cadangan.";
    listEl.innerHTML = items.map((i) => card(i, type)).join("");
  } catch (err) {
    console.error(err);
    statusEl.innerHTML = `
      <p class="mb-3">Menu gagal dimuat. Coba lagi sebentar lagi.</p>
      <button id="retry" class="btn btn-dark">Coba lagi</button>`;
    document.getElementById("retry").addEventListener("click", () => showMenu(type));
  }
}

buttons.forEach((b) => b.addEventListener("click", () => showMenu(b.dataset.type)));
showMenu("hot");