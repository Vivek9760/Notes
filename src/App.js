import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Navbar from './components/Navbar';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';

function App() {
  return (
    <NoteState>
    <BrowserRouter>
    <Navbar />
    <Alert message="React App" />
    <div className='container'>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/about' element={<About />}/>
    </Routes>
    </div>
    </BrowserRouter>
    </NoteState>
  );
}

export default App;
