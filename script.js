// Mobile menu
const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".links");
menuBtn.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
links.addEventListener("click", () => {
  links.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
});

// Scroll-reveal for content inside each page
document.querySelectorAll(".page__inner").forEach((el) => el.classList.add("reveal"));
const revealObs = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
  { threshold: 0.15 }
);
document.querySelectorAll(".reveal").forEach((el) => revealObs.observe(el));

// Highlight active nav link
const navLinks = [...document.querySelectorAll(".links a")];
const sections = navLinks.map((a) => document.querySelector(a.getAttribute("href")));
const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      let id = e.target.id;
      if (id.startsWith("project") || id === "thankyou") id = "projects";
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === "#" + id));
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll(".page").forEach((s) => spy.observe(s));

// Back-to-top button
const toTop = document.querySelector(".to-top");
window.addEventListener("scroll", () => toTop.classList.toggle("show", window.scrollY > 600), { passive: true });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

// Typing effect
const words = ["Web Developer", "UI Designer", "Creative Thinker"];
const typedEl = document.getElementById("typed");
let w = 0, c = 0, deleting = false;
function type() {
  const word = words[w];
  typedEl.textContent = word.slice(0, c);
  if (!deleting && c === word.length) { deleting = true; return setTimeout(type, 1400); }
  if (deleting && c === 0) { deleting = false; w = (w + 1) % words.length; }
  c += deleting ? -1 : 1;
  setTimeout(type, deleting ? 50 : 100);
}
type();

// ---------- Gallery lightbox ----------
// Add your screenshots here. Files go in the /assets folder.
const galleries = {
  gallery1: ["assets/project01-1.jpg", "assets/project01-2.jpg", "assets/project01-3.jpg"],
  gallery2: ["assets/project02-1.jpg", "assets/project02-2.jpg", "assets/project02-3.jpg"],
};

const lb = document.querySelector(".lightbox");
const lbImg = lb.querySelector("img");
let current = [];
let index = 0;

function show(i) {
  index = (i + current.length) % current.length;
  lbImg.src = current[index];
}
function openGallery(key) {
  current = galleries[key] || [];
  if (!current.length) return;
  show(0);
  lb.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeGallery() {
  lb.hidden = true;
  document.body.style.overflow = "";
}

document.querySelectorAll(".gallery-btn").forEach((btn) =>
  btn.addEventListener("click", () => openGallery(btn.closest(".project").dataset.gallery))
);
lb.querySelector(".lb-close").addEventListener("click", closeGallery);
lb.querySelector(".lb-prev").addEventListener("click", () => show(index - 1));
lb.querySelector(".lb-next").addEventListener("click", () => show(index + 1));
lb.addEventListener("click", (e) => e.target === lb && closeGallery());
document.addEventListener("keydown", (e) => {
  if (lb.hidden) return;
  if (e.key === "Escape") closeGallery();
  if (e.key === "ArrowLeft") show(index - 1);
  if (e.key === "ArrowRight") show(index + 1);
});