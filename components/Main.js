import React, { useState, useEffect }  from 'react';

import Shimmer from './Shimmer.js';
import Search from './Search.js';


const Main = ()=>{

    const [notesArray, setNotesArray] = useState([]);
    const [filteredNotesArray, setFilteredNotesArray] = useState(notesArray);
    
    useEffect(()=>{
        fetchData();   
    }, []);

    const fetchData = async()=>{
        const response = await fetch(`http://localhost:3000/notes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Userid: JSON.parse(sessionStorage.getItem("user")).userId,
            Userpassword: JSON.parse(sessionStorage.getItem("user")).password
          },
        });
        console.log("this line")
        const notesjsonArr = await response.json();
        
        //29-06-2024

        setNotesArray(notesjsonArr);
        setFilteredNotesArray(notesjsonArr); 
    }
    
    if(notesArray.length<1){
        return(         
            <div className="notes-container"> <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            <Shimmer />
            </div>)
    
        ;
   
}
    // console.log(notesArray);
    return (
        <>
        <Search notesArray={notesArray}  setFilteredNotesArray = {setFilteredNotesArray} />
        <div className="notes-container">
            {
                
                filteredNotesArray.map((note)=>{
                    return (<div className='note' key={note.id}>
                        <h2>{note.title}</h2>
                        <p>{note.description}</p>
                        </div>)
                })
            }
        </div>
        </>
    )
}
export default Main;