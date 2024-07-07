import { useState, useEffect } from "react";

const useNotesData = (userId, userPassword) => {
  const [userNotes, setUserNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3000/notes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Userid: userId,
            Userpassword: userPassword,
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const jsonRes = await response.json();
        setUserNotes(jsonRes);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, userPassword]);

  return { userNotes, loading, error };
};

export default useNotesData;
