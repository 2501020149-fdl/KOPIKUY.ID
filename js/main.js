
// ======================================
// KOPIKUY - MAIN JAVASCRIPT
// ======================================

// 1. MENU MOBILE
const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

function setMenu(open) {
  if (!menuBtn || !mobileMenu) return;

  mobileMenu.classList.toggle("hidden", !open);

  menuBtn.setAttribute("aria-expanded", String(open));

  menuBtn.setAttribute(
    "aria-label",
    open ? "Tutup menu" : "Buka menu"
  );
}

if (menuBtn && mobileMenu) {

  menuBtn.addEventListener("click", () => {
    const isOpen =
      menuBtn.getAttribute("aria-expanded") === "true";

    setMenu(!isOpen);
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenu(false);
    }
  });

}

// 2. TAHUN OTOMATIS FOOTER
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

console.log("KOPIKUY MAIN JS BERHASIL DIMUAT!");
