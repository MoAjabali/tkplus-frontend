import { login } from "../api/usersApi.js";
import { showNotification } from "../utils.js";

document.getElementById("login-btn").addEventListener("click", (e)=>{
  e.preventDefault();
  const originalText = e.target.innerHTML;
  e.target.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
  e.target.disabled = true;
  const userEmail = document.getElementById("email").value;
  const userPassword = document.getElementById("password").value;
  login({userEmail, userPassword}).then(data => {
    console.log(data);
    if(data.token){
      localStorage.setItem("Token", data.token);
      window.location.replace("/events.html");
    }else
      throw new Error("حدث خطأ أثناء تسجيل الدخول");
  }).catch(err => {
    console.log(err);
    e.target.innerHTML = originalText;
    e.target.disabled = false;
    showNotification(`حدث خطاء: ${err.message}`, "error");
  });
  showNotification("تم تسجيلك بنجاح", "success");
});