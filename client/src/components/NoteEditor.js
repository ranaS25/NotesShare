import React, { useEffect, useState } from 'react';
import { SERVER_HOST } from '../utils/constants';

const NoteEditor = ({ noteEditorRef, setNoteEditor, noteToEdit = null }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Populate form if editing
  useEffect(() => {
    if (noteToEdit) {
      setTitle(noteToEdit.title || "");
      setDescription(noteToEdit.body || "");
    }
  }, [noteToEdit]);

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        noteEditorRef.current &&
        !noteEditorRef.current.contains(event.target)
      ) {
        setNoteEditor(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();

    if (title.trim() === "" && description.trim() === "") return;

    const url = noteToEdit
      ? `${SERVER_HOST}/notes/${noteToEdit._id}`
      : `${SERVER_HOST}/notes/create`;
    const method = noteToEdit ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ title, body: description }),
      });

      const data = await response.json();
      if (data.success) {
        setNoteEditor(false);
      }
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <div
      ref={noteEditorRef}
      className="flex flex-col fixed w-1/2 h-[70vh] z-50 p-4 my-10 gap-4 top-1/2 left-1/2 transform translate-x-[-50%] translate-y-[-50%] bg-green-50 dark:bg-slate-600 rounded-lg drop-shadow-sm"
    >
      <form className="w-full flex flex-col h-full gap-4" onSubmit={handleSave}>
        <input
          type="text"
          className="py-2 px-4 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="h-full p-4 rounded resize-none"
          placeholder="Empty"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 dark:bg-green-700 p-2 rounded text-white font-semibold tracking-wider"
        >
          {noteToEdit ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default NoteEditor;
