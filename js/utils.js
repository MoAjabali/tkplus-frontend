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