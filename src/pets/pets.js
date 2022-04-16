import 'normalize.css';
import './style.scss';

const body = document.body;
const hamburger = document.querySelector(".header__burger");
const menuWrapper = document.querySelector(".header__menu");
const nav = document.querySelector(".nav__list");

function toggleMenu() {
  menuWrapper.classList.toggle("open");
  body.classList.toggle("menu-open");
}
hamburger.addEventListener("click", toggleMenu);

function closeMenu(event) {
  if (event.target.classList.contains("nav__link")) {
    menuWrapper.classList.remove("open");
    body.classList.remove("menu-open");
  }
}
nav.addEventListener("click", closeMenu);

console.log('Our Pets, Score: 60');