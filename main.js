const openMenu = document.querySelector(".btn-hamburger");
const closeMenu = document.querySelector(".btn-close-nav");
const menu = document.querySelector(".main-nav-list");

function toggleMenu() {
  menu.classList.toggle("show-menu");
  document.body.classList.toggle("menu-open");

  const isOpen = menu.classList.contains("show-menu");
  openMenu.style.display = isOpen ? "none" : "block";
  closeMenu.style.display = isOpen ? "block" : "none";
  openMenu.setAttribute("aria-expanded", isOpen ? "true" : "false");
}

openMenu.addEventListener("click", toggleMenu);
closeMenu.addEventListener("click", toggleMenu);

// nav menu active-link highlight
const links = document.querySelectorAll(".main-nav-link");

function handleLinkClick(e) {
  links.forEach((link) => {
    link.classList.remove("active-link");
  });

  e.currentTarget.classList.add("active-link");

  // Close mobile menu when a link is clicked
  if (menu.classList.contains("show-menu")) {
    toggleMenu();
  }
}

links.forEach((link) => {
  link.addEventListener("click", handleLinkClick);
});

// popup modals
const popupModals = document.querySelectorAll(".popup-modal");
const overlay = document.querySelector(".overlay");

function closeAllPopups() {
  popupModals.forEach((modal) => {
    modal.style.display = "none";
  });
  overlay.style.display = "none";
}

document.querySelectorAll(".popup-trigger").forEach((trigger, i) => {
  trigger.addEventListener("click", () => {
    popupModals[i].style.display = "block";
    overlay.style.display = "block";
    // Move focus into modal for keyboard/screen-reader users
    const closeBtn = popupModals[i].querySelector(".modal-close");
    if (closeBtn) closeBtn.focus();
  });
});

overlay.addEventListener("click", closeAllPopups);

document.querySelectorAll(".modal-close").forEach((close, i) => {
  close.addEventListener("click", () => {
    popupModals[i].style.display = "none";
    overlay.style.display = "none";
  });
});

// Close modals on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeAllPopups();
});

// images slider
const slides = document.querySelectorAll(".photo");

let currentSlide = 0;

function showSlide() {
  slides.forEach((slide) => slide.classList.remove("active"));
  currentSlide = (currentSlide % slides.length) + 1;
  slides[currentSlide - 1].classList.add("active");
}

showSlide();
const slideshowInterval = setInterval(showSlide, 5000);

// Display current year in footer
const footerYear = document.querySelector(".footer-year");
footerYear.textContent = new Date().getFullYear();

// Tap-to-flip for touch devices (project cards have no hover state on touch)
if (window.matchMedia("(hover: none)").matches) {
  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", function (e) {
      if (e.target.closest("a")) return;
      this.classList.toggle("is-flipped");
    });
  });
}

// Scroll-based active nav link highlight
(function () {
  const sectionIds = [
    "section-about",
    "section-skills",
    "section-projects",
    "section-contact",
  ];
  const homeLink = document.querySelector('.main-nav-link[href="#"]');
  const navSections = sectionIds
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  window.addEventListener(
    "scroll",
    () => {
      const scrollY = window.scrollY;
      const trigger = window.innerHeight / 3;
      let current = "";

      navSections.forEach((section) => {
        if (scrollY >= section.offsetTop - trigger) current = section.id;
      });

      links.forEach((link) => link.classList.remove("active-link"));

      if (current) {
        const active = document.querySelector(
          `.main-nav-link[href="#${current}"]`
        );
        if (active) active.classList.add("active-link");
      } else if (homeLink) {
        homeLink.classList.add("active-link");
      }
    },
    { passive: true }
  );
})();

// Scroll-reveal: elements fade + slide up as they enter the viewport
(function () {
  // Section headings — plain fade-up
  document
    .querySelectorAll(
      ".section-title, .skills-title, .contact-title, .contact-subtitle"
    )
    .forEach((el) => el.classList.add("reveal"));

  // About section: left column slides from left, photo from right
  const aboutCols = document.querySelectorAll("#section-about .col-2");
  if (aboutCols[0]) aboutCols[0].classList.add("reveal", "reveal-left");
  if (aboutCols[1]) aboutCols[1].classList.add("reveal", "reveal-right");

  // Skill cards — staggered
  document.querySelectorAll(".skill-card").forEach((card, i) => {
    card.classList.add("reveal");
    card.style.setProperty("--delay", `${i * 0.08}s`);
  });

  // Project cards — staggered
  document.querySelectorAll(".card").forEach((card, i) => {
    card.classList.add("reveal");
    card.style.setProperty("--delay", `${i * 0.12}s`);
  });

  // Social links — staggered
  document.querySelectorAll(".social-link").forEach((link, i) => {
    link.classList.add("reveal");
    link.style.setProperty("--delay", `${i * 0.1}s`);
  });

  // CV download button — slight delay after social links
  const cvBtn = document.querySelector(".btn-cv");
  if (cvBtn) {
    cvBtn.classList.add("reveal");
    cvBtn.style.setProperty("--delay", "0.3s");
  }

  // Footer items
  document
    .querySelectorAll(".footer-logo, .footer-content")
    .forEach((el) => el.classList.add("reveal"));

  // Trigger .animate-in when each element scrolls into view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-in");
          observer.unobserve(entry.target); // animate once only
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
})();
