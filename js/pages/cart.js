import { getActivities } from "../api/activitiesApi.js";
import { showNotification, checkAuth, getRandomInt } from "../utils.js";
checkAuth();

// الحصول على عناصر السلة من التخزين المحلي
function getCartItems() {
  return JSON.parse(localStorage.getItem('cartItems') || '[]');
}

// تحديث عدد العناصر في عربة التسوق
// function updateCartCount() {
//   const cartItems = getCartItems();
//   const cartCountElement = document.getElementById('cart-count');
//   if (cartCountElement) {
//     cartCountElement.textContent = cartItems.length;
//   }
// }

// تحميل بيانات الأنشطة
async function loadActivities() {
  try {
    const response = await getActivities();
    return response.data.activities;
  } catch (error) {
    showNotification(`حدث خطأ في جلب بيانات الأنشطة: ${error.message}`, 'error');
    console.error('Error loading activities:', error);
    return [];
  }
}

// عرض عناصر السلة
async function renderCartItems() {
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartItems = getCartItems();
  const activities = await loadActivities();
  
  if (cartItems.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="empty-cart">
        <i class="fas fa-shopping-cart"></i>
        <h3 class="color-content-light">عربة التسوق فارغة</h3>
        <p class="color-lighter-content-dark">لم تقم بإضافة أي فعاليات إلى عربة التسوق بعد.</p>
        <a href="./events.html" class="btn bg-primary color-content-dark bold rounded-1 hover-transitions">
          استعرض الفعاليات
        </a>
      </div>
    `;
    return;
  }
  
  let cartItemsHTML = '';
  let totalPrice = 0;
  
  // إنشاء عناصر السلة
  cartItems.forEach(item => {
    const activity = activities.find(a => a.activityID === item.activityId);
    if (!activity) return;
    
    const itemPrice = (activity.price || 50) * item.quantity;
    totalPrice += itemPrice;
    let randomInt = getRandomInt(1, 5);
    cartItemsHTML += `
      <div class="cart-item flex flex-jc-space-btw flex-ai-center" data-id="${activity.activityID}">
        <div class="flex gap-1 flex-ai-center">
          <img src="assets/event${randomInt}.${randomInt < 5 ? 'png' : 'jpg'}" class="cart-item-image" alt="${activity.activityTitle}" />
          <div>
            <h4 class="f-125 bold color-content-light m-0">${activity.activityTitle}</h4>
            <p class="color-lighter-content-dark m-0">${new Date(activity.activityDate).toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}</p>
            <p class="color-lighter-content-dark m-0">${activity.activityLocation}</p>
            <p class="color-primary bold m-0">${activity.price || 50} ريال / تذكرة</p>
          </div>
        </div>
        <div class="flex flex-direction-c flex-ai-center gap-1">
          <div class="quantity-control">
            <button class="quantity-btn decrease" data-id="${activity.activityID}">-</button>
            <input type="number" class="quantity-input" value="${item.quantity}" min="1" max="${activity.capacity}" data-id="${activity.activityID}" />
            <button class="quantity-btn increase" data-id="${activity.activityID}">+</button>
          </div>
          <p class="bold color-content-light m-0">${itemPrice} ريال</p>
          <button class="remove-btn" data-id="${activity.activityID}">
            <i class="fas fa-trash-alt"></i>
          </button>
        </div>
      </div>
    `;
  });
  
  cartItemsContainer.innerHTML = cartItemsHTML;
  
  // عرض ملخص السلة
  renderCartSummary(totalPrice);
  
  // إضافة مستمعي الأحداث للأزرار
  addCartEventListeners();
}

// عرض ملخص السلة
function renderCartSummary(totalPrice) {
  const cartSummaryContainer = document.getElementById('cart-summary-container');
  const cartItems = getCartItems();
  
  cartSummaryContainer.innerHTML = `
    <div class="summary-row">
      <span class="color-content-light">عدد العناصر:</span>
      <span class="color-content-light bold">${cartItems.length}</span>
    </div>
    <div class="summary-row">
      <span class="color-content-light">إجمالي السعر:</span>
      <span class="color-content-light bold">${totalPrice} ريال</span>
    </div>
    <div class="summary-row summary-total">
      <span class="color-content-light">المجموع الكلي:</span>
      <span class="color-primary bold">${totalPrice} ريال</span>
    </div>
  `;
}

// إضافة مستمعي الأحداث لأزرار السلة
function addCartEventListeners() {
  // أزرار زيادة الكمية
  document.querySelectorAll('.increase').forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.dataset.id);
      updateItemQuantity(id, 1);
    });
  });
  
  // أزرار إنقاص الكمية
  document.querySelectorAll('.decrease').forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.dataset.id);
      updateItemQuantity(id, -1);
    });
  });
  
  // حقول إدخال الكمية
  document.querySelectorAll('.quantity-input').forEach(input => {
    input.addEventListener('change', () => {
      const id = parseInt(input.dataset.id);
      const quantity = parseInt(input.value);
      setItemQuantity(id, quantity);
    });
  });
  
  // أزرار إزالة العناصر
  document.querySelectorAll('.remove-btn').forEach(button => {
    button.addEventListener('click', () => {
      const id = parseInt(button.dataset.id);
      removeCartItem(id);
    });
  });
}

// تحديث كمية العنصر
function updateItemQuantity(id, change) {
  const cartItems = getCartItems();
  const itemIndex = cartItems.findIndex(item => item.activityId === id);
  
  if (itemIndex !== -1) {
    cartItems[itemIndex].quantity = Math.max(1, cartItems[itemIndex].quantity + change);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems();
  }
}

// تعيين كمية العنصر
function setItemQuantity(id, quantity) {
  const cartItems = getCartItems();
  const itemIndex = cartItems.findIndex(item => item.activityId === id);
  
  if (itemIndex !== -1 && quantity > 0) {
    cartItems[itemIndex].quantity = quantity;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    renderCartItems();
  }
}

// إزالة عنصر من السلة
function removeCartItem(id) {
  const cartItems = getCartItems().filter(item => item.activityId !== id);
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  showNotification('تم إزالة العنصر من السلة', 'success');
  renderCartItems();
  updateCartCount();
}

// إتمام الطلب
function handleCheckout() {
  const cartItems = getCartItems();
  
  if (cartItems.length === 0) {
    showNotification('عربة التسوق فارغة', 'error');
    return;
  }
  
  // هنا يمكن إضافة منطق إرسال الطلب إلى الخادم
  // لأغراض العرض، سنقوم فقط بإفراغ السلة وعرض إشعار نجاح
  localStorage.setItem('cartItems', '[]');
  showNotification('تم إتمام الطلب بنجاح', 'success');
  
  setTimeout(() => {
    window.location.href = 'events.html';
  }, 2000);
}

// تهيئة الصفحة
document.addEventListener('DOMContentLoaded', () => {
  // updateCartCount();
  renderCartItems();
  
  // إضافة مستمع حدث لزر إتمام الطلب
  document.getElementById('checkout-btn').addEventListener('click', handleCheckout);
});