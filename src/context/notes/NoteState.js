import { useState } from "react";
import NoteContext from "./NoteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
            "_id": "641e05151bf19040f5a16fb8",
            "user": "641c860485ca7647de057974",
            "title": "my title",
            "description": "Wake up early in the morning",
            "tag": "aim",
            "__v": 0
        },
        {
            "_id": "641e05161bf19040f5a16fba",
            "user": "641c860485ca7647de057974",
            "title": "my title",
            "description": "Wake up early in the morning",
            "tag": "aim",
            "__v": 0
        },
        {
            "_id": "641e05161bf19040f5a16fba",
            "user": "641c860485ca7647de057974",
            "title": "my title",
            "description": "Wake up early in the morning",
            "tag": "aim",
            "__v": 0
        },
        {
            "_id": "641e05161bf19040f5a16fba",
            "user": "641c860485ca7647de057974",
            "title": "my title",
            "description": "Wake up early in the morning",
            "tag": "aim",
            "__v": 0
        },
        {
            "_id": "641e05161bf19040f5a16fba",
            "user": "641c860485ca7647de057974",
            "title": "my title",
            "description": "Wake up early in the morning",
            "tag": "aim",
            "__v": 0
        },
        {
            "_id": "641e05161bf19040f5a16fba",
            "user": "641c860485ca7647de057974",
            "title": "my title",
            "description": "Wake up early in the morning",
            "tag": "aim",
            "__v": 0
        },
        {
            "_id": "641e05161bf19040f5a16fba",
            "user": "641c860485ca7647de057974",
            "title": "my title",
            "description": "Wake up early in the morning",
            "tag": "aim",
            "__v": 0
        },
        {
            "_id": "641e05161bf19040f5a16fba",
            "user": "641c860485ca7647de057974",
            "title": "my title",
            "description": "Wake up early in the morning",
            "tag": "aim",
            "__v": 0
        },
        {
            "_id": "641e05161bf19040f5a16fba",
            "user": "641c860485ca7647de057974",
            "title": "my title",
            "description": "Wake up early in the morning",
            "tag": "aim",
            "__v": 0
        },
        {
            "_id": "641e05161bf19040f5a16fba",
            "user": "641c860485ca7647de057974",
            "title": "my title",
            "description": "Wake up early in the morning",
            "tag": "aim",
            "__v": 0
        },
        {
            "_id": "641e05161bf19040f5a16fba",
            "user": "641c860485ca7647de057974",
            "title": "my title",
            "description": "Wake up early in the morning",
            "tag": "aim",
            "__v": 0
        }
    ]

    const [notes, setNotes] = useState(notesInitial);

    return(
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}


export default NoteState;