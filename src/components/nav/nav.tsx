import React,{useContext} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../authentication/auth-context";
export default function Nav() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const handleLogout = () => {
    try {
      // Log out logic: e.g., remove token, clear user data
      console.log("Logging out...");
      authContext.logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Navigation Links */}
        <div className="space-x-6">
          <Link
            to="/cvs"
            className="text-white hover:text-blue-400 transition-colors"
          >
            CVs
          </Link>
          <Link
            to="/me"
            className="text-white hover:text-blue-400 transition-colors"
          >
            Me
          </Link>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="text-white hover:text-red-400 transition-colors"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
