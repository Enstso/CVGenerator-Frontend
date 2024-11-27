import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PasswordInput } from "./../authentication/password-input";
import { LoaderCircle } from "lucide-react";
import { postDataV2, urlApi, urls } from "../../lib/utils";

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
      const response = await postDataV2(urlApi + urls.register, {
        username,
        firstname,
        lastname,
        email,
        password,
      });
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className={`space-y-6 ${className}`} {...props}>
      {/* Username */}
      <div>
        <input
          id="username"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Firstname */}
      <div>
        <input
          id="firstname"
          placeholder="Firstname"
          type="text"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Lastname */}
      <div>
        <input
          id="lastname"
          placeholder="Lastname"
          type="text"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Email */}
      <div>
        <input
          id="email"
          placeholder="name@example.com"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          className="w-full p-3 rounded-md border border-gray-300 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Password */}
      <div>
        <PasswordInput
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Confirm Password */}
      <div>
        <PasswordInput
          id="password-confirmation"
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          className="w-full p-3 rounded-md border border-gray-300 text-sm placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full p-3 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 ${
          isLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? (
          <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          "Create Account"
        )}
      </button>
    </form>
  );
}
