import './App.css'
import { Route, Routes, useParams } from 'react-router-dom';
import Home from './components/home/home';
import NavBar from './components/navBar/navBar';
import About from './components/about/about';
import DemoApp from './components/Calendar/Calendar';
import { useState } from 'react';
import Calendario from './components/calendar/calendario';
function App() {
  const [a,setA]=useState(true)
  return (
    <>
    <NavBar/>
      <Routes>
      <Route exact path='/' element={<Home></Home>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      <Route path='/calendar' element={<DemoApp></DemoApp>}></Route>
      <Route path='/calendario' element={<Calendario></Calendario>}></Route>
      </Routes>
    </>
  )
}

export default App
