import React, { useState } from "react";


const Toggle = () => {
  const [theme, setTheme] = useState("dark");

  const handleToggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme)

    if (newTheme === "light") {
        document.body.style.background = "none";
        document.getElementById("toggleModeBtn").style.backgroundImage = "url('/pexels-tirachard-kumtanom-112571-450066.jpg')";
        document.getElementById("toggleModeBtn").style.backgroundSize = "20%";



    //  "#374151"

    } else {
        document.body.style.background = "";
        document.getElementById("toggleModeBtn").style.backgroundImage = "";
        document.getElementById("toggleModeBtn").style.backgroundSize = "";
    }
        
  };


  return (
    <>
      <button onClick={handleToggle} id="toggleModeBtn">
        💡 
      </button>
    </>
  );
};

export default Toggle;
