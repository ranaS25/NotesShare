import React, { useEffect, useState } from "react";
import useNotesData from "../utils/useNotesData";
import Note, {withTags} from "./Note";
import Shimmer from "./Shimmer.js";
import Search from "./Search";
import useOnlineStatus from "../utils/useOnlineStatus";
import Sidebar from "./Sidebar.js";

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
      <div className="flex flex-col h-full">
        <Search
          notesArray={notesArray}
          setFilteredNotesArray={setFilteredNotesArray}
        />

        <div className="flex h-full bg-slate-500">
          <Sidebar />
          <div className="flex h-full flex-row flex-wrap gap-1 items-start overflow-scroll bg-slate-100 dark:bg-slate-900 p-4">
            {filteredNotesArray.map((note) => {
              
              return note.tags.length < 1 ? (
                <Note
                  key={note.id}
                  id={note.id}
                  tags={note.tags}
                  title={note.title}
                  description={note.description}
                />
              ) : (
                  <NoteWithTags
                    key={note.id}
                  id={note.id}
                  tags={note.tags}
                  title={note.title}
                  description={note.description}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
};

export default Main;
