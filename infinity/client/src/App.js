import logo from './logo.svg';
import './App.css';
import {Route, Routes} from "react-router-dom"
import {Signup} from "./components/pages/Signup"
import {Login} from "./components/pages/Login"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
