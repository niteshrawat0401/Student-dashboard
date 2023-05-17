import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom"
import {Signup} from "./components/pages/Signup"
import {Login} from "./components/pages/Login"
import { Home } from './components/Home/Home';
import { Navbar } from './components/pages/Navbar';
import { Student } from './components/pages/student/Student';
import { Editstudent } from './components/pages/student/Editstudent';
import { StudentDetail } from './components/pages/student/StudentDetail';
import {Quicknotes} from './components/pages/Quicknotes/Quicknotes';
import { Addquicknotes } from './components/pages/Quicknotes/Addquicknotes';
import  ScssFile  from './components/pages/ScssFile';
import { PrivateRoute } from './components/pages/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/student' element={
        <PrivateRoute>
        <Student/>
        </PrivateRoute>
        }/>
        
        <Route path='/home' element={<Home/>}/>
        <Route path='/edit/:id' element={<Editstudent/>}/>
        <Route path='/detail/:id' element={<StudentDetail/>}/>
        <Route path='/detail/:id' element={<StudentDetail/>}/>
        <Route path='/quicknotes' element={<Quicknotes/>}/>
        <Route path='/addquicknotes' element={<Addquicknotes/>}/>

      </Routes>
      {/* <ScssFile/> */}
    </div>
  );
}

export default App;
