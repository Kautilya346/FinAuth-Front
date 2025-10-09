import { useState } from "react";
import toast from "react-hot-toast";

export default function FraudDetectionPage() {
  const [activeTab, setActiveTab] = useState("transaction"); // 'transaction' or 'location'
  const [loading, setLoading] = useState(false);

  // Transaction Analysis State
  const [currentTransaction, setCurrentTransaction] = useState({
    userId: "",
    amount: "",
    receiverAccount: "",
    receiverName: "",
    transactionType: "debit",
    description: "",
    latitude: "",
    longitude: "",
  });

  const [previousTransactions, setPreviousTransactions] = useState([
    { amount: "", transactionType: "debit", receiverName: "", timestamp: "" },
  ]);

  const [transactionResult, setTransactionResult] = useState(null);

  // Location Analysis State
  const [currentLocation, setCurrentLocation] = useState({
    latitude: "",
    longitude: "",
  });

  const [previousLocations, setPreviousLocations] = useState([
    { latitude: "", longitude: "" },
  ]);

  const [locationResult, setLocationResult] = useState(null);

  // Handle Transaction Analysis
  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTransactionResult(null);

    const loadingToast = toast.loading("Analyzing transaction...");

    try {
      const payload = {
        current_transaction: {
          userId: currentTransaction.userId,
          amount: parseFloat(currentTransaction.amount),
          receiverAccount: currentTransaction.receiverAccount,
          receiverName: currentTransaction.receiverName,
          transactionType: currentTransaction.transactionType,
          timestamp: new Date().toISOString(),
          description: currentTransaction.description,
          geolocation: {
            latitude: parseFloat(currentTransaction.latitude),
            longitude: parseFloat(currentTransaction.longitude),
          },
        },
        previous_transactions: previousTransactions
          .filter((t) => t.amount && t.receiverName && t.timestamp)
          .map((t) => ({
            amount: parseFloat(t.amount),
            transactionType: t.transactionType,
            receiverName: t.receiverName,
            timestamp: t.timestamp,
          })),
      };

      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setTransactionResult(data);
        toast.dismiss(loadingToast);
        
        if (data.llm_analysis?.is_fraudulent) {
          toast.error("⚠️ Potential fraud detected!");
        } else {
          toast.success("✅ Transaction appears legitimate");
        }
      } else {
        toast.dismiss(loadingToast);
        toast.error(data.error || "Analysis failed");
        console.error("Error:", data.error);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to connect to fraud detection service");
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Location Analysis
  const handleLocationSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLocationResult(null);

    const loadingToast = toast.loading("Analyzing location...");

    try {
      const payload = {
        current_geolocation: {
          latitude: parseFloat(currentLocation.latitude),
          longitude: parseFloat(currentLocation.longitude),
        },
        previous_geolocations: previousLocations
          .filter((loc) => loc.latitude && loc.longitude)
          .map((loc) => ({
            latitude: parseFloat(loc.latitude),
            longitude: parseFloat(loc.longitude),
          })),
      };

      const response = await fetch("http://127.0.0.1:5000/analyze_location", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        setLocationResult(data);
        toast.dismiss(loadingToast);
        
        if (data.location_anomaly_score > 0.7) {
          toast.error("⚠️ Location anomaly detected!");
        } else {
          toast.success("✅ Location appears normal");
        }
      } else {
        toast.dismiss(loadingToast);
        toast.error(data.error || "Location analysis failed");
        console.error("Error:", data.error);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to connect to location analysis service");
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add/Remove Previous Transaction
  const addPreviousTransaction = () => {
    setPreviousTransactions([
      ...previousTransactions,
      { amount: "", transactionType: "debit", receiverName: "", timestamp: "" },
    ]);
  };

  const removePreviousTransaction = (index) => {
    setPreviousTransactions(previousTransactions.filter((_, i) => i !== index));
  };

  const updatePreviousTransaction = (index, field, value) => {
    const updated = [...previousTransactions];
    updated[index][field] = value;
    setPreviousTransactions(updated);
  };

  // Add/Remove Previous Location
  const addPreviousLocation = () => {
    setPreviousLocations([...previousLocations, { latitude: "", longitude: "" }]);
  };

  const removePreviousLocation = (index) => {
    setPreviousLocations(previousLocations.filter((_, i) => i !== index));
  };

  const updatePreviousLocation = (index, field, value) => {
    const updated = [...previousLocations];
    updated[index][field] = value;
    setPreviousLocations(updated);
  };

  return (
    <div className="min-h-screen bg-[#d4d9c8] py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#2d3e2e] rounded-2xl mb-4">
            <svg
              className="w-8 h-8 text-[#d4d9c8]"
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
          <h1 className="text-4xl font-bold text-[#2d3e2e] mb-2">
            Fraud Detection Center
          </h1>
          <p className="text-[#4a5a4a] text-lg">
            Analyze transactions and locations for fraudulent activity
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white rounded-xl p-1 shadow-md">
            <button
              onClick={() => setActiveTab("transaction")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === "transaction"
                  ? "bg-[#2d3e2e] text-[#d4d9c8]"
                  : "text-[#4a5a4a] hover:bg-[#d4d9c8]/30"
              }`}
            >
              Transaction Analysis
            </button>
            <button
              onClick={() => setActiveTab("location")}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                activeTab === "location"
                  ? "bg-[#2d3e2e] text-[#d4d9c8]"
                  : "text-[#4a5a4a] hover:bg-[#d4d9c8]/30"
              }`}
            >
              Location Analysis
            </button>
          </div>
        </div>

        {/* Transaction Analysis Form */}
        {activeTab === "transaction" && (
          <div className="bg-white rounded-2xl shadow-xl border border-[#2d3e2e]/10 p-8">
            <h2 className="text-2xl font-bold text-[#2d3e2e] mb-6">
              Transaction Analysis
            </h2>
            <form onSubmit={handleTransactionSubmit} className="space-y-6">
              {/* Current Transaction */}
              <div className="bg-[#d4d9c8]/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-semibold text-[#2d3e2e] mb-4">
                  Current Transaction
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2d3e2e] mb-2">
                      User ID
                    </label>
                    <input
                      type="text"
                      required
                      value={currentTransaction.userId}
                      onChange={(e) =>
                        setCurrentTransaction({
                          ...currentTransaction,
                          userId: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                      placeholder="60d5f1f77b8c4b2a8c8b4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2d3e2e] mb-2">
                      Amount
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={currentTransaction.amount}
                      onChange={(e) =>
                        setCurrentTransaction({
                          ...currentTransaction,
                          amount: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                      placeholder="8500.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2d3e2e] mb-2">
                      Receiver Account
                    </label>
                    <input
                      type="text"
                      required
                      value={currentTransaction.receiverAccount}
                      onChange={(e) =>
                        setCurrentTransaction({
                          ...currentTransaction,
                          receiverAccount: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                      placeholder="5551239876"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2d3e2e] mb-2">
                      Receiver Name
                    </label>
                    <input
                      type="text"
                      required
                      value={currentTransaction.receiverName}
                      onChange={(e) =>
                        setCurrentTransaction({
                          ...currentTransaction,
                          receiverName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                      placeholder="Online Gaming Hub"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2d3e2e] mb-2">
                      Transaction Type
                    </label>
                    <select
                      value={currentTransaction.transactionType}
                      onChange={(e) =>
                        setCurrentTransaction({
                          ...currentTransaction,
                          transactionType: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                    >
                      <option value="debit">Debit</option>
                      <option value="credit">Credit</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2d3e2e] mb-2">
                      Description
                    </label>
                    <input
                      type="text"
                      value={currentTransaction.description}
                      onChange={(e) =>
                        setCurrentTransaction({
                          ...currentTransaction,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                      placeholder="Purchase of in-game currency"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2d3e2e] mb-2">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={currentTransaction.latitude}
                      onChange={(e) =>
                        setCurrentTransaction({
                          ...currentTransaction,
                          latitude: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                      placeholder="4.7110"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2d3e2e] mb-2">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={currentTransaction.longitude}
                      onChange={(e) =>
                        setCurrentTransaction({
                          ...currentTransaction,
                          longitude: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                      placeholder="-74.0721"
                    />
                  </div>
                </div>
              </div>

              {/* Previous Transactions */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-[#2d3e2e]">
                    Previous Transactions
                  </h3>
                  <button
                    type="button"
                    onClick={addPreviousTransaction}
                    className="px-4 py-2 bg-[#2d3e2e] text-[#d4d9c8] rounded-lg hover:bg-[#1a2519] transition-colors"
                  >
                    + Add Transaction
                  </button>
                </div>

                {previousTransactions.map((transaction, index) => (
                  <div
                    key={index}
                    className="bg-[#d4d9c8]/20 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[#2d3e2e]">
                        Transaction #{index + 1}
                      </span>
                      {previousTransactions.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePreviousTransaction(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                      <input
                        type="number"
                        step="0.01"
                        placeholder="Amount"
                        value={transaction.amount}
                        onChange={(e) =>
                          updatePreviousTransaction(
                            index,
                            "amount",
                            e.target.value
                          )
                        }
                        className="px-3 py-2 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                      />

                      <select
                        value={transaction.transactionType}
                        onChange={(e) =>
                          updatePreviousTransaction(
                            index,
                            "transactionType",
                            e.target.value
                          )
                        }
                        className="px-3 py-2 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                      >
                        <option value="debit">Debit</option>
                        <option value="credit">Credit</option>
                      </select>

                      <input
                        type="text"
                        placeholder="Receiver Name"
                        value={transaction.receiverName}
                        onChange={(e) =>
                          updatePreviousTransaction(
                            index,
                            "receiverName",
                            e.target.value
                          )
                        }
                        className="px-3 py-2 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                      />

                      <input
                        type="datetime-local"
                        value={transaction.timestamp}
                        onChange={(e) =>
                          updatePreviousTransaction(
                            index,
                            "timestamp",
                            e.target.value
                          )
                        }
                        className="px-3 py-2 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg font-semibold text-[#d4d9c8] shadow-md transition-all duration-200 ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-[#2d3e2e] hover:bg-[#1a2519]"
                }`}
              >
                {loading ? "Analyzing..." : "Analyze Transaction"}
              </button>
            </form>

            {/* Transaction Result */}
            {transactionResult && (
              <div className="mt-8 p-6 bg-[#d4d9c8]/30 rounded-xl">
                <h3 className="text-xl font-bold text-[#2d3e2e] mb-4">
                  Analysis Result
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <span className="font-semibold text-[#2d3e2e]">
                      Scam Score:
                    </span>
                    <span
                      className={`text-2xl font-bold ${
                        transactionResult.scam_score > 0.7
                          ? "text-red-600"
                          : transactionResult.scam_score > 0.4
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {(transactionResult.scam_score * 100).toFixed(2)}%
                    </span>
                  </div>

                  {transactionResult.llm_analysis && (
                    <div className="p-4 bg-white rounded-lg">
                      <div className="flex items-start gap-3 mb-3">
                        <span className="font-semibold text-[#2d3e2e]">
                          Fraud Status:
                        </span>
                        <span
                          className={`font-bold ${
                            transactionResult.llm_analysis.is_fraudulent
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {transactionResult.llm_analysis.is_fraudulent
                            ? "⚠️ FRAUDULENT"
                            : "✅ LEGITIMATE"}
                        </span>
                      </div>

                      <div>
                        <span className="font-semibold text-[#2d3e2e] block mb-2">
                          Analysis:
                        </span>
                        <p className="text-[#4a5a4a] leading-relaxed">
                          {transactionResult.llm_analysis.reason}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Location Analysis Form */}
        {activeTab === "location" && (
          <div className="bg-white rounded-2xl shadow-xl border border-[#2d3e2e]/10 p-8">
            <h2 className="text-2xl font-bold text-[#2d3e2e] mb-6">
              Location Analysis
            </h2>
            <form onSubmit={handleLocationSubmit} className="space-y-6">
              {/* Current Location */}
              <div className="bg-[#d4d9c8]/20 rounded-xl p-6 space-y-4">
                <h3 className="text-xl font-semibold text-[#2d3e2e] mb-4">
                  Current Location
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#2d3e2e] mb-2">
                      Latitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={currentLocation.latitude}
                      onChange={(e) =>
                        setCurrentLocation({
                          ...currentLocation,
                          latitude: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                      placeholder="55.7558"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#2d3e2e] mb-2">
                      Longitude
                    </label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={currentLocation.longitude}
                      onChange={(e) =>
                        setCurrentLocation({
                          ...currentLocation,
                          longitude: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                      placeholder="37.6173"
                    />
                  </div>
                </div>
              </div>

              {/* Previous Locations */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-[#2d3e2e]">
                    Previous Locations
                  </h3>
                  <button
                    type="button"
                    onClick={addPreviousLocation}
                    className="px-4 py-2 bg-[#2d3e2e] text-[#d4d9c8] rounded-lg hover:bg-[#1a2519] transition-colors"
                  >
                    + Add Location
                  </button>
                </div>

                {previousLocations.map((location, index) => (
                  <div
                    key={index}
                    className="bg-[#d4d9c8]/20 rounded-xl p-4 space-y-3"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-[#2d3e2e]">
                        Location #{index + 1}
                      </span>
                      {previousLocations.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePreviousLocation(index)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <input
                        type="number"
                        step="any"
                        placeholder="Latitude"
                        value={location.latitude}
                        onChange={(e) =>
                          updatePreviousLocation(
                            index,
                            "latitude",
                            e.target.value
                          )
                        }
                        className="px-3 py-2 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                      />

                      <input
                        type="number"
                        step="any"
                        placeholder="Longitude"
                        value={location.longitude}
                        onChange={(e) =>
                          updatePreviousLocation(
                            index,
                            "longitude",
                            e.target.value
                          )
                        }
                        className="px-3 py-2 bg-white border border-[#2d3e2e]/20 rounded-lg text-[#2d3e2e] focus:outline-none focus:ring-2 focus:ring-[#2d3e2e]"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-lg font-semibold text-[#d4d9c8] shadow-md transition-all duration-200 ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-[#2d3e2e] hover:bg-[#1a2519]"
                }`}
              >
                {loading ? "Analyzing..." : "Analyze Location"}
              </button>
            </form>

            {/* Location Result */}
            {locationResult && (
              <div className="mt-8 p-6 bg-[#d4d9c8]/30 rounded-xl">
                <h3 className="text-xl font-bold text-[#2d3e2e] mb-4">
                  Analysis Result
                </h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                    <span className="font-semibold text-[#2d3e2e]">
                      Anomaly Score:
                    </span>
                    <span
                      className={`text-2xl font-bold ${
                        locationResult.location_anomaly_score > 0.7
                          ? "text-red-600"
                          : locationResult.location_anomaly_score > 0.4
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {(locationResult.location_anomaly_score * 100).toFixed(2)}%
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-lg">
                      <span className="font-semibold text-[#2d3e2e] block mb-2">
                        Current Location:
                      </span>
                      <p className="text-[#4a5a4a]">
                        [{locationResult.current_location_coordinates[0].toFixed(4)},{" "}
                        {locationResult.current_location_coordinates[1].toFixed(4)}]
                      </p>
                    </div>

                    <div className="p-4 bg-white rounded-lg">
                      <span className="font-semibold text-[#2d3e2e] block mb-2">
                        Historical Center:
                      </span>
                      <p className="text-[#4a5a4a]">
                        [{locationResult.historical_center_coordinates[0].toFixed(4)},{" "}
                        {locationResult.historical_center_coordinates[1].toFixed(4)}]
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg">
                    <span className="font-semibold text-[#2d3e2e] block mb-2">
                      Distance from Center:
                    </span>
                    <p className="text-2xl font-bold text-[#2d3e2e]">
                      {locationResult.distance_from_center_km.toFixed(2)} km
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
