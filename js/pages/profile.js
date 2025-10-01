import { getProfile, updateUser } from "../api/usersApi.js";
import { showCartBudget, showNotification, formatDateToYearMonthDay, checkAuth } from "../utils.js";
checkAuth();
showCartBudget();


// load user data
async function loadUserProfile() {
  try {
    const response = await getProfile();
    const user = response.data.user;
    
    // ملء النموذج ببيانات المستخدم
    document.getElementById('name').value = user.userName || '';
    document.getElementById('email').value = user.userEmail || '';
    document.getElementById('phone').value = user.userPhone || '';
    
    // تخزين معرف المستخدم للاستخدام في التحديث
    document.getElementById('profile-form').dataset.userId = user.userID;
    
    // إضافة معلومات إضافية عن المستخدم
    const userInfoContainer = document.getElementById('user-info-container');
    if (userInfoContainer) {
      userInfoContainer.innerHTML = `
        <div class="user-info-card bg-subtle-light p-2 rounded-1 mb-2">
          <div class="flex flex-jc-space-btw flex-ai-center mb-1">
            <h3 class="f-15 color-content-light bold m-0">معلومات الحساب</h3>
            <span class="status-badge ${user.userRole === 'admin' ? 'bg-primary' : 'bg-background-light'} color-content-dark">
              ${user.userRole === 'admin' ? 'مدير' : 'مستخدم'}
            </span>
          </div>
          <div class="flex flex-direction-c gap-1">
            <p class="m-0 color-content-light"><i class="fas fa-id-card ml-1"></i> رقم المستخدم: <span class="bold">${user.userID}</span></p>
            <p class="m-0 color-content-light"><i class="fas fa-calendar-alt ml-1"></i> تاريخ الإنشاء: <span class="bold">${formatDateToYearMonthDay(user.createdAt)}</span></p>
            <p class="m-0 color-content-light"><i class="fas fa-envelope ml-1"></i> البريد الإلكتروني: <span class="bold">${user.userEmail}</span></p>
          </div>
        </div>
      `;
    }
  } catch (error) {
    showNotification(`حدث خطأ في جلب بيانات المستخدم: ${error.message}`, 'error');
    console.error('Error loading user profile:', error);
  }
}


loadUserProfile();
document.getElementById('profile-form').addEventListener('submit', async (e)=>{
  e.preventDefault();
  const updateProfileBtn = document.getElementById('update-profile-btn');
  updateProfileBtn.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;
  updateProfileBtn.disabled = true;


  const userId = document.getElementById('profile-form').dataset.userId;
  const name = document.getElementById('name').value;
  const phone = document.getElementById('phone').value;
  const password = document.getElementById('password').value;
  const passwordConfirmation = document.getElementById('password_confirmation').value;


  if (password && password !== passwordConfirmation) {
    updateProfileBtn.innerHTML = `تحديث البيانات`;
    updateProfileBtn.disabled = false;
    showNotification('كلمة المرور وتأكيدها غير متطابقين', 'error');
    return;
  }
  
  const userData = {
    userName: name,
    userPhone: phone
  };
  
  if (password) {
    userData.userPassword = password;
  }
  
  try {
    const response = await updateUser(userId, userData);
    showNotification('تم تحديث البيانات بنجاح', 'success');
    loadUserProfile();
  } catch (error) {
    showNotification(`حدث خطأ في تحديث البيانات: ${error.message}`, 'error');
    console.error('Error updating user profile:', error);
  } finally {
    updateProfileBtn.innerHTML = `تحديث البيانات`;
    updateProfileBtn.disabled = false;
  }
});
document.getElementById('logout-btn').addEventListener('click', ()=>{
  localStorage.removeItem('Token');
  window.location.href = 'login.html';
});



// تبديل قسم الإعدادات
// function toggleSettings() {
//   const settingsSection = document.getElementById('settings-section');
//   if (settingsSection.classList.contains('hidden')) {
//     settingsSection.classList.remove('hidden');
//     document.getElementById('toggle-settings-btn').innerHTML = '<i class="fas fa-chevron-up ml-1"></i> إخفاء الإعدادات';
//   } else {
//     settingsSection.classList.add('hidden');
//     document.getElementById('toggle-settings-btn').innerHTML = '<i class="fas fa-chevron-down ml-1"></i> عرض الإعدادات';
//   }
// }

// حفظ الإعدادات
// function saveSettings() {
//   const darkMode = document.getElementById('dark-mode-toggle').value === '2';
//   const primaryColor = document.querySelector('input[name="color-choice"]:checked').value;
//   const saveInBrowser = document.getElementById('save-settings-toggle').value === '2';
  
//   // حفظ الإعدادات في التخزين المحلي إذا تم اختيار ذلك
//   if (saveInBrowser) {
//     localStorage.setItem('settings', JSON.stringify({
//       darkMode,
//       primaryColor,
//       saveInBrowser
//     }));
//   } else {
//     localStorage.removeItem('settings');
//   }
  
//   showNotification('تم حفظ الإعدادات بنجاح', 'success');
// }

// // تحميل الإعدادات المحفوظة
// function loadSettings() {
//   const savedSettings = JSON.parse(localStorage.getItem('settings') || 'null');
//   if (savedSettings) {
//     // تطبيق الإعدادات المحفوظة
//     document.getElementById('dark-mode-toggle').value = savedSettings.darkMode ? '2' : '1';
//     document.getElementById('dark-mode-toggle').style.background = savedSettings.darkMode ? '#F4991A' : '#ccc';
    
//     document.querySelector(`input[name="color-choice"][value="${savedSettings.primaryColor}"]`).checked = true;
    
//     document.getElementById('save-settings-toggle').value = savedSettings.saveInBrowser ? '2' : '1';
//     document.getElementById('save-settings-toggle').style.background = savedSettings.saveInBrowser ? '#F4991A' : '#ccc';
//   }
// }

// load the page
// document.addEventListener('DOMContentLoaded', () => {
  // loadSettings();
  
  
  // إضافة مستمعي الأحداث للإعدادات
  // if (document.getElementById('toggle-settings-btn')) {
  //   document.getElementById('toggle-settings-btn').addEventListener('click', toggleSettings);
  // }
  
  // if (document.getElementById('save-settings-btn')) {
  //   document.getElementById('save-settings-btn').addEventListener('click', saveSettings);
  // }
  
  // // إضافة مستمعي الأحداث للمفاتيح التبديلية
  // const toggles = document.querySelectorAll(".toggle");
  // toggles.forEach((toggle) => {
  //   toggle.addEventListener("input", () => {
  //     if (toggle.value === "2") {
  //       toggle.style.background = "#F4991A";
  //     } else {
  //       toggle.style.background = "#ccc";
  //     }
  //   });
  // });
// });