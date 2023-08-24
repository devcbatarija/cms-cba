import './App.css'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Home from './components/home/home';
import NavBar from './components/navBar/navBar';
import About from './components/about/about';
import Login from './components/auth/auth.login';
import { useEffect } from 'react';
import Register from './components/auth/auth.register';
import { useSelector } from 'react-redux';
function App() {
  const auth=useSelector((state)=>state.login.auth);
  return (
    <>
    <NavBar/>
      <Routes>
      <Route exact path='/' element={<Home></Home>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      </Routes>
    </>
  )
}

export default App
