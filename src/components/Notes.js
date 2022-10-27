import React from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitems from './Noteitems';

function Notes() {
    const context = useContext(noteContext);
  const {notes,setNotes} = context;
    return (
        <div className='row my-3'>
            <h1>Fetch Notes</h1>
            {
                notes.map((note) => {
                    return <Noteitems note={note}/>;
                })
            }
        </div>
    )
}

export default Notes
