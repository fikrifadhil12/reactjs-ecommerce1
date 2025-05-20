import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard";
import CheckoutPage from "./CheckoutPage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  
  // Pastikan nama environment variable ini sesuai dengan .env Anda
  const API_URL = process.env.REACT_APP_API_URL || "https://private-extreme-town.glitch.me";

  // Debug: Cetak API_URL untuk memastikan nilainya benar
  console.log("API_URL:", API_URL);

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      console.log("Token dari localStorage:", token);

      if (!token) {
        console.log("Token tidak ditemukan, logout pengguna.");
        setIsAuthenticated(false);
        localStorage.removeItem("isAuthenticated");
        setLoading(false);
        return;
      }

      try {
        // Tambahkan error handling untuk URL yang tidak valid
        if (!API_URL) {
          throw new Error("REACT_APP_API_URL tidak terdefinisi");
        }

        const response = await fetch(`${API_URL}/verify-token`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Tambahkan pengecekan response network error
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response dari backend:", data);

        if (data.valid) {
          console.log("Token valid, user terautentikasi.");
          setIsAuthenticated(true);
          localStorage.setItem("isAuthenticated", "true");
        } else {
          console.log("Token tidak valid, menghapus token.");
          localStorage.removeItem("token");
          localStorage.removeItem("isAuthenticated");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error verifying token:", error.message);
        localStorage.removeItem("token");
        localStorage.removeItem("isAuthenticated");
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, [API_URL]); // Tambahkan API_URL sebagai dependency

  if (loading) {
    return <div className="text-center mt-10">Checking authentication...</div>;
  }

  return (
    <Router>
      <div className="container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} API_URL={API_URL} />}
          />
          <Route 
            path="/register" 
            element={<Register API_URL={API_URL} />} 
          />

          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboard 
                  cartItems={cartItems} 
                  setCartItems={setCartItems} 
                  API_URL={API_URL}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/checkout"
            element={
              isAuthenticated ? (
                <CheckoutPage 
                  cartItems={cartItems} 
                  API_URL={API_URL} 
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
