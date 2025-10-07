import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <div className="max-w-3xl mx-auto text-center p-8">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to FinAuth
        </h1>
        <p className="text-xl text-gray-700 mb-12">
          Secure financial authentication and onboarding platform
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/login"
            className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-colors duration-300"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-8 py-4 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg border-2 border-indigo-600 hover:bg-indigo-50 transition-colors duration-300"
          >
            Create Account
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-lg mb-2">Secure</h3>
            <p className="text-gray-600 text-sm">
              Bank-grade security with encrypted data transmission
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 text-3xl mb-3">⚡</div>
            <h3 className="font-semibold text-lg mb-2">Fast</h3>
            <p className="text-gray-600 text-sm">
              Quick onboarding process with instant verification
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="text-indigo-600 text-3xl mb-3">🌍</div>
            <h3 className="font-semibold text-lg mb-2">Global</h3>
            <p className="text-gray-600 text-sm">
              Support for multiple countries and currencies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
