import React from 'react'

function Noteitems(props) {
    const { note } = props;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">{note.tag}</h6>
                    <p className="card-text">{note.description}.</p>
                    <i class="fa-solid fa-pen-to-square mx-2"></i>
                    <i class="fa-solid fa-trash-can mx-2"></i>
                </div>
            </div>
        </div>
    )
}

export default Noteitems
