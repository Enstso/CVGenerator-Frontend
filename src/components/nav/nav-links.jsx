import { LogOut, User, FileText } from "lucide-react"; // Import des icônes 
import { Link } from "react-router-dom";

export default function NavLinks({ onClick, handleLogout }) {
    return (
        <>
            <Link
                to="/profile"
                className="flex items-center text-white hover:text-blue-400 transition-colors"
                onClick={onClick}
                aria-label="Accéder à mon profil"
            >
                <User className="mr-2 w-5 h-5" /> Me
            </Link>
            <Link
                to="/Mycvs"
                className="flex items-center text-white hover:text-blue-400 transition-colors"
                onClick={onClick}
                aria-label="Mes Cvs"
            >
                <FileText className="mr-2 w-5 h-5" /> MyCVs
            </Link>
            <Link
                to="/cvs"
                className="flex items-center text-white hover:text-blue-400 transition-colors"
                onClick={onClick}
                aria-label="Voir les CVs"
            >
                <FileText className="mr-2 w-5 h-5" /> CVs
            </Link>
            <Link
                to="/myRecommendations"
                className="flex items-center text-white hover:text-blue-400 transition-colors"
                onClick={onClick}
                aria-label="Mes recommandations"
            >
                <FileText className="mr-2 w-5 h-5" /> My Recommendations
            </Link>
            <button
                onClick={() => {
                    if (onClick) onClick(); // Ferme le menu mobile si ouvert
                    handleLogout(); // Appelle la fonction handleLogout passée en props
                }}
                className="flex items-center text-white hover:text-red-400 transition-colors"
                aria-label="Se déconnecter"
            >
                <LogOut className="mr-2 w-5 h-5" /> Logout
            </button>
        </>
    );
}
