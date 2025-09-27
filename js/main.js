// img Slider
let index = 1;
const slides = document.querySelector('.img-slider-container');
const total = slides.children.length;
const visible = () => Math.floor(slides.clientWidth / 320);
// const width = 20;
function showSlide() {
  if(index==-1) index=1;
  if(index == total - visible() + 1) index=1;
  slides.style.transform = `translateX(${index * 20}rem)`;
}

function nextSlide() {
  showSlide(index--);
}

function prevSlide() {
  showSlide(index++);
}