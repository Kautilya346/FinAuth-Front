import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import TransactionFormPage from "./pages/TransactionFormPage";
import CsvUploadPage from "./pages/CsvUploadPage";
import PhoneVerificationPage from "./pages/PhoneVerificationPage";
import KycVerificationPage from "./pages/KycVerificationPage";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#d4d9c8] flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/transactions/new" element={<TransactionFormPage />} />
          <Route path="/upload-csv" element={<CsvUploadPage />} />
          <Route path="/onboarding/phone-verification" element={<PhoneVerificationPage />} />
          <Route path="/onboarding/kyc-verification" element={<KycVerificationPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
