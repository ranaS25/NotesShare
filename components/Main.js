import React, { useEffect, useState } from "react";
import useNotesData from "../utils/useNotesData";
import Shimmer from "./Shimmer.js";
import Search from "./Search";

const Main = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
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

    if (loading) {
        return (
            <div className="notes-container">
                {Array.from({ length: 30 }, (_, index) => (
                    <Shimmer key={index} />
                ))}
            </div>
        );
    }

    if (error) {
        return <div className="error">Error: {error}</div>;
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
