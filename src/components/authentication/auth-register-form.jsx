import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "./../authentication/password-input";
import { LoaderCircle } from "lucide-react";
import { postDataV2, postData, urls } from "../../lib/utils";

export function AuthRegisterForm({ className = "", ...props }) {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");

  const navigate = useNavigate();

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    if (password !== passwordConfirmation) {
      alert("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const urlApi = import.meta.env.VITE_API_URL;
      const response = await postDataV2(urlApi + urls.register, {
        username,
        firstname,
        lastname,
        email,
        password,
      });
      if (response.status == 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={`grid gap-6 ${className}`} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <input
              id="username"
              placeholder="Username"
              type="text"
              autoCapitalize="none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-1">
            <input
              id="firstname"
              placeholder="Firstname"
              type="text"
              autoCapitalize="none"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-1">
            <input
              id="lastname"
              placeholder="Lastname"
              type="text"
              autoCapitalize="none"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 text-sm placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="grid gap-1">
            <input
              id="email"
              placeholder="name@example.com"
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
          <div className="grid gap-1">
            <PasswordInput
              id="password-confirmation"
              placeholder="Confirm Password"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
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
              "Create with Email"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
