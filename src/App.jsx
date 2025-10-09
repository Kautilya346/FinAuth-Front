import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import HomePage from "./pages/HomePage";
import TransactionFormPage from "./pages/TransactionFormPage";
import CsvUploadPage from "./pages/CsvUploadPage";
import PhoneVerificationPage from "./pages/PhoneVerificationPage";
import OnboardingRegistration from "./components/OnboardingRegistration";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#d4d9c8] flex flex-col">
        <Navbar />
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/transactions/new" element={<TransactionFormPage />} />
          <Route path="/upload-csv" element={<CsvUploadPage />} />
          <Route
            path="/onboarding/phone-verification"
            element={<PhoneVerificationPage />}
          />
          <Route
            path="/kyc-registration"
            element={<OnboardingRegistration />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
