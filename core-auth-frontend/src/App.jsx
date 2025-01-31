import { useState } from 'react'
import './App.css'
import {Route, BrowserRouter, Routes, Navigate} from "react-router-dom";
import Login from "./pages/auth/Login.jsx";
import Dashboard from "./pages/user/Dashboard.jsx";
import Index from "./pages/user/Index.jsx";
import Show from "./pages/user/Show.jsx";
import Create from "./pages/user/Create.jsx";
import Edit from "./pages/user/Edit.jsx";
import Profile from "./pages/auth/Profile.jsx";
import TokenRefreshModal from "./components/TokenRefreshModal.jsx";
import NotFound from "./pages/NotFound.jsx";

// Function to check if the user is authenticated
const isAuthenticated = () => !!localStorage.getItem("authToken");

// Protected Route: Redirects to login if not authenticated
// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
    return isAuthenticated() ? children : <Navigate to="/" replace />;
};

// Redirect Route: Prevents access to login if already authenticated
// eslint-disable-next-line react/prop-types
const RedirectIfAuthenticated = ({ children }) => {
    return isAuthenticated() ? <Navigate to="/dashboard" replace /> : children;
};

function App() {
      return (
          <BrowserRouter>

              <Routes>
                  {/* Redirect to Dashboard if logged in */}
                  <Route path="/" element={<RedirectIfAuthenticated><Login/></RedirectIfAuthenticated>} />

                  {/* Protected Routes (Require Authentication) */}
                  <Route path="/profile" element={<ProtectedRoute><Profile/></ProtectedRoute>} />

                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
                  <Route path="/users" element={<ProtectedRoute><Index/></ProtectedRoute>} />
                  <Route path="/users/:id" element={<ProtectedRoute><Show/></ProtectedRoute>} />
                  <Route path="/users/create" element={<ProtectedRoute><Create/></ProtectedRoute>} />
                  <Route path="/users/:id/edit" element={<ProtectedRoute><Edit/></ProtectedRoute>} />


                  {/* Not Found */}
                  <Route path="*" element={<NotFound/>} />
              </Routes>
          </BrowserRouter>
      )
}

export default App
