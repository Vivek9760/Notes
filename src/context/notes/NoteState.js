import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const [notes, setNotes] = useState([]);
    
    //fetch all notes
    const getnotes = async() =>{
        const response = await fetch('http://localhost:5000/api/notes/fetchallnotes',{
            method:'get',
            headers:{
                "Content-Type":"application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxYzg2MDQ4NWNhNzY0N2RlMDU3OTc0In0sImlhdCI6MTY3OTU5MTc3NX0.OeuecmYS_lzXy4pCZml3aRELsy-XYsIYlG2ucQyQstU"
            }
        })
        const json = await response.json();
        setNotes(json)
    }
        
    // Add a note
    const  addnote = async(title, description,tag) => {
        const response = await fetch('http://localhost:5000/api/notes/addnote',{
            method:'post',
            headers:{
                "Content-Type":"application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxYzg2MDQ4NWNhNzY0N2RlMDU3OTc0In0sImlhdCI6MTY3OTU5MTc3NX0.OeuecmYS_lzXy4pCZml3aRELsy-XYsIYlG2ucQyQstU"
            },
            body:JSON.stringify({title, description,tag})
        })
        const json = await response.json();

        setNotes (notes.concat(json))
    }    

    // delete a note
    const  deletenote = async(id) => {
        const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`,{
            method:'delete',
            headers:{
                "Content-Type":"application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxYzg2MDQ4NWNhNzY0N2RlMDU3OTc0In0sImlhdCI6MTY3OTU5MTc3NX0.OeuecmYS_lzXy4pCZml3aRELsy-XYsIYlG2ucQyQstU"
            },
        })
        await response.json();
       const newNotes = notes.filter((i)=>i._id!==id)
        setNotes(newNotes)
    } 

    // edit a note
    const  editnote = async (id, title, description, tag) => {
       
       await fetch(`http://localhost:5000/api/notes/updatenote/${id}`,{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQxYzg2MDQ4NWNhNzY0N2RlMDU3OTc0In0sImlhdCI6MTY3OTU5MTc3NX0.OeuecmYS_lzXy4pCZml3aRELsy-XYsIYlG2ucQyQstU"
            },
            body:JSON.stringify({title, description, tag})
        })
         
        notes.forEach((item,index)=>{
            if(item._id === id){
                item.title=title;
                item.description = description;
                item.tag = tag;
                notes[index]=item
            }
        })
        setNotes([...notes])
    }

    return(
        <NoteContext.Provider value={{notes, addnote, deletenote, getnotes, editnote}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;