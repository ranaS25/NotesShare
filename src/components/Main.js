import React, { useEffect, useState } from "react";
import useNotesData from "../utils/useNotesData";
import Note, {withTags} from "./Note";
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
  
  const NoteWithTags = withTags(Note);

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
          <div className="flex flex-wrap gap-4">
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
        <div className=" flex flex-wrap gap-4 p-4 bg-slate-100 dark:bg-slate-900">
          {filteredNotesArray.map((note) => {
            console.log("note length: ", note.tags.length, " node data: ", note.tags);
            return note.tags.length < 1 ? (
              <Note
                id={note.id}
                tags={note.tags}
                title={note.title}
                description={note.description}
              />
            ) : (
              <NoteWithTags
                id={note.id}
                tags={note.tags}
                title={note.title}
                description={note.description}
              />
            );
          }
          )}
        </div>
      </>
    );
};

export default Main;
