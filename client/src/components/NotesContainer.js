import React, {useState} from 'react'
import Note from './Note';


const NotesContainer = ({ notes}) => {
  const [noteMenu, setNoteMenu] = useState(null);


  const handleNoteMenuClick = (noteId)=>{
    setNoteMenu(noteId)

  }
  
  return (
    <div className="flex  flex-grow flex-row flex-wrap gap-1 items-start bg-slate-100 dark:bg-slate-900 p-4">
    
      {notes.map((note) => {
        return <Note key={note._id} isMenuSelected={noteMenu != null && noteMenu === note._id} noteDetails={note} setNoteMenu={handleNoteMenuClick}/>;
      })}
    </div>
  );
}

export default NotesContainer