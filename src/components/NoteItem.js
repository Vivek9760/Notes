export default function NoteItem(props){

    const {note} = props
    return(
    <div className="card mx-2 my-2" style={{width:"12rem"}} >
    <div className="card-body">
      <h5 className="card-title">{note.title}</h5>
      <p className="card-text">{note.description}</p>
    </div>
  </div> 
   )
}