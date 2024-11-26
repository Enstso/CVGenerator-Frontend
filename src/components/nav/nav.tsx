import React from "react";
import { Link } from "react-router-dom";

export default function Nav() {
  const handleLogout = () => {
    // Logique de déconnexion, par exemple supprimer un token ou rediriger
    console.log("Logging out...");
    
};

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo ou nom de l'application */}
        <div className="text-white text-2xl font-semibold">
          <Link to="/">MyApp</Link>
        </div>

        {/* Liens de navigation */}
        <div className="space-x-6">
          {/* Lien vers la page des CVs */}
          <Link
            to="/cvs"
            className="text-white hover:text-blue-400 transition-colors"
          >
            CVs
          </Link>

          {/* Bouton de déconnexion */}
          <button
            onClick={handleLogout}
            className="text-white hover:text-red-400 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
