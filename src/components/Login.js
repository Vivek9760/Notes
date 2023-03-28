import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const[credentials, setCredentials] = useState({email:"",password:""});

    const navigate = useNavigate()
  

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
      };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        let response = await fetch('http://localhost:5000/api/auth/login',{
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({email: credentials.email, password:credentials.password})
        });
        response = await response.json()
        if(response.authtoken){
            localStorage.setItem('token',response.authtoken);
            navigate('/');
        }
        else{
alert("invalid")
        }
    }

  return (
    <div className="container my-5">
      <form  onSubmit={handleSubmit} >
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
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
