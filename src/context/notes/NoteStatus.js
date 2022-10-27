import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [{
        "_id": "635672032107ba7d3077e473",
        "user": "635671c52107ba7d3077e470",
        "title": "first note",
        "description": "first note by atul user",
        "tag": "persnoal",
        "timestamp": "2022-10-24T11:07:47.300Z",
        "__v": 0
    },
    {
        "_id": "6358bfe3af9aa75ec76b122e",
        "user": "635671c52107ba7d3077e470",
        "title": "second note",
        "description": "second note by atul user",
        "tag": "persnoal",
        "timestamp": "2022-10-26T05:04:35.539Z",
        "__v": 0
    },
    {
        "_id": "6358bfe3af9aa75ec76b122e",
        "user": "635671c52107ba7d3077e470",
        "title": "second note",
        "description": "second note by atul user",
        "tag": "persnoal",
        "timestamp": "2022-10-26T05:04:35.539Z",
        "__v": 0
    },
    {
        "_id": "6358bfe3af9aa75ec76b122e",
        "user": "635671c52107ba7d3077e470",
        "title": "second note",
        "description": "second note by atul user",
        "tag": "persnoal",
        "timestamp": "2022-10-26T05:04:35.539Z",
        "__v": 0
    },
    {
        "_id": "6358bfe3af9aa75ec76b122e",
        "user": "635671c52107ba7d3077e470",
        "title": "second note",
        "description": "second note by atul user",
        "tag": "persnoal",
        "timestamp": "2022-10-26T05:04:35.539Z",
        "__v": 0
    },
    {
        "_id": "6358bfe3af9aa75ec76b122e",
        "user": "635671c52107ba7d3077e470",
        "title": "second note",
        "description": "second note by atul user",
        "tag": "persnoal",
        "timestamp": "2022-10-26T05:04:35.539Z",
        "__v": 0
    },
    {
        "_id": "6358bfe3af9aa75ec76b122e",
        "user": "635671c52107ba7d3077e470",
        "title": "second note",
        "description": "second note by atul user",
        "tag": "persnoal",
        "timestamp": "2022-10-26T05:04:35.539Z",
        "__v": 0
    },
    {
        "_id": "6358bfe3af9aa75ec76b122e",
        "user": "635671c52107ba7d3077e470",
        "title": "second note",
        "description": "second note by atul user",
        "tag": "persnoal",
        "timestamp": "2022-10-26T05:04:35.539Z",
        "__v": 0
    },
]
    const [notes,setNotes] = useState(notesInitial);
    
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;