import React, { useState, useEffect } from "react";
import Loader from "./Component/Loadingpage/Loeder";
import HeroSection from "./Component/Herrosection/Herrosection";
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import "./App.css";
import Shop from "./Component/Shop/Shop";
import Authenth from "./Component/Autothentification/Authenth";
import Contactus from "./Component/ContactUs/Contactus";
import Fournisseur from './Component/Dashbord/Fournissuer';
import Vendeur from './Component/Dashbord/Vendeur';
import Adminepaenl from './Component/Dashbord/Dashbordadmin'
import ResetPassworde from './Component/Autothentification/ResetPassword'
import ResetPasswordForm from './Component/Autothentification/ResetPasswordForm'
import About from "./Component/ContactUs/About";
import NotFoundpage from "./Component/404/NotFound";
import  Detailsproduit from "./Component/Shop/Details";

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Hide the loader after 5 seconds
    }, 5000);
  }, []);

  return (
    <BrowserRouter>
      {loading ? (
        <div className="app">
          <Loader />
        </div>
      ) : (
        <Routes>
          {/* Show HeroSection as the default route */}
          <Route path="/" element={<HeroSection />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/About" element={<About />} />
          <Route path="/enregister" element={<Authenth />} />
          <Route path="/login" element={<Authenth />} />
          <Route path="/ResetPassworde" element={<ResetPassworde />} />
          <Route path="/reset-password" element={<ResetPasswordForm />} />
          <Route path="/Detail-product/:id" element={<Detailsproduit/>} />
          <Route path="/contact" element={<Contactus />} />
          
          {/* Routes protégées */}
          <Route path="/Dashbordadmin" element={
            <ProtectedRoute allowedRoles={['administrateur']}>
              <Adminepaenl />
            </ProtectedRoute>
          } />
          <Route path="/Fournisseur" element={
            <ProtectedRoute allowedRoles={['fournisseur']}>
              <Fournisseur />
            </ProtectedRoute>
          } />
          <Route path="/Vendeur" element={
            <ProtectedRoute allowedRoles={['vendeur']}>
              <Vendeur />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFoundpage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;

function ProtectedRoute({ allowedRoles, children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Vérifier si un token existe
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login'); // Rediriger vers la page de connexion si pas de token
          return;
        }

        const response = await fetch('http://localhost:8000/api/getuser', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          if (allowedRoles.includes(userData.role)) {
            setUser(userData);
          } else {
            // L'utilisateur n'a pas le rôle requis
            navigate('/login');
          }
        } else {
          // Token invalide ou expiré
          localStorage.removeItem('token'); // Supprimer le token invalide
          navigate('/login');
        }
      } catch (error) {
        console.error("Erreur d'authentification:", error);
        navigate('/login');
      }
    };
    
    checkAuth();
  }, [navigate, allowedRoles]);

  return user ? children : null;
}

// Supprimer les routes dupliquées à la fin du fichier
<Routes>
  {/* Routes publiques */}
  <Route path="/" element={<HeroSection />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="/About" element={<About />} />
  <Route path="/enregister" element={<Authenth />} />
  <Route path="/ResetPassworde" element={<ResetPassworde />} />
  <Route path="/contact" element={<Contactus />} />
  
  {/* Routes protégées */}
  <Route path="/Dashbordadmin" element={
    <ProtectedRoute allowedRoles={['admin']}>
      <Adminepaenl />
    </ProtectedRoute>
  } />
  <Route path="/Fournisseur" element={
    <ProtectedRoute allowedRoles={['fournisseur']}>
      <Fournisseur />
    </ProtectedRoute>
  } />
  <Route path="/Vendeur" element={
    <ProtectedRoute allowedRoles={['vendeur']}>
      <Vendeur />
    </ProtectedRoute>
  } />
  <Route path="*" element={<NotFoundpage />} />
</Routes>
