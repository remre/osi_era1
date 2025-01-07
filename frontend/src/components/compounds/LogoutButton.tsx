import React from "react";
import Button from "../base/Button";
import { useAuth } from "../../context/AuthContext";

const LogoutButton: React.FC = () => {
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Button onClick={handleLogout} className="auth-button logout max-w-20">
      Logout
    </Button>
  );
};

export default LogoutButton;
