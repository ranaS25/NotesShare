import React, { useEffect, useRef, useState } from "react";
import useNotesData from "../utils/useNotesData";
import Note, { withTags } from "./Note";
import NoteEditor from "./NoteEditor.js";
import Shimmer from "./Shimmer.js";
import Search from "./Search";
import useOnlineStatus from "../utils/useOnlineStatus";
import Sidebar from "./Sidebar.js";
import { useRef } from "react";




const Main = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [noteEditor, setNoteEditor] = useState(false);
  const noteEditorRef = useRef(null);
  const { userNotes, loading, error } = useNotesData(
    user.userId,
    user.password
  );

  const [notesArray, setNotesArray] = useState([]);
  const [filteredNotesArray, setFilteredNotesArray] = useState([]);
  
  const NoteWithTags = withTags(Note);
  const handleNewNote = (event) => {
    setNoteEditor(true);

  }

  
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
      <div className="flex flex-wrap gap-4 p-4 dark:bg-slate-900">
        <Shimmer cards={25} />
      </div>
    );
  }

  if (error) {
    return <div className="m-auto text-6xl text-gray-700">Error: {error}</div>;
  }

  if (!loading && userNotes.length < 1) {
    return (
       <>
        
        <Button
          onCLick={() => handleNewNote(e)}
          className="fixed bottom-10 right-10 bg-green-300 p-4 rounded-md font-bold hover:bg-green-400 dark:bg-green-700 dark:hover:bg-green-800 dark:text-slate-100 "
        >
          Add A Note
        </Button>
        <div style={{ justifyContent: "center" }}>
          <h2>
            No Notes available. <br />
            Start by adding some notes{" "}
          </h2>
        </div>
      </>
    );
  }

  console.log("note Editor: "+noteEditor)

  return (
    <>
      {noteEditor && (
        <NoteEditor
          noteEditorRef={noteEditorRef}
          setNoteEditor={setNoteEditor}
        />
      )}
      { !noteEditor && <button
        onClick={(e) => handleNewNote(e)}
        className="fixed bottom-10 right-10 bg-green-300 p-4 rounded-md font-bold hover:bg-green-400 dark:bg-green-700 dark:hover:bg-green-800 dark:text-slate-100 "
      >
        Add a note
      </button>}
      
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex flex-grow flex-col">
          <Search
            notesArray={notesArray}
            setFilteredNotesArray={setFilteredNotesArray}
          />

          <div className="flex flex-grow bg-slate-500">
            <div className="flex  flex-grow flex-row flex-wrap gap-1 items-start bg-slate-100 dark:bg-slate-900 p-4">
              {filteredNotesArray.map((note) => {
                return note.tags.length < 1 ? (
                  <Note key={note.id} noteDetails={note} />
                ) : (
                  <NoteWithTags key={note.id} noteDetails={note} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
  
};

export default Main;
