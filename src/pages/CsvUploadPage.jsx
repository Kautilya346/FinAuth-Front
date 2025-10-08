import { useState } from "react";

export default function CsvUploadPage() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleUpload = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    if (!file) {
      setError("Please select a CSV file.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    setLoading(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/upload-csv`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Upload failed");
      setResult(data.summary);
    } catch (err) {
      setError(err.message);
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
            Upload Transactions CSV
          </h1>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-200 mb-2">
                CSV File
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full text-sm text-gray-300 file:mr-3 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-indigo-600 file:to-purple-600 file:text-white hover:file:from-indigo-500 hover:file:to-purple-500 file:cursor-pointer file:transition-all file:duration-200 bg-white/5 border border-white/10 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500 input-glow"
              />
              <p className="text-xs text-gray-400 mt-2">
                Columns: phoneNumber, amount, receiverAccount, receiverName,
                description, kycDetails (JSON), name, accountNumber
              </p>
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
              {loading ? "Processing..." : "Upload & Process"}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-3 rounded-lg bg-red-500/20 text-red-200 text-sm">
              {error}
            </div>
          )}
          {result && (
            <div className="mt-6 text-gray-200 text-sm">
              <div className="flex gap-4 flex-wrap">
                <span className="bg-white/10 rounded-lg px-3 py-2">
                  Processed: {result.processed}
                </span>
                <span className="bg-white/10 rounded-lg px-3 py-2 text-green-300">
                  Successes: {result.successes}
                </span>
                <span className="bg-white/10 rounded-lg px-3 py-2 text-red-300">
                  Failures: {result.failures}
                </span>
              </div>
              {result.errors?.length > 0 && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-gray-300">
                    View errors
                  </summary>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    {result.errors.map((e, i) => (
                      <li key={i} className="text-red-300">
                        {e}
                      </li>
                    ))}
                  </ul>
                </details>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
