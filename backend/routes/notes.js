const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');
const { findById } = require('../models/Notes');

// 1 - Fetch All Notes by get method /api/notes/fetchallnotes

router.get('/fetchallnotes', fetchuser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Some error occur');

  }

});

// 2 - Add All Notes by post mathod /api/notes/addnote

router.post('/addnote', fetchuser, [
  body('title', 'Enter tile Please').isLength({ min: 3 }),
  body('description', 'enter the description').isLength({ min: 5 }),
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
    const savenote = await note.save();
    res.send(savenote);

  } catch (error) {
    console.error(error.message);
    return res.status(500).send('Some error occur');
  }



});

// 3- To update a note by put method /api/notes/updatenote

router.put('/updatenote/:id', fetchuser, [
  body('title', 'Enter tile Please').isLength({ min: 3 }),
  body('description', 'enter the description').isLength({ min: 5 }),
  ], async (req, res) => {
  try {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // creating new note object 
    const newnote = {};
    if(title){newnote.title = title};
    if(description){newnote.description = description};
    if(tag){newnote.tag = tag};

    // find that note which we want to update nd update that

    let note = await Notes.findById(req.params.id);
    if(!note){
      return res.status(404).send("not found");
    }

    // check that user loggedin note or not
    if(note.user.toString() !== req.user.id){
      return res.status(404).send("Accesss your note");
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set: newnote},{new:true})
    res.json({note});

  }
  catch (error) {
    console.error(error.message);
    return res.status(500).send('Some error occur');
  }
  
});

// 4 - To Delete Note by delete Method /api/notes/deletenote

router.delete('/deletenote/:id', fetchuser, async (req, res) => {
  try {
    // find that note which we want to delete nd deleted that

    let note = await Notes.findById(req.params.id);
    if(!note){
      return res.status(404).send("not found");
    }

    // check that user loggedin note or not
    if(note.user.toString() !== req.user.id){
      return res.status(404).send("Accesss your note");
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success:":"Note has beeen deleted",note:note});

  }
  catch (error) {
    console.error(error.message);
    return res.status(500).send('Some error occur');
  }
  
});

module.exports = router