import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import TransactionFormPage from "./pages/TransactionFormPage";
import CsvUploadPage from "./pages/CsvUploadPage";
import "./index.css";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/transactions/new" element={<TransactionFormPage />} />
          <Route path="/upload-csv" element={<CsvUploadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
