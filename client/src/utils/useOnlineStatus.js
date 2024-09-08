//to c


import { useState, useEffect } from "react";
const useOnlineStatus = () => {
  //check if user is online

  const [isUserOnline, setIsUserOnline] = useState(true);

  useEffect(() => {
    // console.log("use effect called...")
    window.addEventListener("offline", () => {
      setIsUserOnline(false);
    });

    window.addEventListener("online", () => {
      setIsUserOnline(true);
    });
  }, []);

  //return the boolean value
  return isUserOnline;
};

export default useOnlineStatus;
