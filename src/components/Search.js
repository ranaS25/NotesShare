
import React, {useState} from 'react';

const Search = ({notesArray, setFilteredNotesArray})=>{

    const [searchInputText, setSearchInputText] = useState("");

  return (
    <div className="flex h-fit sticky top-[56px] z-40 justify-center bg-slate-50 dark:bg-slate-700 p-8">
      <div>
        <input
          className=" h-[100%] p-2 bg-slate-100 hover:bg-slate-300 dark:bg-slate-800 outline-none  dark:text-slate-200 "
          type="text"
          size="40"
          placeholder="Grocery List"
          value={searchInputText}
          onChange={(e) => {
            setSearchInputText(e.target.value);
            if (e.target.value.length === 0 && notesArray.length > 0) {
              setFilteredNotesArray(notesArray);
            }
          }}
        />
        <button
          className="px-6 py-4 h-[100%] bg-gray-400 hover:bg-slate-500"
          type="button"
          onClick={() => {
            setFilteredNotesArray(
              notesArray.filter((note) =>
                note.title.toLowerCase().includes(searchInputText.toLowerCase())
              )
            );
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;