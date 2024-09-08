import { useState, useEffect } from "react";
import { SERVER_HOST } from "./constants";

const useNotesData = () => {
  const [userNotes, setUserNotes] = useState([]);
  const [sharedNotes, setSharedNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        setUserNotes(jsonRes.data.ownedNotes);
        setSharedNotes(jsonRes.data.sharedNotes);
      } catch (err) {
        setError("Can't Fetch Right Now. Try again...");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { userNotes,sharedNotes,  loading, error };
};

export default useNotesData;
