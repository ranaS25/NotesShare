import React, { useEffect, useRef } from "react";

const NoteMenu = ({ noteId, setNoteMenu }) => {




  return (
    //note menu with menues: edit note, share note, delete note

    <div  
      className={`absolute top-10 right-8 h-fit w-fit rounded bg-slate-200 dark:bg-slate-700 z-10`}
    >
      <ul>
        <li className="hover:bg-slate-400 dark:hover:bg-slate-800 cursor-pointer px-8 py-2 rounded text-center">
          Edit
        </li>
        <li className="hover:bg-slate-400 dark:hover:bg-slate-800 cursor-pointer px-8 py-2 rounded text-center">
          Share
        </li>
        <li className="hover:bg-slate-400 dark:hover:bg-slate-800 cursor-pointer px-8 py-2 rounded text-center">
          Delete
        </li>
      </ul>
    </div>
  );
};

export default NoteMenu;
