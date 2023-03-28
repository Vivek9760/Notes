import { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function AddNote(props){
    const context = useContext(NoteContext);
    const{addnote}= context;
    const [note, setNote] = useState({title:"",description:"",tag:""})
    const handleClick = (e) => {
        e.preventDefault()
        addnote(note.title,note.description,(note.tag).length===0?'...':note.tag)
        setNote({title:"",description:"",tag:""})
        props.showAlert("Note added Successfully","success")

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
          value={note.title}
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
          value={note.description}
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
          value={note.tag}
          onChange={onChange}
        />
       
      </div>
      <button type="submit" disabled={(note.title).length<=3 || (note.description).length<=5} className="btn btn-primary" onClick={handleClick}>
        Add Note
      </button>
    </form>
  </div>)
}