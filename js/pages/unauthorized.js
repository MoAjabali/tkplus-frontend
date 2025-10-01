import { getProfile } from "../api/usersApi.js";

if(localStorage.getItem("Token")){
    getProfile().then((res)=>{
        if(res.data.userRole !== "admin"){
          document.getElementById("unauthorized-message").textContent = "عذرا, لا تلمك الصلاحية للوصول الى هذه الصفحة.";
          document.getElementById("action-buttons").innerHTML = `
            <a href="./index.html" class="p-1 bg-primary color-content-dark bold rounded-2 hover-transitions">
              عد إلى الصفحة الرئيسية
            </a>
          `;
        }
    })
} else {
  document.getElementById("unauthorized-message").textContent = "عذراً، لا يمكنك الوصول إلى هذه الصفحة. يرجى تسجيل الدخول أولاً.";
  document.getElementById("action-buttons").innerHTML = `
    <a href="./login.html" class="p-1 bg-primary color-content-dark bold rounded-2 hover-transitions">
      <i class="fas fa-sign-in-alt ml-1"></i>
      تسجيل الدخول
    </a>
    <a href="./register.html" class="p-1 bg-subtle-light color-content-light bold rounded-2 hover-transitions">
      <i class="fas fa-user-plus ml-1"></i>
      إنشاء حساب جديد
    </a>
  `;

}
