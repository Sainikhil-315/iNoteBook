import NoteItem from './NoteItem';
import Addnote from './Addnote';
import noteContext from '../context/notes/noteContext';
import React, { useContext, useState } from 'react';

const Notes = () => {
    const context = useContext(noteContext);
    // console.log(context);
    const { notes } = context;
    // console.log(notes);
    // console.log(notes);

    return (
        <>
            <Addnote />
            <div>
                <div className="row my-5">
                    <h2>My notes</h2>
                    {notes.map((note) => {
                        return <NoteItem key={note._id} note={note} />
                    })}
                </div>
            </div>
        </>
    )
}

export default Notes
