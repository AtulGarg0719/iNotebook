import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000';
    const notesInitial = []
    const [notes,setNotes] = useState(notesInitial);

    // Get All Notes Of a user
    const getAllNotes = async()=>{
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        const json = await response.json();
        setNotes(json);
    }

    // Add a Note
    const addNote = async (title,description,tag)=>{
        // Api calling
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
        });
        const note = await response.json();
        setNotes(notes.concat(note));
    }

    //Edit a Note
    const editNote = async (id,title,description,tag)=>{
        // Api calling
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
        });
        const json = await response.json();
        console.log(json);

        //Logic

        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                newNotes[index].title=title;
                newNotes[index].description=description;
                newNotes[index].tag=tag;
                break;
            }
            
        }
        setNotes(newNotes);
    }

    // Delete a Note
    const deleteNote = async (id)=>{

        // Api calling
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
              'Content-Type': 'application/json',
              'auth-token':localStorage.getItem('token')
              // 'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

       const newnote = notes.filter((note)=>{return note._id !== id})

        setNotes(newnote);
        console.log("Deleting a note of id : "+id);
        
    }

    
    return (
        <NoteContext.Provider value={{notes,getAllNotes,addNote,editNote,deleteNote}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;