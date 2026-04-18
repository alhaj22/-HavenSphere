# 🏠 HavenSphere — Full-Stack MERN Real Estate Platform

A production-ready **MERN stack** real estate marketplace with **admin-controlled architecture**, JWT authentication, role-based access control, and a premium dark-themed UI.

![Stack](https://img.shields.io/badge/Stack-MERN-green) ![Auth](https://img.shields.io/badge/Auth-JWT-blue) ![Style](https://img.shields.io/badge/Style-TailwindCSS-purple)

---

## 🚀 Tech Stack

| Layer      | Technology                              |
|------------|----------------------------------------|
| Frontend   | React 19 (Vite), Tailwind CSS 4       |
| Backend    | Node.js, Express 5                     |
| Database   | MongoDB (Mongoose 8)                   |
| Auth       | JWT + bcrypt                           |
| API Calls  | Axios                                  |
| Routing    | React Router 7                         |
| Icons      | Lucide React                           |
| Uploads    | Multer                                 |

---

## 📁 Folder Structure

```
HavenSphere/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js    # Admin CRUD (users + properties)
│   │   ├── authController.js     # Register, login, getMe
│   │   ├── bookingController.js  # Booking CRUD
│   │   ├── favoriteController.js # Favorites/wishlist
│   │   ├── propertyController.js # Property CRUD + search/filter
│   │   ├── reviewController.js   # Review CRUD
│   │   └── userController.js     # Profile management
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT verify + role-based access
│   │   ├── errorMiddleware.js    # Global error handler
│   │   ├── uploadMiddleware.js   # Multer image upload
│   │   └── validateRequest.js    # Express-validator check
│   ├── models/
│   │   ├── Booking.js
│   │   ├── Favorite.js
│   │   ├── Property.js
│   │   ├── Review.js
│   │   └── User.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── bookingRoutes.js
│   │   ├── favoriteRoutes.js
│   │   ├── propertyRoutes.js
│   │   ├── reviewRoutes.js
│   │   ├── uploadRoutes.js
│   │   └── userRoutes.js
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── asyncHandler.js
│   │   └── generateToken.js
│   ├── uploads/                  # Uploaded images
│   ├── seed.js                   # Database seeder
│   ├── server.js                 # Express app entry
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Blog/
│   │   │   ├── CallToAction/
│   │   │   ├── FeaturedProperties/
│   │   │   ├── Footer/
│   │   │   ├── Header/           # Responsive nav with user dropdown
│   │   │   ├── Hero/
│   │   │   ├── LatestListings/
│   │   │   ├── PropertyCategories/
│   │   │   ├── Testimonials/
│   │   │   ├── WhyChooseUs/
│   │   │   └── common/
│   │   │       ├── AdminRoute.jsx
│   │   │       ├── PageLoader.jsx
│   │   │       ├── ProtectedRoute.jsx
│   │   │       ├── SectionFallback.jsx
│   │   │       └── ToastContainer.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx    # Auth state management
│   │   │   ├── ToastContext.jsx   # Toast notifications
│   │   │   └── authContextInstance.js
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   ├── useProperties.js
│   │   │   └── useToast.js
│   │   ├── pages/
│   │   │   ├── AdminPage.jsx      # Full admin dashboard
│   │   │   ├── DashboardPage.jsx  # User dashboard
│   │   │   ├── FavoritesPage.jsx  # Saved properties
│   │   │   ├── HomePage.jsx       # Landing page
│   │   │   ├── LoginPage.jsx
│   │   │   ├── NotFoundPage.jsx
│   │   │   ├── ProfilePage.jsx
│   │   │   ├── PropertiesPage.jsx # Listing + search/filter
│   │   │   ├── PropertyDetailPage.jsx
│   │   │   └── RegisterPage.jsx
│   │   ├── services/api/
│   │   │   ├── adminService.js
│   │   │   ├── authService.js
│   │   │   ├── bookingService.js
│   │   │   ├── client.js          # Axios instance + interceptors
│   │   │   ├── favoriteService.js
│   │   │   ├── propertyService.js
│   │   │   └── userService.js
│   │   ├── styles/
│   │   │   ├── base.css           # Animations & resets
│   │   │   ├── components.css     # UI component classes
│   │   │   └── tokens.css         # Design tokens (colors, fonts)
│   │   ├── utils/
│   │   │   └── formValidators.js
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
└── README.md
```

---

## ⚡ Setup Instructions

### Prerequisites
- Node.js (v18+)
- MongoDB (Atlas or local)

### 1. Clone & Install

```bash
git clone <repo-url>
cd HavenSphere

# Backend
cd backend
cp .env.example .env    # Edit with your MongoDB URI & JWT secret
npm install

# Frontend
cd ../frontend
cp .env.example .env
npm install
```

### 2. Configure Environment

**Backend `.env`:**
```env
PORT=5001
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/havensphere
JWT_SECRET=your_super_secret_key
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**Frontend `.env`:**
```env
VITE_API_URL=http://localhost:5001/api
```

### 3. Seed Database

```bash
cd backend
npm run seed
```

This creates:
- **Admin**: `admin@havensphere.com` / `admin123456`
- **User**: `john@example.com` / `user123456`
- **10 sample properties** with images and amenities

### 4. Run Development

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5001/api`

---

## 🔐 Authentication & Authorization

| Feature | Implementation |
|---------|---------------|
| Password hashing | bcrypt (12 rounds) |
| Token generation | JWT with configurable expiry |
| Token storage | localStorage |
| Auto-attach token | Axios request interceptor |
| Auto-logout on 401 | Axios response interceptor |
| Route protection | `ProtectedRoute` + `AdminRoute` HOCs |
| Blocked users | Checked at login + every API request |

### Roles
- **Admin** — Full access to admin panel, user management, property CRUD, analytics
- **User** — Browse properties, book visits, manage profile, save favorites

---

## 📡 API Endpoints

### Auth (`/api/auth`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | Public | Register new user |
| POST | `/login` | Public | Login user |
| GET | `/me` | Private | Get current user |

### Users (`/api/users`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/profile` | Private | Get profile |
| PUT | `/profile` | Private | Update profile |
| PUT | `/password` | Private | Change password |
| DELETE | `/account` | Private | Delete account |

### Properties (`/api/properties`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Public | List all (search, filter, paginate) |
| GET | `/:id` | Public | Get single property |
| POST | `/` | Private | Create property |
| PUT | `/:id` | Private | Update (owner/admin) |
| DELETE | `/:id` | Private | Delete (owner/admin) |

**Query Parameters:** `search`, `type`, `status`, `minPrice`, `maxPrice`, `beds`, `baths`, `featured`, `sort`, `page`, `limit`

### Bookings (`/api/bookings`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Private | List bookings (user=own, admin=all) |
| POST | `/` | Private | Create booking |
| PUT | `/:id` | Private | Update (owner/admin) |
| DELETE | `/:id` | Private | Delete (owner/admin) |

### Favorites (`/api/favorites`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Private | Get favorite properties |
| GET | `/ids` | Private | Get favorite property IDs |
| POST | `/:propertyId` | Private | Toggle favorite |
| DELETE | `/:propertyId` | Private | Remove favorite |

### Reviews (`/api/properties/:propertyId/reviews`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Public | Get reviews for property |
| POST | `/` | Private | Create review |
| PUT | `/:id` | Private | Update review (owner) |
| DELETE | `/:id` | Private | Delete review (owner/admin) |

### Upload (`/api/upload`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | Private | Upload single image |
| POST | `/multiple` | Private | Upload multiple images |

### Admin (`/api/admin`)
| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/analytics` | Admin | Dashboard analytics |
| GET | `/users` | Admin | List all users (search, paginate) |
| GET | `/users/:id` | Admin | Get single user |
| POST | `/users` | Admin | Create user |
| PUT | `/users/:id` | Admin | Update user |
| DELETE | `/users/:id` | Admin | Delete user |
| PUT | `/users/:id/block` | Admin | Toggle block/unblock |
| GET | `/properties` | Admin | List all (including hidden) |
| POST | `/properties` | Admin | Create property |
| PUT | `/properties/:id` | Admin | Update property |
| DELETE | `/properties/:id` | Admin | Delete property |
| PUT | `/properties/:id/toggle` | Admin | Toggle visibility |

---

## 🎨 Features

### Admin Panel
- 📊 Dashboard with analytics (users, properties, bookings, reviews)
- 👥 User management (CRUD, block/unblock, role assignment)
- 🏠 Property management (CRUD, image upload, amenity picker)
- 👁️ Toggle property visibility (active/inactive)
- ⭐ Featured property toggle
- 📄 Pagination across all tables
- 🔍 Search functionality

### User Panel
- 🔐 Registration & Login with form validation
- 🏘️ Browse properties with search, filter, and pagination
- 📋 Property detail pages with image gallery
- 📅 Schedule property visit (booking)
- ❤️ Save/unsave properties (favorites/wishlist)
- 👤 Profile management with password change
- 📊 Personal dashboard with booking history

### UI/UX
- 🌙 Premium dark theme with gold accents
- ✨ Glassmorphism effects and subtle animations
- 📱 Fully responsive design
- 🎯 Lazy-loaded pages for fast initial load
- 🔔 Toast notification system
- ⬆️ Smooth transitions and hover effects

---

## 🚀 Deployment

### Frontend (Vercel)

```bash
cd frontend
npm run build
```

Set environment variable on Vercel:
```
VITE_API_URL=https://your-backend-url.com/api
```

### Backend (Render / Railway)

Set environment variables:
```
PORT=5001
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_production_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-frontend-url.vercel.app
NODE_ENV=production
```

Start command: `npm start`

---

## 📝 License

MIT License — feel free to use for personal or commercial projects.
