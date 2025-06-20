import React from "react";
import './ModeToggle.css';

const ModeToggle = () => {
  const toggleMode = () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    localStorage.setItem("mode", isDark ? "dark" : "light");
  };

  return (
    <button onClick={toggleMode}>Toggle Mode</button>
  );
};

export default ModeToggle;