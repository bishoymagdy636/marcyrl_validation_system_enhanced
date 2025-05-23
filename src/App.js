import React, { useState } from "react";
import Dashboard from "./Dashboard";
import Login from "./Login";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  return isLoggedIn ? (
    <Dashboard />
  ) : (
    <Login onLoginSuccess={() => setIsLoggedIn(true)} />
  );
}
