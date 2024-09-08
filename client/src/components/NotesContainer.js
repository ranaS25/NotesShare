import React from 'react'
import Note from './Note';

const NotesContainer = ({ notes}) => {
  return (
    <div className="flex  flex-grow flex-row flex-wrap gap-1 items-start bg-slate-100 dark:bg-slate-900 p-4">
      {notes.map((note) => {
        return <Note key={note._id} noteDetails={note} />;
        return note.tags.length < 1 ? (
          <Note key={note.id} noteDetails={note} />
        ) : (
          <NoteWithTags key={note.id} noteDetails={note} />
        );
      })}
    </div>
  );
}

export default NotesContainer