import { useState } from "react";

export default function TransactionFormPage() {
  const [form, setForm] = useState({
    phoneNumber: "",
    amount: "",
    receiverAccount: "",
    receiverName: "",
    description: "",
    latitude: "",
    longitude: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [gettingLocation, setGettingLocation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setMessage({ type: "error", text: "Geolocation is not supported by your browser" });
      return;
    }
    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setForm((f) => ({
          ...f,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6),
        }));
        setGettingLocation(false);
        setMessage({ type: "success", text: "Location captured successfully" });
      },
      (error) => {
        setGettingLocation(false);
        setMessage({ type: "error", text: `Error getting location: ${error.message}` });
      }
    );
  };

  const validate = () => {
    if (!/^\+?\d{7,15}$/.test(form.phoneNumber.trim()))
      return "Enter a valid phone number";
    const amt = Number(form.amount);
    if (!amt || amt <= 0) return "Amount must be a positive number";
    if (!form.receiverAccount.trim()) return "Receiver account is required";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) {
      setMessage({ type: "error", text: err });
      return;
    }
    setLoading(true);
    setMessage(null);
    try {
      const payload = {
        phoneNumber: form.phoneNumber.trim(),
        amount: Number(form.amount),
        receiverAccount: form.receiverAccount.trim(),
        receiverName: form.receiverName.trim() || undefined,
        description: form.description.trim() || undefined,
      };
      
      // Add geolocation if provided
      if (form.latitude && form.longitude) {
        payload.geolocation = {
          latitude: Number(form.latitude),
          longitude: Number(form.longitude),
        };
      }

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/transactions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.message || "Failed to create transaction");
      setMessage({ type: "success", text: "Transaction created successfully" });
      setForm({
        phoneNumber: "",
        amount: "",
        receiverAccount: "",
        receiverName: "",
        description: "",
        latitude: "",
        longitude: "",
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-3 py-10 bg-[#d4d9c8] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-[#2d3e2e] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-[#2d3e2e] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      </div>
      <div className="relative w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl border border-[#2d3e2e]/10 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2d3e2e] mb-4">
            Initiate Transaction
          </h1>
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm border ${
                message.type === "error"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-[#2d3e2e]/10 text-[#2d3e2e] border-[#2d3e2e]/20"
              }`}
            >
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-[#2d3e2e] mb-2">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="+1234567890"
                className="w-full px-3.5 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-[#2d3e2e] mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="100.00"
                  className="w-full px-3.5 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                />
              </div>
              <div>
                <label className="block text-sm text-[#2d3e2e] mb-2">
                  Receiver Account
                </label>
                <input
                  name="receiverAccount"
                  value={form.receiverAccount}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className="w-full px-3.5 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-[#2d3e2e] mb-2">
                Receiver Name (optional)
              </label>
              <input
                name="receiverName"
                value={form.receiverName}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="w-full px-3.5 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
              />
            </div>
            <div>
              <label className="block text-sm text-[#2d3e2e] mb-2">
                Description (optional)
              </label>
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                placeholder="Notes..."
                className="w-full px-3.5 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
              ></textarea>
            </div>
            
            {/* Geolocation Section */}
            <div className="pt-2 border-t border-[#2d3e2e]/10">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm text-[#2d3e2e] font-medium">
                  Geolocation Coordinates (optional)
                </label>
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  disabled={gettingLocation}
                  className="flex items-center gap-2 px-3 py-1.5 text-xs bg-[#2d3e2e] text-[#d4d9c8] rounded-lg hover:bg-[#1a2519] transition-all disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {gettingLocation ? (
                    <>
                      <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
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
                      Getting...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-3 h-3"
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
                      Use My Location
                    </>
                  )}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-[#4a5a4a] mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    name="latitude"
                    step="any"
                    value={form.latitude}
                    onChange={handleChange}
                    placeholder="e.g., 40.712776"
                    className="w-full px-3.5 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                  />
                </div>
                <div>
                  <label className="block text-xs text-[#4a5a4a] mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    name="longitude"
                    step="any"
                    value={form.longitude}
                    onChange={handleChange}
                    placeholder="e.g., -74.005974"
                    className="w-full px-3.5 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] placeholder-[#4a5a4a] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                  />
                </div>
              </div>
              <p className="text-xs text-[#4a5a4a] mt-2">
                Add location data to help verify transaction authenticity
              </p>
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
              {loading ? "Submitting..." : "Submit Transaction"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
