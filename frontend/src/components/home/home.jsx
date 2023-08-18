import { useEffect,useState } from "react";
import { useDispatch } from "react-redux";
import { test } from "../../redux-toolkit/actions/testActions";
import NavBar from "../navBar/navBar";

const Home = () => {
    const dispatch=useDispatch();
    const data=()=>{
        dispatch(
            test()
        )
    }
    return ( 
        <>
            <h1>Data</h1>
            <button onClick={data}  >llamar</button>
        </>
     );
}
 
export default Home;