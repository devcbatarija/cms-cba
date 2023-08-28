import './App.css'
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Home from './components/home/home';
import NavBar from './components/navBar/navBar';
import About from './components/about/about';
import Login from './components/auth/auth.login';
import { useEffect } from 'react';
import Register from './components/auth/auth.register';
import { useDispatch, useSelector } from 'react-redux';
import Cookie from 'js-cookie';
import axios from 'axios';
import { authValid } from './redux-toolkit/actions/auth.Actions';
import Dashboard from './components/dashboard/dashboard'

function App() {
  const auth=useSelector((state)=>state.login.auth);
  const dispatch=useDispatch();
  const validToken=async()=>{
    const token=Cookie.get('token');
    const config={
      headers:{
        Authorization:`Bearer ${token}`,
      }
    }
    const data={
      validation:"Validation"
    }
    try {
      const response=await axios.post('/users/valid/token',data,config)
      if(response.data.user){
        dispatch(
          authValid(response.data.user)
        )
      }
    } catch (error) {
      console.log(error.response.data.messageError)
    }
  }
  useEffect(() => {
      if(Cookie.get('token')){
        validToken()
      }
  },[])
  return (
    <>
    <NavBar/>
      <Routes>
      <Route exact path='/' element={<Home></Home>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>
      <Route path='/register' element={<Register></Register>}></Route>
      <Route path='/dashboard' element={<Dashboard></Dashboard>}></Route>
      </Routes>
    </>
  )
}

export default App
