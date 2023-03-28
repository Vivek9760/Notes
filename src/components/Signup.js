import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {

    const[credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
    const navigate = useNavigate()
    
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async(e)=>{
      if(credentials.cpassword===credentials.password){
      e.preventDefault();
      let response = await fetch('http://localhost:5000/api/auth/createUser',{
          method:'post',
          headers:{
              "Content-Type":"application/json"
          },
          body:JSON.stringify({name: credentials.name ,email: credentials.email, password:credentials.password})
      });
      response = await response.json()
      if(response.authtoken){
          localStorage.setItem('token',response.authtoken);
          navigate('/');
          props.showAlert("Account crated succefully","success");
      }
      else{
        props.showAlert("Invalid Credentials","danger");
      }}
      else{
        props.showAlert("Passwords not match","danger");
      }
  }

  return (
    <div className="container my-5">
      <h2 >Sign up</h2>
      <form  onSubmit={handleSubmit} >
      <div className="my-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={credentials.name}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={onChange}
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            className="form-control"
            id="exampleInputPassword1"
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            name="cpassword"
            value={credentials.cpassword}
            className="form-control"
            id="exampleInputPassword1"
            onChange={onChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  )
}

export default Signup
