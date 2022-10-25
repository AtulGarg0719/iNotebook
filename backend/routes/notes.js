const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');

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



})

module.exports = router