import React, { useEffect, useState } from "react";
import useNotesData from "../utils/useNotesData";
import Shimmer from "./Shimmer.js";
import Search from "./Search";
import useOnlineStatus from "../utils/useOnlineStatus";

const Main = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const { userNotes, loading, error } = useNotesData(
        user.userId,
        user.password
    );

    const [notesArray, setNotesArray] = useState([]);
    const [filteredNotesArray, setFilteredNotesArray] = useState([]);

    // Update notesArray and filteredNotesArray when userNotes change
    useEffect(() => {
        setNotesArray(userNotes);
        setFilteredNotesArray(userNotes);
    }, [userNotes]);
  
  const isUserOnline = useOnlineStatus();
  if (!isUserOnline) {
    return <h1>Looks like you are not online!! Check Your Internet Settings</h1>
    
  }

    if (loading) {
        return (
          <div className="notes-container">
            <Shimmer cards={25} />
          </div>
        );
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
  }
  if (!loading && userNotes.length < 1) {
    return <div className="notes-container" style={{justifyContent: 'center'}}><h2>No Notes available. <br/>Start by adding some notes </h2></div>;
  }

    return (
        <>
            <Search
                notesArray={notesArray}
                setFilteredNotesArray={setFilteredNotesArray}
            />
            <div className="notes-container">
                {filteredNotesArray.map((note) => (
                    <div className="note" key={note.id}>
                        <h2>{note.title}</h2>
                        <p>{note.description}</p>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Main;
