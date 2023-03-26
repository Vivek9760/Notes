import { useContext, useEffect } from "react";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";

export default function Notes(){
    
    const context = useContext(NoteContext);
    const{notes,addnote,getnotes}= context;
    useEffect(()=>{
        getnotes()
    },[])
    return(
        <>
        <AddNote />
        <div className="row">
        <h2>Your notes</h2>
        {
            notes.map((note)=>{
                return <NoteItem key={note._id} note={note} />
            })
        }
        </div>
        </>
    )

}