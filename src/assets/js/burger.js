const body = document.body;
const hamburger = document.querySelector(".header__burger");
const menuWrapper = document.querySelector(".header-menu__wrapper");
const overlay = document.querySelector(".overlay");
const nav = document.querySelector(".nav__list");

function toggleMenu() {
  menuWrapper.classList.toggle("open");
  body.classList.toggle("menu-open");
  
}

function closeMenu(event) {
  menuWrapper.classList.remove("open");
  body.classList.remove("menu-open");
}

hamburger.addEventListener("click", toggleMenu);
nav.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);