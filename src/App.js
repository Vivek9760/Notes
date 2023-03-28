import './App.css';
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login  from './components/Login';
import Signup from './components/Signup';
import PrivateComponents from './components/PrivateComponents';

function App() {

  const[alert,setAlert]=useState(null);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    })
      setTimeout(()=>{
       setAlert(null);
      },2000);
}

  return (
    <NoteState>
    <BrowserRouter>
    <Navbar />
    <Alert alert={alert} message="React App" />
    <div className='container'>
    <Routes>
      <Route element={<PrivateComponents />}>
      <Route path='/'  element={<Home showAlert={showAlert} />}/>
      <Route path='/about' element={<About />}/>
      </Route>
      <Route path='/login'  element={<Login showAlert={showAlert} />}/>
      <Route path='/signup'  element={<Signup showAlert={showAlert}/>}/>
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
  );
}

export default App;
