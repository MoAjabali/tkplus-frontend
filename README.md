<h1 align="center"> 
  <img src="./assets/tkplus.svg" alt="TKPlus Logo" width="200">
</h1>

<p align="center">
  <a href="https://moajabali.github.io/tkplus-frontend/">Home</a> •
  <a href="https://moajabali.github.io/tkplus-frontend/events.html">Events</a> •
  <a href="https://moajabali.github.io/tkplus-frontend/dashboard/">Dashboard</a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=fff" alt="HTML5 Badge">
  <img src="https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=fff" alt="CSS3 Badge">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000" alt="JavaScript Badge">
  <img src="https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=fff" alt="Node.js Badge">
</p>

---

## 📘 Table of Contents
- [Overview](#-overview)
  - [About the Project](#about-the-project)
  - [Features](#-features)
  <!-- - [Screenshots](#screenshots) -->
- [Project Structure](#-project-structure)
- [APIs & Endpoints](#-apis--endpoints)
- [Built With](#-built-with)
- [Future Improvements](#-future-improvements)
- [Author](#-author)
<!-- - [Acknowledgments](#acknowledgments) -->

---

## 🧩 Overview

### About the Project
**TKPlus** is a modern and interactive **Event Management Platform** that allows users to explore, book, and manage event tickets seamlessly.  
It features both a **client-facing interface** and a **dashboard for administrators**, providing complete control over activities, tickets, and user management.

### 🎯 Features

#### 🧭 Client Interface
- **Landing Page:** Introductory overview with an elegant design and image slider.
- **Events Page:** Displays all activities as cards; clicking opens a **popup** with full details and ticket options, and you can added to the cart.
- **MyTickets:** Displays all your tickets>
- **Cart:** Displays all the activities you want to book it.
- **Contact Page:** A validated form for sending messages to support.

#### ⚙️ Admin Dashboard
- **Home:** Display statics for **Activities**, **Users**, and more.
- **Tables Pages:** For every table have a page such as **Activities**, **Users**, and more.
- **Data Table (CRUD):** Create, Read, Updates, and Delete records with confirmation prompts, and popup.
- **Settings:** Change theme colors and save preferences to **LocalStorage**.

<!-- ---

## 🖼️ Screenshots

> *(Add screenshots of your pages here — e.g. Landing page, Events page, Dashboard)*

![Landing Page](./screenshots/landing.jpg)
![Dashboard](./screenshots/dashboard.jpg) -->

---

## 🧱 Project Structure

### 📂 Data Models

#### 🗓️ Activity
```json
  {
    "activityID": 0,
    "activityTitle": "string",
    "activityDesc": "string",
    "activityType": "string",
    "activityDate": "2025-10-15T16:17:41.026Z",
    "activityLocation": "string",
    "capacity": 0,
    "status": "open"
  }
```

#### 🤵🏻 Activity Presenters
```json
  {
    "presenterID": 0,
    "activityID": 0,
    "presenterName": "string",
    "presenterJob": "string"
  }
```

#### 🎟️ Ticket
```json
  {
    "ticketID": 0,
    "ticketName": "string",
    "ticketDesc": "string",
    "ticketNo": "string",
    "price": 0,
    "status": "available",
    "userID": 0,
    "activityID": 0
  }
```
#### 👤 User
```json
  {
    "userID": 0,
    "userName": "string",
    "userEmail": "string",
    "userPhone": "string",
    "userRole": "admin",
    "userPassword": "string",
    "createdAt": "2025-10-15T16:21:02.303Z"
  }
```
___
# 🔗 APIs & Endpoints
### 🔒 Authentication
- `POST` `/api/users/register` → Register new user
- `POST` `/api/users/login` → Login user and return JWT

### 🗓️ Activities
- `POST` `/api/activities` → Create new activity (admin)
- `GET` `/api/activities` → List all activities
- `GET` `/api/activities/:id` → Get single activity details
- `PUT` `/api/activities/:id` → Update activity (admin)
- `DELETE` `/api/activities/:id` → Delete activity (admin)
- `GET` `/api/activities/search?type=&date` → Search/filter activities by type/date

### 🤵🏻 Activity Presenters
- `POST` `/api/activities/:activityID/presenters` → Add presenter to activity (admin)
- `GET` `/api/activities/:activityID/presenters` → List presenters for activity
- `PUT` `/api/presenters/:id` → Update presenter info (admin)
- `DELETE` `/api/presenters/:id` → Remove presenter (admin)

### 🎟️ Tickets
- `POST` `/api/tickets` → Create ticket (admin)
- `GET` `/api/tickets` → List all tickets
- `GET` `/api/tickets/:id` → Get ticket details
- `PUT` `/api/tickets/:id` → Update ticket info (admin)
- `DELETE` `/api/tickets/:id` → Delete ticket (admin)
- `POST` `/api/tickets/:id/reserve` → Reserve ticket (user)
- `POST` `/api/tickets/:id/cancel` → Cancel reservation (user)

### 👥 Users
- `GET` `/api/users/profile` → Get logged-in user profile (protected)
- `PUT` `/api/users/:id` → Update user data (admin or self)
- `GET` `/api/users/` → List all users (admin only)
- `DELETE` `/api/users/:id` → Delete user (admin only)

___
# 🧰 Built With
- 🧱 HTML5, CSS3, JavaScript (ES6+)
- ⚙️ Node.js + Express.js
- 🗄️ MongoDB (Mongoose)
- 💡 LocalStorage for theme & session persistence
- 🎨 Responsive UI with interactive elements and animations

___
# 🚀 Future Improvements
- Add search and filter functionality for events.
- Fixing the tickets Apis, and the cart.
- Completing the dashboard
- Integrate email notifications for ticket confirmation.
- Develop a React-based frontend version for scalability.

___
# 👨‍💻 Author
<p align="center"><b>Mohammed AL-jabali</b></p> 

<p align="center">
  <a href="https://github.com/MoAjabali/tkplus-frontend" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-100000?logo=github&logoColor=white&style=for-the-badge" alt="GitHub Repo">
  </a>
  <a href="https://moajabali.github.io/tkplus-frontend/" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-00C853?logo=vercel&logoColor=white&style=for-the-badge" alt="Live Demo">
  </a>
  <a href="https://www.linkedin.com/in/moajablai" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?logo=linkedin&logoColor=white&style=for-the-badge" alt="LinkedIn">
  </a>
  <a href="https://moajabali.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Portfolio-000000?logo=about.me&logoColor=white&style=for-the-badge" alt="Portfolio">
  </a>
</p>


<p align="center"><b>⭐ If you like this project, don't forget to give it a star on GitHub!</b></p> 