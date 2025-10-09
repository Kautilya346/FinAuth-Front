import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-[#d4d9c8]/80 backdrop-blur-md border-b border-[#2d3e2e]/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <div className="w-8 h-8 bg-[#2d3e2e] rounded-lg flex items-center justify-center mr-2 transition-colors group-hover:bg-[#1a2519]">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
                />
              </svg>
            </div>
            <span className="text-xl font-light text-[#2d3e2e]">SecureGate</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1.5">
            <Link
              to="/"
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                isActive("/")
                  ? "bg-[#2d3e2e] text-[#d4d9c8]"
                  : "text-[#4a5a4a] hover:bg-[#2d3e2e]/5 hover:text-[#2d3e2e]"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </span>
            </Link>
            <Link
              to="/onboarding/phone-verification"
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                isActive("/onboarding/phone-verification") || isActive("/onboarding/kyc-verification")
                  ? "bg-[#2d3e2e] text-[#d4d9c8]"
                  : "text-[#4a5a4a] hover:bg-[#2d3e2e]/5 hover:text-[#2d3e2e]"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Onboarding
              </span>
            </Link>
            <Link
              to="/transactions/new"
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                isActive("/transactions/new")
                  ? "bg-[#2d3e2e] text-[#d4d9c8]"
                  : "text-[#4a5a4a] hover:bg-[#2d3e2e]/5 hover:text-[#2d3e2e]"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 1.343-3 3v5h6v-5c0-1.657-1.343-3-3-3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 11h14M7 21h10a2 2 0 002-2v-1H5v1a2 2 0 002 2z"
                  />
                </svg>
                New Transaction
              </span>
            </Link>
            <Link
              to="/upload-csv"
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                isActive("/upload-csv")
                  ? "bg-[#2d3e2e] text-[#d4d9c8]"
                  : "text-[#4a5a4a] hover:bg-[#2d3e2e]/5 hover:text-[#2d3e2e]"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                Upload CSV
              </span>
            </Link>
            <Link
              to="/fraud-detection"
              className={`px-4 py-1.5 rounded-full text-sm transition-all ${
                isActive("/fraud-detection")
                  ? "bg-[#2d3e2e] text-[#d4d9c8]"
                  : "text-[#4a5a4a] hover:bg-[#2d3e2e]/5 hover:text-[#2d3e2e]"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Fraud Detection
              </span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-[#2d3e2e] hover:bg-[#2d3e2e]/5 transition-colors"
          >
            {mobileMenuOpen ? (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-2xl text-sm transition-all ${
                isActive("/")
                  ? "bg-[#2d3e2e] text-[#d4d9c8] shadow"
                  : "text-[#4a5a4a] hover:bg-[#2d3e2e]/5 hover:text-[#2d3e2e]"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Home
              </span>
            </Link>
            <Link
              to="/onboarding/phone-verification"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-2xl text-sm transition-all ${
                isActive("/onboarding/phone-verification") || isActive("/onboarding/kyc-verification")
                  ? "bg-[#2d3e2e] text-[#d4d9c8] shadow"
                  : "text-[#4a5a4a] hover:bg-[#2d3e2e]/5 hover:text-[#2d3e2e]"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Onboarding
              </span>
            </Link>
            <Link
              to="/transactions/new"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-2xl text-sm transition-all ${
                isActive("/transactions/new")
                  ? "bg-[#2d3e2e] text-[#d4d9c8] shadow"
                  : "text-[#4a5a4a] hover:bg-[#2d3e2e]/5 hover:text-[#2d3e2e]"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg
                  className="W-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 1.343-3 3v5h6v-5c0-1.657-1.343-3-3-3z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 11h14M7 21h10a2 2 0 002-2v-1H5v1a2 2 0 002 2z"
                  />
                </svg>
                New Transaction
              </span>
            </Link>
            <Link
              to="/upload-csv"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-2xl text-sm transition-all ${
                isActive("/upload-csv")
                  ? "bg-[#2d3e2e] text-[#d4d9c8] shadow"
                  : "text-[#4a5a4a] hover:bg-[#2d3e2e]/5 hover:text-[#2d3e2e]"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
                  />
                </svg>
                Upload CSV
              </span>
            </Link>
            <Link
              to="/fraud-detection"
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-4 py-3 rounded-2xl text-sm transition-all ${
                isActive("/fraud-detection")
                  ? "bg-[#2d3e2e] text-[#d4d9c8] shadow"
                  : "text-[#4a5a4a] hover:bg-[#2d3e2e]/5 hover:text-[#2d3e2e]"
              }`}
            >
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
                Fraud Detection
              </span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
