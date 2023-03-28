import { DriveFileRenameOutline, Delete } from '@mui/icons-material';
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function NoteItem(props){

    const {note, updateNote} = props;
    const context = useContext(NoteContext);
    const{deletenote}= context;
    
    return(
    <div className="card mx-2 my-2" style={{maxWidth:"25vw"}} >
    <div className="card-body">
        <div className="d-flex align-items-center">
      <h5 className="card-title me-2" style={{width:"10vw"}}>{note.title}</h5>
      <Delete titleAccess='delete' onClick={()=>{deletenote(note._id); 
        props.showAlert("Deleted Successfully","success");
      }} sx={{cursor:'pointer'}}/>
    <DriveFileRenameOutline onClick={()=>{updateNote(note)}}  titleAccess='edit' sx={{cursor:'pointer',}} />
        </div>
      <p className="card-text" >{note.description}</p>
    </div>
    <p>{note.tag}</p>
  </div> 
   )
}
