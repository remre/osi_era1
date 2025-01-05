import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import LogoutButton from "./compounds/LogoutButton";
import "./App.css";
import axios from "axios";

axios.defaults.withCredentials = true;

// AppContent Component
const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 duration-3000">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Kullanıcı giriş yaptıysa anasayfayı ve logout butonunu göster
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center flex-col">
      <Routes>
        <Route path="/" element={<h1>Welcome to the Event App</h1>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <div className="flex mt-40 items-center justify-center">
        <LogoutButton />
      </div>
    </div>
  );
};

// Main App Component
const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
