// src/components/OnboardingRegistration.jsx

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function OnboardingRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+91",
    phone: "",
    kycId: "",
    accountNumber: "",
    email: "",
    password: "",
    dob: "",
  });
  const [idFile, setIdFile] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    setIdFile(e.target.files[0] ?? null);
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!idFile) {
      alert("Please upload ID proof.");
      return;
    }

    setSubmitting(true);
    try {
      const idBase64 = await fileToBase64(idFile);

      const payload = {
        name: formData.name,
        countryCode: formData.countryCode,
        phone: formData.phone,
        kycId: formData.kycId,
        accountNumber: formData.accountNumber,
        email: formData.email,
        password: formData.password,
        dob: formData.dob,
        idProof: {
          name: idFile.name,
          type: idFile.type,
          data: idBase64,
        },
      };

      const apiUrl = `${import.meta.env.VITE_API_URL}/api/auth/register`;

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json();
        console.log("Registration success:", json);
        alert("Registration successful! Please login to continue.");
        setFormData({
          name: "",
          countryCode: "+91",
          phone: "",
          kycId: "",
          accountNumber: "",
          email: "",
          password: "",
          dob: "",
        });
        setIdFile(null);
        navigate("/login");
      } else {
        const text = await res.text();
        console.error("Registration failed:", res.status, text);
        alert("Registration failed: " + (text || res.status));
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during registration.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-3 py-10 bg-[#d4d9c8] overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-80 h-80 bg-[#2d3e2e] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-[#2d3e2e] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative w-full max-w-4xl px-6 md:px-8">
        {/* Content */}
        {/* Header */}
        <div className="text-center mb-8">
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#2d3e2e] mb-2">
            Create Your Account
          </h1>
          <p className="text-[#4a5a4a] max-w-2xl mx-auto text-sm">
            Join FinAuth today. Fill in your details to get started with secure
            financial authentication.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-[#2d3e2e] mb-2"
            >
              Full Name <span className="text-red-400">*</span>
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
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e] focus:border-transparent transition-all duration-200"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-[#2d3e2e] mb-2"
            >
              Phone Number <span className="text-red-400">*</span>
            </label>
            <div className="flex gap-2">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="px-3.5 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e] transition-all duration-200"
              >
                <option value="+91" className="bg-white">
                  IN (+91)
                </option>
                <option value="+1" className="bg-white">
                  US (+1)
                </option>
                <option value="+44" className="bg-white">
                  UK (+44)
                </option>
              </select>
              <div className="relative flex-1">
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
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e] transition-all duration-200"
                  placeholder="9876543210"
                />
              </div>
            </div>
          </div>

          {/* KYC ID & Account Number - Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="kycId"
                className="block text-sm font-medium text-[#2d3e2e] mb-2"
              >
                KYC ID <span className="text-red-400">*</span>
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
                  id="kycId"
                  name="kycId"
                  value={formData.kycId}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e] transition-all duration-200"
                  placeholder="PAN or Aadhaar"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-[#2d3e2e] mb-2"
              >
                Account Number <span className="text-red-400">*</span>
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
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e] transition-all duration-200"
                  placeholder="123456789012"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-[#2d3e2e] mb-2"
            >
              Email Address <span className="text-red-400">*</span>
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-11 pr-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e] transition-all duration-200"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password & DOB Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#2d3e2e] mb-2"
              >
                Password <span className="text-red-400">*</span>
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
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={8}
                  className="w-full pl-11 pr-11 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e] transition-all duration-200"
                  placeholder="Min. 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#4a5a4a] hover:text-[#2d3e2e] transition-colors"
                >
                  {showPassword ? (
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
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
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
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-[#2d3e2e] mb-2"
              >
                Date of Birth <span className="text-red-400">*</span>
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
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e] transition-all duration-200"
                />
              </div>
            </div>
          </div>

          {/* ID Proof Upload */}
          <div>
            <label
              htmlFor="idProof"
              className="block text-sm font-medium text-[#2d3e2e] mb-2"
            >
              Upload ID Proof <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <input
                type="file"
                id="idProof"
                name="idProof"
                onChange={handleFileChange}
                required
                accept="image/png, image/jpeg, application/pdf"
                className="w-full text-sm text-[#2d3e2e] file:mr-3 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2d3e2e] file:text-[#d4d9c8] hover:file:bg-[#1a2519] file:cursor-pointer file:transition-all file:duration-200 bg-white border border-[#2d3e2e]/20 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
              />
              {idFile && (
                <div className="mt-2 flex items-center gap-2 text-sm text-[#2d3e2e]">
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
                  {idFile.name}
                </div>
              )}
            </div>
            <p className="text-xs text-[#4a5a4a] mt-2">
              PNG, JPG, or PDF files are accepted. Max 5MB.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3.5 rounded-lg font-semibold text-[#d4d9c8] shadow-md transition-all duration-200 ${
              submitting
                ? "bg-gray-600 cursor-not-allowed"
                : "bg-[#2d3e2e] hover:bg-[#1a2519] transform hover:scale-[1.02] active:scale-[0.98]"
            }`}
          >
            {submitting ? (
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
                Creating your account...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                Create Account
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

        {/* Sign in link */}
        <p className="mt-6 text-center text-[#4a5a4a] text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-[#2d3e2e] hover:text-[#1a2519] transition-colors"
          >
            Sign in instead
          </Link>
        </p>
      </div>
    </div>
  );
}
