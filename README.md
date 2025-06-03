# 🚀 Product Hunt Clone

A full-stack clone of [Product Hunt](https://www.producthunt.com/) where makers can launch their products and users can discover, upvote, and comment on them. Built using **Node.js**, **MongoDB**, and **Vite React.js** for a sleek and modern experience.

---

## ✨ Featured In

🌟 **Built with love by [Yuvraj Singh](https://github.com/yuvraj042003)** — an aspiring Full Stack Developer passionate about crafting meaningful and intuitive user experiences.

---
Live Link: https://product-hunt-coral.vercel.app/
---


## 🧠 Features

### 🛠️ For Makers (Product Creators)
- ✅ Launch a new product with image upload (via Cloudinary)
- ✏️ Edit and update launched products
- 🗑️ Delete your own products
- 🧑‍🤝‍🧑 Add a launch team

### 🧑‍💻 For Users
- 🔍 Discover new products daily
- 👍 Upvote your favorite tools
- 💬 Leave comments and feedback
- 🧾 View product details including description, carousel, launch team, and comments

### 🔐 Auth System
- 📝 Register and Login with JWT auth
- 🙍 View & update your profile
- 👮 Role-based restrictions (e.g., only owners can edit/delete products)

---

## 🏗️ Tech Stack

| Technology        | Description                       |
|-------------------|-----------------------------------|
| **Frontend**      | React.js (Rest API) |
| **Backend**       | Node.js, Express.js               |
| **Database**      | MongoDB + Mongoose                |
| **Image Upload**  | Multer + Cloudinary               |
| **Authentication**| JWT + Bcrypt                      |
| **UI**            | Tailwind CSS + Shadcn UI          |
| **Deployment**    | Render (Backend) + Vercel (Frontend) |

---

## 📁 Project Structure

```bash
Product-Hunt/
│
├── backend/                 # Node.js, Express API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── ...
│
├── frontend/                # Nuxt 3 application
│   ├── pages/
│   ├── components/
│   ├── composables/
│   └── ...
│
├
└── README.md
