import React from "react";
import { NavLink } from "react-router-dom";
import LogoutButton from "../compounds/LogoutButton";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between w-full max-w-7xl mx-auto mt-20 text-nowrap">
      <div className="flex gap-4">
        <NavLink to="/" className="text-lg font-bold text-gray-800">
          EventsME
        </NavLink>
      </div>
      <div className="flex gap-4 items-center ml-auto">
        <NavLink
          to="/my-events"
          className={({ isActive }) =>
            `text-lg font-medium ${isActive ? "text-blue-600" : "text-gray-600"}`
          }
        >
          My Events
        </NavLink>
        <LogoutButton />
      </div>
    </nav>
  );
};

export default Navbar;
