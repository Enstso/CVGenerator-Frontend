import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "./../authentication/password-input";
import { LoaderCircle } from 'lucide-react';
import { postDataV2, urls } from "../../lib/utils";
import { AuthContext } from "./auth-context";

export function AuthLoginForm({ className = "", ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    try {
        // Appel API
        const response = await postDataV2(urls.login, { email, password });

        // Vérification du statut de la réponse
        if (!response || response.status !== 200 ) {
            alert("Invalid credentials");
            return;
        }

        AuthContext.login();

        // Navigation vers la page principale
        navigate("/");

    } catch (error) {
        // Gestion des erreurs
        console.error("Login failed:", error);
        alert("An error occurred. Please try again.");
    } finally {
        setIsLoading(false); // Arrêter le spinner de chargement
    }
}

  return (
    <div className={`grid gap-6 ${className}`} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-1">
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
              className="w-full rounded-md border border-gray-300 p-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-1">
            <PasswordInput
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full rounded-md bg-blue-600 px-4 py-2 text-white text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Log in"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
