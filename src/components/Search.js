
import React, {useState} from 'react';

const Search = ({notesArray, setFilteredNotesArray})=>{

    const [searchInputText, setSearchInputText] = useState("");

    return (
        <div className="search">
        <input type="text" placeholder="Grocery List" value={searchInputText} onChange={(e)=>{
            setSearchInputText(e.target.value);
            if(e.target.value.length === 0 && notesArray.length>0){
              setFilteredNotesArray(notesArray);
            }
        }}
        onFocus={()=>{
            document.querySelector('.search').style.borderWidth = '2px';
        }}
        onBlur={()=>{
            document.querySelector('.search').style.borderWidth = '1px';
        }}/>
        <button type="button" onClick={()=>{
            setFilteredNotesArray(notesArray.filter(note=>note.title.toLowerCase().includes(searchInputText.toLowerCase())));
        }}>Search</button>

    </div>
    )
}

export default Search;