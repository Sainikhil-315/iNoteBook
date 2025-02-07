import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {

    const context = useContext(noteContext);
    // console.log(context);
    const { deleteNote } = context;
    // console.log(notes)

    return (
        <div className='col-md-3 m-4 d-flex'>
            <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{props.note.title}</h5>
                    <p className="card-text">{props.note.description}</p>
                    <div className='d-flex justify-content-between'>
                    <i className='far fa-trash-alt' onClick={() => {deleteNote(props.note._id)}}></i>
                    <i className='far fa-edit'></i>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
