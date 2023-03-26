import { DriveFileRenameOutline, Delete } from '@mui/icons-material';
import { useContext } from "react";
import NoteContext from "../context/notes/NoteContext";

export default function NoteItem(props){

    const {note} = props;
    const context = useContext(NoteContext);
    const{deletenote}= context;
    
    return(
    <div className="card mx-2 my-2" style={{width:"12rem"}} >
    <div className="card-body">
        <div className="d-flex align-items-center">
      <h5 className="card-title mx-1">{note.title}</h5>
      <Delete titleAccess='delete' onClick={()=>{deletenote(note._id)}} sx={{cursor:'pointer'}}/>
    <DriveFileRenameOutline titleAccess='edit' sx={{cursor:'pointer',}} />
        </div>
      <p className="card-text" >{note.description}</p>
    </div>
    <p>{note.tag}</p>
  </div> 
   )
}
