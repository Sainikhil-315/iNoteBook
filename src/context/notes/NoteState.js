import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {

  const notesInitial = [
    {
      "_id": "67a387b10331769c1bbee8a68",
      "user": "67a2175dd572e4a3d8e023e2",
      "title": "hello",
      "description": "this is nikhillllll",
      "tag": "general",
      "date": "2025-02-05T15:45:53.239Z",
      "__v": 0
    },
    {
      "_id": "67a387b30317469c1bbee8a6a",
      "user": "67a2175dd572e4a3d8e023e2",
      "title": "hello",
      "description": "this is nikhillllll",
      "tag": "general",
      "date": "2025-02-05T15:45:55.988Z",
      "__v": 0
    },
    {
      "_id": "67a387b42031769c1bbee8a6c",
      "user": "67a2175dd572e4a3d8e023e2",
      "title": "hello",
      "description": "this is nikhillllll",
      "tag": "general",
      "date": "2025-02-05T15:45:56.087Z",
      "__v": 0
    },
    {
      "_id": "67a387b4031769c1bbe2e8a6e",
      "user": "67a2175dd572e4a3d8e023e2",
      "title": "hello",
      "description": "this is nikhillllll",
      "tag": "general",
      "date": "2025-02-05T15:45:56.322Z",
      "__v": 0
    }
  ]

  const [ notes, setNotes] = useState(notesInitial);

  // Add note
  const addNote = (title, description, tag) => {
    const note = {
      "_id": "67a387b40331769c1bbe2e8a6e",
      "user": "67a2175dd572e4a3d8e023e2",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2025-02-05T15:45:56.322Z",
      "__v": 0
    }
    setNotes(notes.concat(note))
  }

  //Delete note
  const deleteNote = (id) => {
    console.log("Node deleted with id "+ id)
    const newNote = notes.filter(note => {return note._id !== id})
    setNotes(newNote);
  }

  // Edit node
  const editNote = () => {

  }



  return (
    <NoteContext.Provider value={{notes, addNote, editNote, deleteNote}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
