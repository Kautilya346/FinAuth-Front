# SecureGate Frontend

A modern, secure React application for financial authentication and user onboarding, built with Vite, React Router, and Tailwind CSS.

## 🚀 Quick Start

```bash
npm install
npm run dev
```

Visit: http://localhost:5173

## 🌐 Routes

- `/` - Home page with feature highlights
- `/login` - User login form
- `/register` - User registration/onboarding form

## ⚙️ Environment Setup

Create `.env` file:
```env
VITE_API_URL=http://localhost:4000
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Login.jsx       # Login form
│   ├── Navbar.jsx      # Navigation bar
│   └── OnboardingRegistration.jsx  # Registration form
├── pages/              # Route pages
│   ├── HomePage.jsx
│   ├── LoginPage.jsx
│   └── RegisterPage.jsx
└── App.jsx             # Router configuration
```

## 🔌 API Endpoints

### Registration
- **POST** `${VITE_API_URL}/register`
- Sends JSON with Base64-encoded ID proof file

### Login
- **POST** `${VITE_API_URL}/login`
- Sends email and password

## 🛠️ Tech Stack

- React 19 + Vite 7
- React Router 6
- Tailwind CSS 4
- Fetch API

## 📝 Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run linter
```

**Note**: Backend API required. Ensure CORS is configured properly.
