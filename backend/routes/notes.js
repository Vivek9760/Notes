const express = require("express");
const { validationResult, body } = require("express-validator");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/notes");

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
        return res.status(400).json({ error: error.array() });
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

module.exports = router;
