import './App.css'
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import NavBar from './components/navBar/navBar';
import About from './components/about/about';
function App() {
  
  return (
    <>
    <NavBar/>
      <Routes>
      <Route exact path='/' element={<Home></Home>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      </Routes>
    </>
  )
}

export default App
