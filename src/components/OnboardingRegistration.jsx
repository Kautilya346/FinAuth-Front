// src/components/OnboardingRegistration.jsx

import { useState } from "react";

// Onboarding registration component that sends JSON to the backend.
// The uploaded file is converted to Base64 and included in the JSON payload.
export default function OnboardingRegistration() {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleFileChange = (e) => {
    setIdFile(e.target.files[0] ?? null);
  };

  // helper to convert File to base64
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

    // Basic validation
    if (!idFile) {
      alert("Please upload ID proof.");
      return;
    }

    setSubmitting(true);
    try {
      const idBase64 = await fileToBase64(idFile);

      // Build a JSON-ready payload. We include file metadata and the base64 data.
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
          data: idBase64, // data:<mime>;base64,AAAA...
        },
      };

      const apiUrl = `${import.meta.env.VITE_API_URL}/register`;

      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const json = await res.json();
        console.log("Registration success:", json);
        alert("Registration successful!");
        // Optionally reset form
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Create Your Account
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Fill in your details and upload an ID proof. The file will be sent
          securely as Base64 inside a JSON payload.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Phone Number
            </label>
            <div className="flex">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="px-4 py-2 border border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50"
              >
                <option value="+91">IN (+91)</option>
                <option value="+1">US (+1)</option>
                <option value="+44">UK (+44)</option>
              </select>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="flex-grow px-4 py-2 border border-gray-300 rounded-r-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="9876543210"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="kycId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                KYC ID
              </label>
              <input
                type="text"
                id="kycId"
                name="kycId"
                value={formData.kycId}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="e.g., PAN or Aadhaar"
              />
            </div>
            <div>
              <label
                htmlFor="accountNumber"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="123456789012"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              minLength="8"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label
              htmlFor="idProof"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload ID Proof
            </label>
            <input
              type="file"
              id="idProof"
              name="idProof"
              onChange={handleFileChange}
              required
              accept="image/png, image/jpeg, application/pdf"
              className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
            <p className="text-xs text-gray-500 mt-1">
              PNG, JPG, or PDF files are accepted.
            </p>
          </div>

          <div>
            <button
              type="submit"
              disabled={submitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                submitting ? "bg-gray-400" : "bg-indigo-600 hover:bg-indigo-700"
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-300`}
            >
              {submitting ? "Submitting..." : "Register"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
