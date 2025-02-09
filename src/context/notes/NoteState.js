import React, { useState } from 'react';
import NoteContext from './noteContext';

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const notesInitial = [
    // {
    //   "_id": "67a387b10331769c1bbee8a68",
    //   "user": "67a2175dd572e4a3d8e023e2",
    //   "title": "hello",
    //   "description": "this is nikhillllll",
    //   "tag": "general",
    //   "date": "2025-02-05T15:45:53.239Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "67a387b30317469c1bbee8a6a",
    //   "user": "67a2175dd572e4a3d8e023e2",
    //   "title": "hello",
    //   "description": "this is nikhillllll",
    //   "tag": "general",
    //   "date": "2025-02-05T15:45:55.988Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "67a387b42031769c1bbee8a6c",
    //   "user": "67a2175dd572e4a3d8e023e2",
    //   "title": "hello",
    //   "description": "this is nikhillllll",
    //   "tag": "general",
    //   "date": "2025-02-05T15:45:56.087Z",
    //   "__v": 0
    // },
    // {
    //   "_id": "67a387b4031769c1bbe2e8a6e",
    //   "user": "67a2175dd572e4a3d8e023e2",
    //   "title": "hello",
    //   "description": "this is nikhillllll",
    //   "tag": "general",
    //   "date": "2025-02-05T15:45:56.322Z",
    //   "__v": 0
    // }
  ]

  const [notes, setNotes] = useState(notesInitial);

  // fetch all notes
  const getNotes = async () => {
    // api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhMjE3NWRkNTcyZTRhM2Q4ZTAyM2UyIn0sImlhdCI6MTczODY3NjA2MX0.ULocVmYTFC-RM9eRyCPl5hIPVc6UjGAzSpXp-QqBp7E'
      },
    })
    const json = await response.json();
    console.log(json);
    setNotes(json)
  }

  // Add note
  const addNote = async (title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhMjE3NWRkNTcyZTRhM2Q4ZTAyM2UyIn0sImlhdCI6MTczODY3NjA2MX0.ULocVmYTFC-RM9eRyCPl5hIPVc6UjGAzSpXp-QqBp7E'
      },
      body: JSON.stringify({title, description, tag})
    })

    // adding note logic
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
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhMjE3NWRkNTcyZTRhM2Q4ZTAyM2UyIn0sImlhdCI6MTczODY3NjA2MX0.ULocVmYTFC-RM9eRyCPl5hIPVc6UjGAzSpXp-QqBp7E'
      },
    })
    console.log("Node deleted with id " + id)
    const newNote = notes.filter(note => { return note._id !== id })
    setNotes(newNote);
  }

  // Edit node
  const editNote = async (id, title, description, tag) => {
    // api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdhMjE3NWRkNTcyZTRhM2Q4ZTAyM2UyIn0sImlhdCI6MTczODY3NjA2MX0.ULocVmYTFC-RM9eRyCPl5hIPVc6UjGAzSpXp-QqBp7E'
      },
      body: JSON.stringify({title, description, tag})
    })
    const json = response.json();
    // editing logic
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }
  }



  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState
