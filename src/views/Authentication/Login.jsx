import { AuthLoginForm } from "../../components/authentication/auth-login-form";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Main container */}
        <div className="w-full max-w-md space-y-8 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
          {/* Login Form Title */}
          <div className="text-center">
            <h2 className="text-3xl font-semibold text-gray-800">
              Login to your account
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Enter your email and password to login to your account
            </p>
          </div>

          {/* Login Form */}
          <AuthLoginForm />

          {/* Register link */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-blue-600 hover:text-blue-700"
              >
                Register here
              </Link>
            </p>
          </div>

          {/* Terms and Privacy */}
          <p className="mt-4 text-center text-sm text-gray-500">
            By clicking "Login", you agree to our{" "}
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
    </>
  );
}
