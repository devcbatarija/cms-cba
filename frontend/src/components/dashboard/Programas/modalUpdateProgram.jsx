import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

export default function ModalUpdate({id,open,handleOpen,handleclose})
{
    const [spinner,setSpinner]=useState(false);
    const [skelet, setSkelet]=useState(true);
    const [form, setForm]=useState({
        nombre:"",
        descripcion:"",
        imagen:"",
        turno:"",
        modalidad:"",
        estado:"",
        UsuarioIdUsuario:""
    });
    const dispatch=useDispatch();
    const handleChange=(e)=>{
        const property =e.target.name;
        const value= e.target.value;
        setForm({
            ...form,
            [property]:value,
        });
    };
    const getById=async ()=>{
        const response=await fetch(`http://localhost/api/programa/delete/${id}`);
        setForm(response.data);
        setSkelet(false);
    };
    const handleSubmit=async (e)=>{
    e.preventDefault();
    try {
        setSpinner(true)
        const response=await axios.put(`programa/update/${id}`,form); 
        setTimeout(() => {
            toa
        }, 1500);
    } catch (error) {
        
    }
    }
}