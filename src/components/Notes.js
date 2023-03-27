import { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, getnotes, editnote } = context;
  const [note, setNote] = useState({ id:"",etitle: "", edescription: "sv", etag: "..." });

  useEffect(() => {
    getnotes();
  }, []);

  
  const handleClick = (e) => {
    // e.preventDefault();
    // console.log(note);
    editnote(note.id, note.etitle, note.edescription, (note.etag).length===0?'...':note.etag);
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const updateNote = (cNote) => {
    ref.current.click();
    // console.log(cNote)
    setNote({id:cNote._id,
        etitle:cNote.title,
        edescription:cNote.description,
        etag:cNote.tag})
  };

  const ref = useRef(null);

  return (
    <>
      <AddNote />
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      >
        edit note
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
      <div className="mb-3">
        <label htmlFor="etitle" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          value={note.etitle}
          id="etitle"
          onChange={onChange}
          name="etitle"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="edescription" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="edescription"
          value={note.edescription}
          name="edescription"
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
      <label htmlFor="etag" className="form-label">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          id="etag"
          value={note.etag}
          name="etag"
          onChange={onChange}
        />
       
      </div>
    </form>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" disabled={(note.etitle).length<=3 || (note.edescription).length<=5} onClick={handleClick} className="btn btn-primary" data-bs-dismiss="modal">Update Note</button>
      </div>
    </div>
  </div>
</div>
      <div className="row">
        <h2>Your notes</h2>
        {(notes.length<=0)?
            <h6>No Notes Available</h6>
        :notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
        
      </div>
    </>
  );
}
