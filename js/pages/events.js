import { getActivities } from "../api/activitiesApi.js";
import {getPresenters} from "../api/presentersApi.js";
import { showNotification, openPopup, getRandomInt, checkAuth, getCartItems, showCartBudget } from "../utils.js";
checkAuth();

getActivities().then( (data)=>{
  data.data.activities.forEach(activity => {
    appendToEventsScreen(activity);
  });
}).catch( (err)=>{
  showNotification(`حدث خطأ في جلب البيانات ${err.message}`, "error");
})

function appendToEventsScreen(activity) {
  const randomInt = getRandomInt(1, 5); //For Photos
  const eventsContainer = document.querySelector("#events-container");
  // create the main card
  const eventCard = document.createElement("article");
  eventCard.className = "event-box bg-subtle-light rounded-1 transitions-1 overflow-hidden flex flex-direction-c";
  
  // Append the first section => the img and the budget
  eventCard.innerHTML = `
  <div class="relative">
    <img src="assets/event${randomInt}.${randomInt<4 ? "png" : "jpg"}" class="w-full box-img"/>
    <div class="budget absolute ${activity.status === "open" ? "bg-background-light" : "bg-red"} color-content-light p-025 f-075 bold rounded-1">${activity.status ? "مفتوح" : "مغلق"}</div>

  </div>
  `;
  // create the content container => Title, location, Time, show Details btn
  const eventCardDiv = document.createElement("div");
  eventCardDiv.className = "p-1 flex flex-direction-c flex-jc-space-btw";
  eventCardDiv.style.flexGrow = "1";
  eventCardDiv.innerHTML = `
    <div>
      <h3 class="f-2 bold color-content-light m-0 ">
        ${activity.activityTitle}
      </h3>
      <p class="m-0 color-lighter-content-dark m-0 mb-1">
        ${
            new Date(activity.activityDate).toLocaleDateString("ar-EG", {
                year: "numeric", month: "long", day: "numeric"
        })} • ${activity.activityLocation}
      </p>
    </div>
  `

  // The Details Btn => Creating the Element, Adding the classes & content, and add the click function -show popup-
  const showActivityDetailsBtn = document.createElement("button");
  showActivityDetailsBtn.className = `w-full rounded-2 ${activity.status === "open" ? "bg-primary" : "bg-lighter-content-dark"} color-content-dark bold btn`;
  if(activity.status !== "open") showActivityDetailsBtn.setAttribute("disabled");
  showActivityDetailsBtn.innerHTML = `${activity.status === "open" ? "تفاصيل" : "مغلق"}`;
  showActivityDetailsBtn.addEventListener("click", async (e) => {
    const originalText = e.target.innerHTML;
    e.target.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    e.target.disabled = true;
    openPopup(await activityDetails(activity, randomInt));
    e.target.innerHTML = originalText;
    e.target.disabled = false;
  })


  // Appending The elements
  eventCardDiv.appendChild(showActivityDetailsBtn); // append the btn to div content
  eventCard.appendChild(eventCardDiv); // append the div content to the card
  eventsContainer.appendChild(eventCard); // append the card to the page
}

// The Details that show in the popup 
async function activityDetails(activity, randomInt) {
  const presentersHTML = await getPresenters(activity.activityID).then((data) => data.data.presenters).then((presenters) => {
    let presentersHTML = "";
    presenters.forEach(presenter => {
      presentersHTML += `
        <div class="presenter-item">
          <p class="m-0 color-lighter-content-dark">${presenter.presenterName}</p>
          <p class="m-0 color-lighter-content-dark">${presenter.presenterJob}</p>
        </div>
      `
    });
    return presentersHTML;
  })

  return `
    <div class="activity-details-container">
      <div class="activity-image-container">
        <img src="./assets/event${randomInt}.${randomInt < 4 ? "png" : "jpg"}" class="activity-image" />
        <div class="status-badge ${activity.status === "open" ? "status-open" : "status-closed"}">
          ${activity.status ? "مفتوح" : "مغلق"}
        </div>
      </div>
      
      <div class="activity-content">
        <div>
          <h2 class="activity-title">${activity.activityTitle}</h2>
          <p class="activity-description">${activity.activityDesc}</p>

          <div class="activity-info">
            <p class="m-0">
              <i class="fa-regular fa-calendar"></i>
              <span id="popup-date">${new Date(activity.activityDate).toLocaleDateString("ar-EG", {
                year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"
              })}</span>
            </p>
            <p class="m-0">
              <i class="fa-solid fa-location-dot"></i>
              <span id="popup-location">${activity.activityLocation}</span>
            </p>
            <p class="m-0">
              <i class="fa-solid fa-users"></i>
              <span>السعة: <span id="popup-capacity">${activity.capacity}</span></span>
            </p>
          </div>
          
          <div class="presenters-container">
            <h3>المقدمون</h3>
            ${presentersHTML}
          </div>
        </div>
        
        <div class="purchase-section">
          <div class="quantity-price-container">
            <div class="quantity-control">
              <span class="quantity-label">الكمية:</span>
              <input type="number" min="1" max="${activity.capacity}" value="1" id="quantity-input" />
            </div>
            <div class="price-tag">
              <i class="fa-solid fa-tag ml-1"></i> ${activity.price || 50} ريال
            </div>
          </div>
          <button ${activity.status !== "open" ? "disabled" : ""} onclick="addToCart(${activity.activityID})" 
            class="add-to-cart-btn">
            <i class="fa-solid fa-cart-plus"></i>
            إضافة إلى السلة
          </button>
        </div>
      </div>
    </div>
  `
}

// Add to the cart
window.addToCart = function(activityId) {
  const quantity = document.getElementById('quantity-input').value;
  const cartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
  
  // التحقق من وجود العنصر في السلة
  const existingItem = cartItems.find(item => item.activityId === activityId);
  
  if (existingItem) {
    existingItem.quantity = parseInt(quantity);
  } else {
    cartItems.push({
      activityId: activityId,
      quantity: parseInt(quantity)
    });
    let cartBadge = document.getElementById("cart-badge");
    cartBadge.classList.remove("hide");
    cartBadge.classList.add("show");
    cartBadge.innerHTML = (parseInt(cartBadge.innerHTML=="" ? 0 : cartBadge.innerHTML) + 1).toString(); 
  }
  
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  showNotification('تمت الإضافة إلى السلة بنجاح', 'success');
  document.getElementById('closePopup').click();
}
showCartBudget();