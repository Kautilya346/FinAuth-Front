import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PhoneVerificationPage() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!phoneNumber.trim()) {
      setError("Phone number is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/onboarding/start-verification`;
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber: phoneNumber.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.verified === true) {
        // Success - redirect to KYC verification page
        navigate("/onboarding/kyc-verification", { 
          state: { phoneNumber: phoneNumber.trim() } 
        });
      } else {
        // Verification failed
        setError(data.message || "Phone number verification failed. Please try again.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error during phone verification:", err);
      setError("An error occurred during verification. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-3 bg-[#d4d9c8] overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-[#2d3e2e] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-[#2d3e2e] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#2d3e2e]/10 p-6 md:p-8 animate-slide-in-up">
          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-[#2d3e2e] rounded-xl mb-3">
              <svg
                className="w-6 h-6 text-[#d4d9c8]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-[#2d3e2e] mb-1">
              Phone Verification
            </h2>
            <p className="text-[#4a5a4a] text-sm">
              Enter your phone number to start the onboarding process
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 rounded-lg text-sm border bg-red-50 text-red-700 border-red-200">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone Number Input */}
            <div>
              <label className="block text-sm font-medium text-[#2d3e2e] mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 text-[#4a5a4a]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e] focus:border-transparent transition-all duration-200"
                  placeholder="+1234567890"
                />
              </div>
              <p className="text-xs text-[#4a5a4a] mt-2">
                Include country code (e.g., +1 for US, +91 for India)
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-lg font-semibold text-[#d4d9c8] shadow-md transition-all duration-200 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#2d3e2e] hover:bg-[#1a2519] transform hover:scale-[1.02] active:scale-[0.98]"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Verifying...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Verify Phone Number
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
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              )}
            </button>
          </form>

          {/* Help text */}
          <p className="mt-6 text-center text-[#4a5a4a] text-xs">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
