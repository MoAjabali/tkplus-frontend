// img Slider
let index = 1;
const slides = document.querySelector('.img-slider-container');
const total = slides.children.length;
const visible = () => Math.floor(slides.clientWidth / 320);

function showSlide() {
  if(index==-1) index=1;
  else if(index == total - visible() + 1) index=1;
  slides.style.transform = `translateX(${index * 20}rem)`;
}

document.getElementById("next").addEventListener("click", ()=> showSlide(index--));
document.getElementById("prev").addEventListener("click", ()=> showSlide(index++));