import { useState, useEffect } from "react";
import { SERVER_HOST } from "./constants";

// Helper function to get a specific cookie by name
const getCookie = (name) => {
  console.log(document.cookie)
  const match = document.cookie.match(new RegExp('(^|;\\s*)' + name + '=([^;]*)'));
  console.log(match)
  return match ? decodeURIComponent(match[2]) : null;
};


// Usage:


const useNotesData = () => {
  const [userNotes, setUserNotes] = useState([]);
  const [sharedNotes, setSharedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log("here")
  console.log("document cookie")
  console.log(document.cookie)

  var timeoutId = null;

  const fetchData = async () => {
      setLoading(true);
      console.log("here...")
      try {
        const response = await fetch(`${SERVER_HOST}/notes`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonRes = await response.json();
        console.log(jsonRes)
        setUserNotes(jsonRes.data.ownedNotes);
        setSharedNotes(jsonRes.data.sharedNotes);
      } catch (err) {
        setError("Can't Fetch Right Now. Try again...");
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
   

    

    console.log("fetching data...")
    fetchData();
    // timeoutId = setInterval(fetchData, 4000);

    // return ()=>{
    //   clearInterval(timeoutId);
    // }
  }, []);

  return { userNotes,sharedNotes,  loading, error, fetchData };
};

export default useNotesData;
