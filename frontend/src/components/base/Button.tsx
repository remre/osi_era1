import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type = "button",
  onClick,
  className,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`auth-button ${className} ${
        disabled ? "cursor-not-allowed opacity-50" : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
