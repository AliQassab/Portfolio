const openMenu = document.querySelector(".fa-bars");
const closeMenu = document.querySelector(".fa-xmark");
const menu = document.querySelector(".main-nav-list");
function toggleMenu() {
  menu.classList.toggle("show-menu");
  openMenu.style.display = menu.classList.contains("show-menu")
    ? "none"
    : "block";
    closeMenu.style.display = menu.classList.contains("show-menu")
      ? "block"
      : "none";
}
openMenu.addEventListener("click", toggleMenu);
closeMenu.addEventListener("click", toggleMenu);
// nav menu color function
const links = document.querySelectorAll(".main-nav-link");
// const navMenu = document.querySelector(".main-nav-list");
function handleLinkClick(e) {
  links.forEach((link) => {
    link.classList.remove("active-link");
    // navMenu.style.display='none'
   
  });

  e.target.classList.add("active-link");
  console.log('clicked')
}

links.forEach((link) => {
  link.addEventListener("click", handleLinkClick);
});


// popup contact function
const popupContent = document.querySelectorAll(".popup-content");
const overlay = document.querySelector(".overlay");

document.querySelectorAll(".popup").forEach((popup, i) => {
  popup.addEventListener("click", () => {
    popupContent[i].style.display = "block";
    overlay.style.display = "block";
  });
});

overlay.addEventListener("click", () => {
  popupContent.forEach((popup) => {
    popup.style.display = "none";
  });
  overlay.style.display = "none";
});
document.querySelectorAll(".close-popup").forEach((close, i) => {
  close.addEventListener("click", () => {
    popupContent[i].style.display = "none";
    overlay.style.display = "none";
  });
});

// images slider 
const slides = document.querySelectorAll(".photo");

let currentSlide = 0;

function showSlide() {
  slides.forEach((slide) => slide.classList.remove("active"));
  currentSlide++;
  if (currentSlide > slides.length) {
    currentSlide = 1;
  }
  slides[currentSlide - 1].classList.add("active");
  setTimeout(showSlide, 5000);
}
showSlide();

//date
const displayDate = document.querySelector(".date");

const date = new Date();
const day = date.getDate();
const month = date.getMonth() + 1;
const year = date.getFullYear();
displayDate.textContent = `${day} / ${month} / ${year}`;