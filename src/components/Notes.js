import React, { useContext, useEffect, useRef ,useState} from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import Noteitems from './Noteitems';

function Notes() {
    const context = useContext(noteContext);
    const { notes, getAllNotes,editNote } = context;


    useEffect(() => {
        getAllNotes()
        // eslint-disable-next-line
    }, []);
    
    const [note,setNote] = useState({id: "",etitle:" ",edescription:" ",etag:" "})

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
    }
    const ref = useRef(null);
    const refclose = useRef(null);
    

    const handelSubmit =(e)=>{
        e.preventDefault();
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refclose.current.click();
    }

    const handelInput = (e)=>{
        setNote({...note,[e.target.name]:e.target.value})

    }
    return (
        <>
            <AddNote />
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle'value={note.etitle} onChange={handelInput} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name='edescription'value={note.edescription} onChange={handelInput} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" value={note.etag}name='etag' onChange={handelInput} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref = {refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button onClick={handelSubmit} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='row my-3'>
                <h1>Fetch Notes</h1>
                {
                    notes.map((note) => {
                        return <Noteitems key={note._id} updatenote={updateNote} note={note} />;
                    })
                }
            </div>
        </>
    )
}

export default Notes
