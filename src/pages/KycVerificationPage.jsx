import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function KycVerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const initialPhoneNumber = location.state?.phoneNumber || "";

  const [formData, setFormData] = useState({
    phoneNumber: initialPhoneNumber,
    idDocument: "",
    name: "",
    address: "",
    birthdate: "",
  });
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogType, setDialogType] = useState(""); // "success" or "failed"

  // Redirect to phone verification if no phone number
  useState(() => {
    if (!initialPhoneNumber) {
      navigate("/onboarding/phone-verification");
    }
  }, [initialPhoneNumber, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const apiUrl = `${import.meta.env.VITE_API_URL}/onboarding/verify-kyc`;
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phoneNumber: formData.phoneNumber.trim(),
          idDocument: formData.idDocument.trim(),
          name: formData.name.trim(),
          address: formData.address.trim(),
          birthdate: formData.birthdate,
        }),
      });

      const data = await res.json();
      console.log(data)

      if (res.ok && data.success === true) {
        // KYC verification successful
        setDialogType("success");
        setShowDialog(true);
      } else {
        // KYC verification failed
        setDialogType("failed");
        setShowDialog(true);
      }
    } catch (err) {
      console.error("Error during KYC verification:", err);
      setDialogType("failed");
      setShowDialog(true);
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = () => {
    setShowDialog(false);
    if (dialogType === "success") {
      // Redirect to home or dashboard after successful verification
      navigate("/");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-3 py-10 bg-[#d4d9c8] overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#2d3e2e] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-[#2d3e2e] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-[#2d3e2e]/10 p-6 md:p-8">
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
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#2d3e2e] mb-2">
              KYC Verification
            </h2>
            <p className="text-[#4a5a4a] text-sm">
              Complete your identity verification to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone Number */}
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
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e] focus:border-transparent transition-all duration-200"
                  placeholder="+1234567890"
                />
              </div>
            </div>

            {/* KYC ID */}
            <div>
              <label className="block text-sm font-medium text-[#2d3e2e] mb-2">
                KYC ID <span className="text-red-500">*</span>
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
                      d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="idDocument"
                  value={formData.idDocument}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e] focus:border-transparent transition-all duration-200"
                  placeholder="PAN, Aadhaar, Passport, or SSN"
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-[#2d3e2e] mb-2">
                Full Name <span className="text-red-500">*</span>
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e] focus:border-transparent transition-all duration-200"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-[#2d3e2e] mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-0 pl-3.5 pointer-events-none">
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e] focus:border-transparent transition-all duration-200"
                  placeholder="123 Main St, City, State, ZIP"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-[#2d3e2e] mb-2">
                Date of Birth <span className="text-red-500">*</span>
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
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e] focus:border-transparent transition-all duration-200"
                />
              </div>
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
                  Verifying KYC...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Submit for Verification
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Verification Dialog */}
      {showDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl border border-[#2d3e2e]/10 p-6 md:p-8 max-w-md w-full animate-slide-in-up">
            <div className="text-center">
              {dialogType === "success" ? (
                <>
                  {/* Success Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#2d3e2e] mb-2">
                    Verification Successful!
                  </h3>
                  <p className="text-[#4a5a4a] mb-6">
                    Your KYC verification has been completed successfully. You can now access all features.
                  </p>
                </>
              ) : (
                <>
                  {/* Failed Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <svg
                      className="w-8 h-8 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-[#2d3e2e] mb-2">
                    Verification Failed
                  </h3>
                  <p className="text-[#4a5a4a] mb-6">
                    We couldn't verify your KYC information. Please check your details and try again.
                  </p>
                </>
              )}

              <button
                onClick={handleDialogClose}
                className="w-full py-3 rounded-lg font-semibold text-[#d4d9c8] bg-[#2d3e2e] hover:bg-[#1a2519] transition-all duration-200"
              >
                {dialogType === "success" ? "Continue" : "Try Again"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
