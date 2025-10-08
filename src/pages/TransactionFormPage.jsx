import { useState } from "react";

export default function TransactionFormPage() {
  const [form, setForm] = useState({
    phoneNumber: "",
    amount: "",
    receiverAccount: "",
    receiverName: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
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
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/transactions`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phoneNumber: form.phoneNumber.trim(),
            amount: Number(form.amount),
            receiverAccount: form.receiverAccount.trim(),
            receiverName: form.receiverName.trim() || undefined,
            description: form.description.trim() || undefined,
          }),
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
      });
    } catch (err) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-3 py-10 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>
      <div className="relative w-full max-w-2xl">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl border border-white/15 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Initiate Transaction
          </h1>
          {message && (
            <div
              className={`mb-4 p-3 rounded-lg text-sm ${
                message.type === "error"
                  ? "bg-red-500/20 text-red-200"
                  : "bg-green-500/20 text-green-200"
              }`}
            >
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-200 mb-2">
                Phone Number
              </label>
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                placeholder="+1234567890"
                className="w-full px-3.5 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 input-glow"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-200 mb-2">
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
                  className="w-full px-3.5 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 input-glow"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-200 mb-2">
                  Receiver Account
                </label>
                <input
                  name="receiverAccount"
                  value={form.receiverAccount}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className="w-full px-3.5 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 input-glow"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-200 mb-2">
                Receiver Name (optional)
              </label>
              <input
                name="receiverName"
                value={form.receiverName}
                onChange={handleChange}
                placeholder="Jane Doe"
                className="w-full px-3.5 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 input-glow"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-200 mb-2">
                Description (optional)
              </label>
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                placeholder="Notes..."
                className="w-full px-3.5 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 input-glow"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-lg font-semibold text-white shadow-md transition-all duration-200 ${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500"
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
