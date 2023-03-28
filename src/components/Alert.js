
function Alert(props){
    const capitalize=(word)=>{
        let text = word.toLowerCase();
        return text[0].toUpperCase() + text.slice(1);
    }
    return( 
        <div style={{height:'50px'}}>
        {props.alert && 
        <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
  <strong>{capitalize(props.alert.type)}</strong> : {props.alert.msg}
</div>}
</div>
    );
}

export default Alert;