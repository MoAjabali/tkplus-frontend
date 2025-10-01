import { isAuth } from "../utils.js";

// Auth checker
if (isAuth()) {
  const btnActions = document.getElementsByClassName("btn-action")
  for (let i = 0; i < 2; i++) {
    btnActions[i].innerHTML = `
      <button class="rounded-full f-1 btn bg-subtle-light color-content-light bold" >
        <a href="./events.html">
          الفعاليات
        </a>
      </button>
    `;
  }
}else{
  const btnActions = document.getElementsByClassName("btn-action")
  for (let i = 0; i < 2; i++) {
    btnActions[i].innerHTML = `
      <button class="rounded-full f-1 btn bg-primary color-content-dark bold" >
        <a href="./login.html">
          تسجيل مستخدم
        </a>
      </button>
      <button class="rounded-full f-1 btn bg-subtle-light color-content-light bold" >
        <a href="./register.html">
          مستخدم جديد
        </a>
      </button>
    `;
  }
}

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