import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom"
import {Signup} from "./components/pages/Signup"
import {Login} from "./components/pages/Login"
import { Home } from './components/Home/Home';
import { Navbar } from './components/pages/Navbar';
import { Student } from './components/pages/student/Student';
import { Editstudent } from './components/pages/student/Editstudent';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/student' element={<Student/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/edit/:id' element={<Editstudent/>}/>
      </Routes>
    </div>
  );
}

export default App;
