import React, { useState } from "react";

import Input from "../components/base/Input";
import Button from "../components/base/Button";

interface AuthFormProps {
  title: string;
  onSubmit: (username: string, password: string) => Promise<void>;
  linkText?: string;
  linkPath?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  title,
  onSubmit,
  linkText,
  linkPath,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      alert("Please fill in both fields.");
      setError("Please fill in both fields.");
      return;
    }

    try {
      await onSubmit(username, password);
      alert(`${title} successful!`);
    } catch {
      alert(`${title} failed. Please try again.`);
      setError(`${title} failed. Please try again.`);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2 className="auth-title">{title}</h2>
        <Input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          className="auth-input"
        />
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          className="auth-input"
        />
        {error && <p className="auth-error">{error}</p>}
        <Button type="submit" className="auth-button">
          {title}
        </Button>
        {linkText && linkPath && (
          <p className="auth-link">
            {linkText} <a href={linkPath}>Here</a>
          </p>
        )}
      </form>
    </div>
  );
};

export default AuthForm;
