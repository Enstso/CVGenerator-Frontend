import { AuthRegisterForm } from "../../components/authentication/auth-register-form";
import { Link } from "react-router-dom";

export default function Register() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Main container */}
        <div className="w-full max-w-md space-y-8 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
          {/* Login link */}
          <div className="flex justify-center">
            <Link
              to="/login"
              className="text-sm text-blue-600 hover:underline"
            >
              Already have an account? Login
            </Link>
          </div>

          {/* Form Section */}
          <div className="mt-8 space-y-6">
            {/* Form Title */}
            <h2 className="text-3xl font-semibold text-center text-gray-800">
              Create an Account
            </h2>
            <p className="mt-2 text-sm text-center text-gray-500">
              Enter your details to create your account
            </p>

            {/* Register form */}
            <AuthRegisterForm />

            {/* Terms and Privacy */}
            <p className="mt-4 text-center text-sm text-gray-500">
              By clicking "Create Account", you agree to our{" "}
              <Link
                to="#"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                to="#"
                className="text-blue-600 hover:text-blue-500 font-medium"
              >
                Privacy Policy
              </Link>.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
