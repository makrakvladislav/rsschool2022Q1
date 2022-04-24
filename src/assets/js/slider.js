const btnLeft = document.querySelector(".slider-button-prev");
const btnRight = document.querySelector(".slider-button-next");
const sliderWrapper = document.querySelector(".slider-wrapper");
const slideActive = document.querySelector(".slider-item");

const moveLeft = () => {
  sliderWrapper.classList.add("transition-left");
  btnLeft.removeEventListener("click", moveLeft);
  btnRight.removeEventListener("click", moveRight);
};

const moveRight = () => {
  sliderWrapper.classList.add("transition-right");
  btnLeft.removeEventListener("click", moveLeft);
  btnRight.removeEventListener("click", moveRight);
};

btnLeft.addEventListener("click", moveLeft);
btnRight.addEventListener("click", moveRight);

sliderWrapper.addEventListener("animationend", (animationEvent) => {
  if (animationEvent.animationName === "move-left") {
    sliderWrapper.classList.remove("transition-left");
    slideActive.innerHTML = "";
    generateCard(cards, 3, '.slider-item');
  } else {
    sliderWrapper.classList.remove("transition-right");
    slideActive.innerHTML = "";
    generateCard(cards, 3, '.slider-item');
  }
 
  btnLeft.addEventListener("click", moveLeft);
  btnRight.addEventListener("click", moveRight);

});
