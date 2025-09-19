import React, { useState } from "react";


const Toggle = () => {
  const [themePicture, setThemePicture] = useState("dark");
  const [theme, setTheme] = useState("dark");

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setThemePicture(themePicture === "dark" ? "light" : "dark");
    setTheme(newTheme)

    if (newTheme === "light") {
        document.body.style.background = "none";
        document.body.style.color = "#374151";
        document.getElementById("toggleModeBtn").style.backgroundColor = "#374151";
    } else {
        document.body.style.background = "";
        document.body.style.color = "";
        document.getElementById("toggleModeBtn").style.backgroundColor = "";
    }
        
  };


  return (
    <>
      <button onClick={handleToggle} id="toggleModeBtn">
         {themePicture === "dark" ? "💡" : "💡"}
      </button>
    </>
  );
};

export default Toggle;
