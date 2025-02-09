const express = require('express');
const router = express('router');
var fetchUser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

// Route1 : Get all the notes
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
})

// Route2 : Add a note using POST request /api/notes/addnote Login required
router.post('/addnote', fetchUser, /* expresss validation */[
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 6 characters').isLength({ min: 6 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Notes({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()
        res.json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
})
// Route3 : Updating a note using PUT request /api/notes/updatenote Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    try {
        // create a new note object
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }

        // Find the note to be updated and update it
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not existed");
        }
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not allowed");
        }
        await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
})

// Route4 : Deleting a note using DELETE request /api/notes/deletenote Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        // create a new note object
        // const newNote = {};
        // if (title) { newNote.title = title }
        // if (description) { newNote.description = description }
        // if (tag) { newNote.tag = tag }

        // // Find the note to be deleted and delete it
        // let note = await Notes.findById(req.params.id);
        // if (!note) {
        //     return res.status(404).send("Not existed");
        // }
        // // allow only if user owns this note
        // if (note.user.toString() !== req.user.id) {
        //     return res.status(404).send("Not allowed");
        // }
         await Notes.findByIdAndDelete(req.params.id)
        return res.status(200).send("Successfully deleted");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error");
    }
})

module.exports = router;