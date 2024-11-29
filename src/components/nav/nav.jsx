import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authentication/auth-context";
import { Menu } from "lucide-react"; // Only import necessary icons
import NavLinks from "./nav-links";

export default function Nav() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext); // Destructure for clarity
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu

  // Function to handle logout with proper error handling
  const handleLogout = () => {
    try {
      console.log("Logging out...");
      logout(); // Use destructured logout method
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      // Optionally add user feedback (e.g., toast notification)
    }
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand/Logo */}
        <div className="text-white text-xl font-semibold">CV Generator</div>

        {/* Navigation Links (Desktop) */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLinks handleLogout={handleLogout} />
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen((prev) => !prev)} // Simplify state toggle
            className="text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="bg-gray-800 p-4 space-y-4 md:hidden">
          <NavLinks onClick={() => setMenuOpen(false)} handleLogout={handleLogout} />
        </div>
      )}
    </nav>
  );
}
