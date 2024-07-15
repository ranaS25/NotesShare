import React, { useEffect, useState } from 'react';


const NoteEditor = ({ noteEditorRef, setNoteEditor }) => {

  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("");

  const handleSave = (e) => {
    e.preventDefault();

    if (title == "" && description == "") { 
      return
      
    }

    // fetch(``, {}).then()
    location.reload();
    setNoteEditor(false);

  }


  useEffect(() => {
    console.log("Note editor ref: " + noteEditorRef.current)  
    document.addEventListener("mousedown", (event) => {
      console.log("deteted click");
      if (
        noteEditorRef.current &&
        !noteEditorRef.current.contains(event.target)
      ) {
        console.log("executing");
        // noteEditorRef(false);
        setNoteEditor(false)
      }
    });
  });

  return (
    <div ref={noteEditorRef} className="flex flex-col fixed w-1/2 h-[70vh] z-50 p-4  my-10 gap-4 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%]  bg-green-50 dark:bg-slate-600 rounded-lg drop-shadow-sm drop">
      <form className=" w-full flex flex-col h-full gap-4">
      <input type="text" className="py-2 px-4 rounded"
        placeholder='Title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
      

      <textarea type="text" className="h-full p-4 rounded resize-none" placeholder="Empty" value={description} required
      onChange={(e)=>setDescription(e.target.value)}/>
        <button type="submit" className="bg-green-500 hover:bg-green-600 dark:bg-green-700 p-2 rounded hover:bg dark:text-white font-semibold tracking-wider"
        onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default NoteEditor