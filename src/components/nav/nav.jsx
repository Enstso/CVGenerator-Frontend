import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authentication/auth-context";
import { LogOut, User, FileText, Menu } from "lucide-react"; // Import des icônes
import NavLinks from "./nav-links";

export default function Nav() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false); // État pour le menu mobile

  const handleLogout = () => {
    try {
      console.log("Déconnexion en cours...");
      authContext.logout();
      navigate("/login");
    } catch (error) {
      console.error("La déconnexion a échoué :", error);
      // Afficher un message d'erreur utilisateur ici (par exemple, un toast)
    }
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand/Logo */}
        <div className="text-white text-xl font-semibold">CV Generator</div>

        {/* Liens de navigation (Desktop) */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLinks handleLogout={handleLogout} /> {/* Passage de handleLogout ici */}
        </div>

        {/* Bouton de menu mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Ouvrir le menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {menuOpen && (
        <div className="bg-gray-800 p-4 space-y-4 md:hidden">
          <NavLinks onClick={() => setMenuOpen(false)} handleLogout={handleLogout} />
        </div>
      )}
    </nav>
  );
}
