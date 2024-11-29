import React, { useEffect, useState,useContext } from "react";
import { getData, putData, deleteData, urls, urlApi } from "../../lib/utils";
import { PasswordInput } from "../authentication/password-input";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../authentication/auth-context";

export default function ProfileForm() {
  const [userInfo, setUserInfo] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await getData(urlApi + urls.user);
        setUserInfo((prev) => ({
          ...prev,
          ...response,
          oldPassword: "", // Clear sensitive fields
          password: "",
          confirmPassword: "",
        }));
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch user data.");
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Password validation
    if (userInfo.password) {
      if (!userInfo.oldPassword) {
        setError("Old password is required to change your password.");
        return;
      }
      if (userInfo.password !== userInfo.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    try {
      // Prepare data for submission
      const dataToUpdate = { ...userInfo };
      if (!dataToUpdate.password) {
        delete dataToUpdate.password;
        delete dataToUpdate.oldPassword;
        delete dataToUpdate.confirmPassword;
      }
      await putData(urlApi + urls.user, dataToUpdate);
      navigate("/");
    } catch (err) {
      setError("Failed to update profile.");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );
    if (confirmDelete) {
      try {
        await deleteData(urlApi + urls.user);
        authContext.logout();
        navigate("/");
      } catch (err) {
        setError("Failed to delete account.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800">
        Edit Profile
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="username"
            className="block text-lg font-medium text-gray-700"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="firstname"
            className="block text-lg font-medium text-gray-700"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={userInfo.firstname}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="lastname"
            className="block text-lg font-medium text-gray-700"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={userInfo.lastname}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={userInfo.email}
            onChange={handleChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="oldPassword"
            className="block text-lg font-medium text-gray-700"
          >
            Old Password
          </label>
          <PasswordInput
            id="oldPassword"
            name="oldPassword"
            value={userInfo.oldPassword}
            onChange={handleChange}
            placeholder="Enter your old password"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-lg font-medium text-gray-700"
          >
            New Password
          </label>
          <PasswordInput
            id="password"
            name="password"
            value={userInfo.password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-lg font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <PasswordInput
            id="confirmPassword"
            name="confirmPassword"
            value={userInfo.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your new password"
            className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-300"
          >
            Update Profile
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-md shadow-md hover:bg-red-700 focus:ring focus:ring-red-300"
          >
            Delete Account
          </button>
        </div>
      </form>
    </div>
  );
}
