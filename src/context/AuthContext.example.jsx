// Example: Future authentication context setup
// This file shows how to add authentication state management
// Save this pattern for when you need to implement protected routes

import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in (e.g., from localStorage)
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("userData");

    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      // Assuming backend returns { token, user }
      localStorage.setItem("authToken", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));
      setUser(data.user);
      navigate("/dashboard"); // Redirect after login
      return { success: true };
    } else {
      return { success: false, error: "Invalid credentials" };
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
    navigate("/login");
  };

  const register = async (formData) => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      // Auto-login after registration
      if (data.token) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("userData", JSON.stringify(data.user));
        setUser(data.user);
        navigate("/dashboard");
      }
      return { success: true };
    } else {
      const error = await response.text();
      return { success: false, error };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

// Protected Route Component
export function ProtectedRoute({ children }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);

  return user ? children : null;
}

/* 
USAGE EXAMPLE:

1. Wrap App with AuthProvider in main.jsx:
   
   import { BrowserRouter } from 'react-router-dom';
   import { AuthProvider } from './context/AuthContext';
   
   <BrowserRouter>
     <AuthProvider>
       <App />
     </AuthProvider>
   </BrowserRouter>

2. Use in Login component:
   
   import { useAuth } from '../context/AuthContext';
   
   function Login() {
     const { login } = useAuth();
     
     const handleSubmit = async (e) => {
       e.preventDefault();
       const result = await login(email, password);
       if (!result.success) {
         alert(result.error);
       }
     };
   }

3. Add protected routes in App.jsx:
   
   import { ProtectedRoute } from './context/AuthContext';
   
   <Route 
     path="/dashboard" 
     element={
       <ProtectedRoute>
         <DashboardPage />
       </ProtectedRoute>
     } 
   />

4. Use logout:
   
   const { logout, user } = useAuth();
   
   <button onClick={logout}>Logout</button>
   <p>Welcome, {user?.name}</p>
*/
