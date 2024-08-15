import { useState, useEffect } from 'react';




const useDarkMode = () => {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "On" ? true : false
  );

  useEffect(() => {
    // Your logic here
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

  }, [darkMode]);

  return [darkMode, (isdarkMode) => {
    setDarkMode(isdarkMode);
    localStorage.setItem("darkMode", isdarkMode ? "On" : "Off");

  }];
};

export default useDarkMode;