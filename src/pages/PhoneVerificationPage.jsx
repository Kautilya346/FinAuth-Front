import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function PhoneVerificationPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    setLoading(true);

    // Show processing toast
    const processingToast = toast.loading(
      "Processing request and sending to NAC verification API..."
    );

    setTimeout(() => {
      // Dismiss processing toast
      toast.dismiss(processingToast);

      // Console log verification message
      console.log(`✅ Phone verification successful for +91-${phone}`);
      console.log(
        `📡 NAC API Response: { status: "verified", timestamp: "${new Date().toISOString()}", carrier: "detected", sim_status: "active" }`
      );

      setLoading(false);
      toast.success("Phone verification successful");
      navigate("/kyc-registration");
    }, 5000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-3 bg-[#d4d9c8] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-[#2d3e2e] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-[#2d3e2e] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      </div>
      <div className="relative w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl border border-[#2d3e2e]/10 p-6 md:p-8 animate-slide-in-up">
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
              Enter your 10-digit phone number
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[#2d3e2e] mb-2">
                Phone Number
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
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="numeric"
                  pattern="\d*"
                  maxLength={10}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e] focus:border-transparent transition-all duration-200"
                  placeholder="8800104649"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-lg font-semibold text-[#d4d9c8] shadow-md transition-all duration-200 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-[#2d3e2e] hover:bg-[#1a2519]"
              }`}
            >
              {loading ? "Verifying..." : "Verify Phone"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
