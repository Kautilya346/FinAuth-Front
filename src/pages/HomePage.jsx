import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative flex items-center justify-center min-h-screen px-3 py-14">
        <div className="max-w-6xl mx-auto text-center">
          {/* Hero section */}
          <div className="mb-14 space-y-7">
            <div className="inline-block">
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 backdrop-blur-sm">
                <span className="w-2 h-2 bg-indigo-400 rounded-full mr-2 animate-pulse"></span>
                Secure Financial Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 leading-tight tracking-tight">
              Welcome to
              <br />
              <span className="text-white drop-shadow-[0_0_30px_rgba(168,85,247,0.5)]">
                FinAuth
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              Next-generation financial authentication and onboarding platform
              with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 font-semibold">
                bank-grade security
              </span>
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center mb-16">
            <Link
              to="/login"
              className="group relative px-7 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-xl shadow-indigo-500/40 hover:shadow-indigo-500/60 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Sign In
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>

            <Link
              to="/register"
              className="group relative px-7 py-3.5 bg-white/10 backdrop-blur-md text-white font-semibold rounded-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 shadow-xl"
            >
              <span className="flex items-center justify-center gap-2">
                Create Account
                <svg
                  className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </span>
            </Link>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left max-w-5xl mx-auto">
            <div className="group relative bg-white/5 backdrop-blur-lg p-7 rounded-2xl border border-white/10 hover:border-indigo-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-5 shadow-md shadow-indigo-500/40 group-hover:shadow-indigo-500/60 transition-shadow">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-indigo-300 transition-colors">
                  Bank-Grade Security
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Enterprise-level encryption and multi-factor authentication to
                  protect your financial data
                </p>
              </div>
            </div>

            <div className="group relative bg-white/5 backdrop-blur-lg p-7 rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-5 shadow-md shadow-purple-500/40 group-hover:shadow-purple-500/60 transition-shadow">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-purple-300 transition-colors">
                  Lightning Fast
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Instant verification and real-time processing for seamless
                  onboarding experience
                </p>
              </div>
            </div>

            <div className="group relative bg-white/5 backdrop-blur-lg p-7 rounded-2xl border border-white/10 hover:border-pink-500/50 transition-all duration-300 hover:transform hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mb-5 shadow-md shadow-pink-500/40 group-hover:shadow-pink-500/60 transition-shadow">
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-white mb-2.5 group-hover:text-pink-300 transition-colors">
                  Global Reach
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Support for 50+ countries with multi-currency transactions and
                  local compliance
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
