import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';

const Addnote = () => {
    const context = useContext(noteContext);
    // console.log(context);
    const { addNote } = context;
    // console.log(notes);

    const [ note, setNote] = useState({title:"", description:"", tag:"default"})

    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag)
    }

    const handleChange = (e) => {
        setNote({...note, [e.target.name]: e.target.value});
    }

    return (
        <div className="container my-3">
            <h2>Add a note</h2>
            <form className='mt-4'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description' onChange={handleChange} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' onChange={handleChange} />
                </div>
                <button type="submit" className="btn btn-primary my-3" onClick={handleClick}>Add note</button>
            </form>
        </div>
    )
}

export default Addnote
