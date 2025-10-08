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
    <div className="relative min-h-screen flex items-center justify-center p-3 py-10 bg-[#d4d9c8] overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/3 w-72 h-72 bg-[#2d3e2e] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob"></div>
        <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-[#2d3e2e] rounded-full mix-blend-multiply filter blur-3xl opacity-5 animate-blob animation-delay-2000"></div>
      </div>
      <div className="relative w-full max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl border border-[#2d3e2e]/10 p-6 md:p-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#2d3e2e] mb-4">
            Upload Transactions CSV
          </h1>
          <form onSubmit={handleUpload} className="space-y-4">
            <div>
              <label className="block text-sm text-[#2d3e2e] mb-2">
                CSV File
              </label>
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full text-sm text-[#2d3e2e] file:mr-3 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#2d3e2e] file:text-[#d4d9c8] hover:file:bg-[#1a2519] file:cursor-pointer file:transition-all file:duration-200 bg-white border border-[#2d3e2e]/20 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
              />
              <p className="text-xs text-[#4a5a4a] mt-2">
                Columns: phoneNumber, amount, receiverAccount, receiverName,
                description, kycDetails (JSON), name, accountNumber
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
              {loading ? "Processing..." : "Upload & Process"}
            </button>
          </form>
          {error && (
            <div className="mt-4 p-3 rounded-lg border bg-red-50 text-red-700 border-red-200 text-sm">
              {error}
            </div>
          )}
          {result && (
            <div className="mt-6 text-[#4a5a4a] text-sm">
              <div className="flex gap-4 flex-wrap">
                <span className="bg-[#2d3e2e]/5 text-[#2d3e2e] rounded-lg px-3 py-2">
                  Processed: {result.processed}
                </span>
                <span className="bg-green-50 text-green-700 border border-green-200 rounded-lg px-3 py-2">
                  Successes: {result.successes}
                </span>
                <span className="bg-red-50 text-red-700 border border-red-200 rounded-lg px-3 py-2">
                  Failures: {result.failures}
                </span>
              </div>
              {result.errors?.length > 0 && (
                <details className="mt-3">
                  <summary className="cursor-pointer text-[#2d3e2e]">
                    View errors
                  </summary>
                  <ul className="list-disc pl-6 mt-2 space-y-1">
                    {result.errors.map((e, i) => (
                      <li key={i} className="text-red-700">
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
