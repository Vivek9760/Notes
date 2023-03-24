const express = require("express");
const { validationResult, body } = require("express-validator");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/notes");
const { findByIdAndUpdate } = require("../models/user");

//Route 1 : get all nodes using : get "api/notes/fetchallnotes. login required"
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

//Route 2 : add a new note using : post "/api/notes/addnote. login required"
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Title must be atleast 3 characters").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // express-validator code for detecting the errors of validation we set .
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }
      const notes = new Notes({ title, description, tag, user: req.user.id });
      const saveNotes = await notes.save();
      res.json(saveNotes);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3 : update an existing node : put "/api/notes/updatenote". login required.

router.put(
  "/updatenote/:id",
  [
    body("title", "Title must be atleast 3 characters").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  fetchUser,
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      let errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
      }

      const newNote = {};
      if (title) newNote.title = title;
      if (description) newNote.description = description;
      if (tag) newNote.tag = tag;
      // console.log(newNote)
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(400).send("not found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }

      note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote });
      res.json({ note });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);



//Route 4 : delete an existing node : delete "/api/notes/deletenote". login required.

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(400).send("not found");
    }
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Sucess: "Note has been deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
