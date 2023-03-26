import { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function AddNote(){
    const context = useContext(NoteContext);
    const{addnote}= context;
    const [note, setNote] = useState({title:"",description:"",tag:"default"})
    const handleClick = (e) => {
        e.preventDefault()
        addnote(note.title,note.description,note.tag)
    }

    const onChange = (e) =>{
        setNote({...note, [e.target.name]:e.target.value})
    }

    return(<div className="container my-5">
    <h1>Add a Note</h1>
    <form>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          id="title"
          onChange={onChange}
          name="title"
          aria-describedby="emailHelp"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="description"
          name="description"
          onChange={onChange}
        />
      </div>
      <div className="mb-3">
      <label htmlFor="tag" className="form-label">
          Tag
        </label>
        <input
          type="text"
          className="form-control"
          id="tag"
          name="tag"
          onChange={onChange}
        />
       
      </div>
      <button type="submit" className="btn btn-primary" onClick={handleClick}>
        Add Note
      </button>
    </form>
  </div>)
}