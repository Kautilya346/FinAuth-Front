# FinAuth - Quick Reference Guide

## 🚀 Application is Running!

Your React application with routing is now live at:

- **URL**: http://localhost:5174/
- **Status**: ✅ All routes configured and working

## 📍 Available Routes

### 1. Home Page - `/`

- Landing page with feature highlights
- Call-to-action buttons for Login and Register
- Displays app features in a card layout

### 2. Login Page - `/login`

- Email and password input
- Connects to: `POST ${VITE_API_URL}/login`
- Sends JSON: `{ email, password }`

### 3. Register Page - `/register`

- Complete onboarding form with:
  - Name, Phone (with country code), KYC ID, Account Number
  - Email, Password, Date of Birth
  - ID Proof file upload (converts to Base64)
- Connects to: `POST ${VITE_API_URL}/register`

## 🎯 Key Features Implemented

### ✅ Routing System

- React Router v6 with BrowserRouter
- Declarative route definitions
- Clean URL structure (no hash routing)

### ✅ Navigation

- Sticky navbar component
- Active route highlighting
- Responsive design

### ✅ Form Components

- Input validation
- Loading states
- Error handling
- File upload with Base64 encoding

### ✅ Architecture

- Pages folder for route components
- Components folder for reusable UI
- Proper separation of concerns
- Environment-based configuration

## 🔧 Configuration

### Backend Connection

```env
VITE_API_URL=http://localhost:4000
```

Update this in `.env` file to point to your backend server.

### CORS Requirements

Your backend needs to allow requests from:

```
http://localhost:5174
```

Example Express.js configuration:

```javascript
app.use(
  cors({
    origin: "http://localhost:5174",
    credentials: true,
  })
);
```

## 📊 API Payload Examples

### Registration Request

```json
{
  "name": "John Doe",
  "countryCode": "+91",
  "phone": "9876543210",
  "kycId": "ABCDE1234F",
  "accountNumber": "123456789012",
  "email": "john@example.com",
  "password": "securepass123",
  "dob": "1990-01-01",
  "idProof": {
    "name": "passport.jpg",
    "type": "image/jpeg",
    "data": "data:image/jpeg;base64,/9j/4AAQ..."
  }
}
```

### Login Request

```json
{
  "email": "john@example.com",
  "password": "securepass123"
}
```

## 🎨 UI/UX Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Tailwind CSS**: Utility-first styling
- **Smooth Transitions**: Button hovers, loading states
- **Form Validation**: Client-side validation with HTML5
- **User Feedback**: Alerts for success/error states

## 📁 File Structure Overview

```
FinAuth-Front/
├── src/
│   ├── components/
│   │   ├── Login.jsx                    # Login form component
│   │   ├── Navbar.jsx                   # Navigation bar
│   │   └── OnboardingRegistration.jsx   # Registration form
│   ├── pages/
│   │   ├── HomePage.jsx                 # Landing page
│   │   ├── LoginPage.jsx                # Login route page
│   │   └── RegisterPage.jsx             # Register route page
│   ├── App.jsx                          # Router setup
│   ├── main.jsx                         # Entry point
│   └── index.css                        # Global styles
├── .env                                 # Environment config
├── package.json                         # Dependencies
└── vite.config.js                       # Vite configuration
```

## 🔄 Common Tasks

### Adding a New Route

1. Create page in `src/pages/NewPage.jsx`
2. Import in `App.jsx`
3. Add to Routes: `<Route path="/new" element={<NewPage />} />`
4. Add link in Navbar if needed

### Updating API Endpoint

1. Edit `.env` file: `VITE_API_URL=http://new-url`
2. Restart dev server: `Ctrl+C` then `npm run dev`

### Customizing Styles

- Edit Tailwind classes directly in components
- Global styles in `src/index.css`
- Tailwind config in `tailwind.config.js` (if needed)

## 🐛 Troubleshooting

### Problem: White screen or errors

- Check browser console (F12)
- Verify all imports are correct
- Ensure dev server is running

### Problem: API calls failing

- Check `.env` has correct `VITE_API_URL`
- Verify backend is running
- Check browser Network tab for CORS errors
- Ensure backend CORS is configured

### Problem: Routes not working after build

- Configure hosting for SPA routing
- Add redirect rules (e.g., Netlify `_redirects` or Vercel config)

## 🚀 Next Steps

1. **Test the application**:

   - Visit http://localhost:5174/
   - Try navigating between routes
   - Test the login form
   - Test the registration form (with file upload)

2. **Connect your backend**:

   - Ensure backend is running on configured port
   - Test API endpoints with form submissions
   - Verify responses are handled correctly

3. **Customize**:
   - Update branding/colors
   - Add more form validation
   - Implement token storage
   - Add protected routes
   - Create user dashboard

## 📚 Additional Resources

- [React Router Docs](https://reactrouter.com/)
- [Vite Guide](https://vitejs.dev/guide/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

**Current Status**: ✅ Application fully functional with routing
**Running On**: http://localhost:5174/
**Last Updated**: Ready for development and testing
