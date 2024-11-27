import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "./../authentication/password-input";
import { LoaderCircle } from 'lucide-react';
import { postDataV2, urlApi, urls } from "../../lib/utils";
import { AuthContext } from "./auth-context";

export function AuthLoginForm({ className = "", ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
        const response = await postDataV2(urlApi + urls.login, { email, password });
        console.log(response);
        // Vérification du statut de la réponse
        if (!response || response.status !== 200 ) {
            alert("Invalid credentials");
            return;
        }
        authContext.login();
        // Navigation vers la page principale
        navigate("/cvs");

    } catch (error) {
        // Gestion des erreurs
        console.error("Login failed:", error);
        alert("An error occurred. Please try again.");
    } finally {
        setIsLoading(false); // Arrêter le spinner de chargement
    }
}

  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`} {...props}>
      <div className="space-y-4">
        <input
          id="email"
          placeholder="Email"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
        
        <PasswordInput
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full p-3 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isLoading ? (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Log in"
        )}
      </button>
    </form>
  );
}
