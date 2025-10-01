// Notification
export function showNotification(message, type) {
  const notify = document.createElement("div");
  notify.classList.add("notification", type, "p-1", "rounded-05", "color-content-dark", "flex", "flex-ai-center", "dir-rtl", "gap-1", "bold", "f-1");

  const icon = document.createElement("i");
  if(type === "success") icon.className = "fa-solid fa-circle-check";
  else if(type === "error") icon.className = "fa-solid fa-circle-xmark";

  notify.appendChild(icon);

  const text = document.createElement("span");
  text.innerText = message;
  notify.appendChild(text);

  document.getElementById("notification-container").appendChild(notify);

  setTimeout(() => notify.classList.add("show"), 10);

  setTimeout(() => {
    notify.classList.remove("show");
    setTimeout(() => notify.remove(), 300);
  }, 3000);
}

// Popup
export function openPopup(htmlContent) {
  const popupContent = document.getElementById("popup-content-div");
  popupContent.innerHTML = htmlContent;
  document.getElementById("popup").classList.add("active");
  
  // تحسين تجربة المستخدم عند فتح النافذة المنبثقة
  document.body.style.overflow = "hidden"; // منع التمرير في الخلفية
  
  // close btn
  document.getElementById("closePopup").addEventListener("click", closePopupHandler);
  
  // إغلاق النافذة عند النقر خارجها
  document.getElementById("popup").addEventListener("click", function(e) {
    if (e.target === this) {
      closePopupHandler();
    }
  });
  
  // إضافة مستمع لمفتاح Escape
  document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
      closePopupHandler();
    }
  });
}

function closePopupHandler() {
  document.getElementById("popup").classList.remove("active");
  document.getElementById("popup-content-div").innerHTML = "";
  document.body.style.overflow = ""; // استعادة التمرير
  
  // إزالة مستمعي الأحداث
  document.getElementById("closePopup").removeEventListener("click", closePopupHandler);
  document.getElementById("popup").removeEventListener("click", closePopupHandler);
  document.removeEventListener("keydown", closePopupHandler);
}

// 
export const getCartItems = () =>  JSON.parse(localStorage.getItem('cartItems') || '[]')

// Get Random Int
export function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Auth User
export function checkAuth() {
  const token = localStorage.getItem('Token');
  if (!token) {
    window.location.href = 'unauthorized.html';
  }
}

export const isAuth = () => localStorage.getItem('Token');

export function showCartBudget() {
  if (localStorage.getItem('cartItems')) {
    let cartBadge = document.getElementById("cart-badge");
    cartBadge.classList.remove("hide");
    cartBadge.classList.add("show");
    cartBadge.innerHTML = getCartItems().length; 
  }
}

export function formatDateToYearMonthDay(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}