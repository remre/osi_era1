import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AllEventsPage from "./pages/EventListPage";
import { AuthProvider, useAuth } from "./context/AuthContext";
import MyEventsPage from "./pages/MyEvents";
import "./App.css";
import axios from "axios";

import Loading from "./components/base/Loading";
import { Suspense } from "react";
import ErrorBoundary from "./components/compounds/ErrorBoundary";
import { EventProvider } from "./context/EventContext";
axios.defaults.withCredentials = true;

import Navbar from "./components/features/Navbar";

const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
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

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Navbar />
      <div className="flex-grow flex items-center justify-center mt-10">
        <Routes>
          <Route path="/" element={<AllEventsPage />} />
          <Route path="my-events" element={<MyEventsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <EventProvider>
      <Router>
        <ErrorBoundary>
          <Suspense fallback={<Loading />}>
            <AppContent />
          </Suspense>
        </ErrorBoundary>
      </Router>
    </EventProvider>
  </AuthProvider>
);

export default App;
