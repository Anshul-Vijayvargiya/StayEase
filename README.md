# 🏠 StayEase

A full-stack **Airbnb-inspired vacation rental platform** built with Node.js, Express, MongoDB, and EJS. StayEase allows users to browse, create, and manage property listings, leave reviews, and handle secure authentication — all backed by cloud image storage via Cloudinary.

---

## 🚀 Live Demo

> Deploy link goes here (e.g., Render / Railway)

---

## ✨ Features

- 🔐 **User Authentication** — Register, login, and logout using Passport.js (local strategy)
- 🏡 **Listings CRUD** — Create, read, update, and delete property listings
- 🖼️ **Image Uploads** — Upload listing images stored securely on Cloudinary
- ⭐ **Reviews System** — Authenticated users can post and delete reviews with ratings (1–5)
- 🔒 **Authorization** — Only listing owners can edit/delete their listings; only review authors can delete their reviews
- 🛡️ **Input Validation** — Server-side validation with Joi for both listings and reviews
- 💬 **Flash Messages** — User-friendly success and error notifications
- 🗄️ **Session Persistence** — Sessions stored in MongoDB via `connect-mongo`
- 📦 **MVC Architecture** — Clean separation of Models, Views, and Controllers

---

## 🛠️ Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Runtime      | Node.js 22.x                        |
| Framework    | Express.js 4.x                      |
| Database     | MongoDB Atlas + Mongoose             |
| Templating   | EJS + ejs-mate (layouts)            |
| Auth         | Passport.js (Local Strategy)        |
| File Upload  | Multer + Cloudinary                 |
| Validation   | Joi                                 |
| Sessions     | express-session + connect-mongo     |
| Flash Msgs   | connect-flash                       |
| Env Config   | dotenv                              |

---

## 📁 Project Structure

```
StayEase/
├── app.js                  # Entry point — Express app config, middleware, routes
├── cloudConfig.js          # Cloudinary + Multer storage config
├── middleware.js           # Auth guards, ownership checks, validation middleware
├── schema.js               # Joi validation schemas for listings & reviews
│
├── models/
│   ├── listing.js          # Listing schema (title, price, location, image, owner)
│   ├── review.js           # Review schema (comment, rating, author)
│   └── user.js             # User schema (via passport-local-mongoose)
│
├── routes/
│   ├── listings.js         # Routes: GET/POST /listings, PUT/DELETE /listings/:id
│   ├── review.js           # Routes: POST/DELETE /listings/:id/reviews/:reviewId
│   └── user.js             # Routes: /signup, /login, /logout
│
├── controllers/
│   ├── listings.js         # Controller logic for all listing operations
│   ├── reviews.js          # Controller logic for review operations
│   └── user.js             # Controller logic for auth (signup, login, logout)
│
├── views/
│   ├── layouts/            # EJS layout templates (boilerplate/base.ejs)
│   ├── includes/           # Partials: navbar, flash messages, footer
│   ├── listings/           # index, show, new, edit views
│   ├── users/              # signup, login views
│   └── error.ejs           # Global error page
│
├── public/                 # Static assets (CSS, JS, images)
├── utils/
│   ├── ExpressError.js     # Custom error class
│   └── wrapAsync.js        # Async error wrapper
│
├── init/                   # Seed data scripts
├── uploads/                # Temp local uploads (pre-cloud)
├── .env                    # Environment variables (not committed)
├── .gitignore
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v22+
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- [Cloudinary](https://cloudinary.com/) account

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/stayease.git
cd stayease
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following:

```env
ATLASDB_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/stayease
SECRET=your_super_secret_session_key

CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
```

### 4. (Optional) Seed the Database

```bash
node init/index.js
```

### 5. Start the Server

```bash
node app.js
```

The app will be running at **http://localhost:8080**

---

## 🔗 API Routes

### Listings

| Method   | Route                   | Description                        | Auth Required |
|----------|-------------------------|------------------------------------|---------------|
| `GET`    | `/listings`             | Browse all listings                | ❌            |
| `GET`    | `/listings/new`         | Show form to create new listing    | ✅            |
| `POST`   | `/listings`             | Create a new listing               | ✅            |
| `GET`    | `/listings/:id`         | View a specific listing            | ❌            |
| `GET`    | `/listings/:id/edit`    | Show edit form for a listing       | ✅ (Owner)    |
| `PUT`    | `/listings/:id`         | Update a listing                   | ✅ (Owner)    |
| `DELETE` | `/listings/:id`         | Delete a listing                   | ✅ (Owner)    |

### Reviews

| Method   | Route                                      | Description              | Auth Required   |
|----------|--------------------------------------------|--------------------------|-----------------|
| `POST`   | `/listings/:id/reviews`                    | Add a review             | ✅              |
| `DELETE` | `/listings/:id/reviews/:reviewId`          | Delete a review          | ✅ (Author)     |

### Authentication

| Method | Route      | Description           |
|--------|------------|-----------------------|
| `GET`  | `/signup`  | Show signup form      |
| `POST` | `/signup`  | Register new user     |
| `GET`  | `/login`   | Show login form       |
| `POST` | `/login`   | Authenticate user     |
| `GET`  | `/logout`  | Log out current user  |

---

## 🔒 Security Features

- Passwords hashed automatically via `passport-local-mongoose`
- HTTP-only, secure session cookies in production
- Sessions encrypted with a custom secret key
- Authorization checks prevent unauthorized edits/deletions
- Joi validation on all form inputs to prevent malformed data

---

## 🌐 Deployment (Render)

1. Set **Build Command**: `npm install`
2. Set **Start Command**: `node app.js`
3. Add all environment variables from `.env` in the Render dashboard
4. Ensure `NODE_ENV=production` is set so secure cookies are enabled

---

## 📸 Screenshots

> *(Add screenshots of listings page, show page, and forms here)*

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

## 👤 Author

**Anshul Vijayvargiya**  
GitHub: [@Anshul-Vijayvargiya](https://github.com/Anshul-Vijayvargiya)
