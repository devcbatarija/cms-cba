import * as React from 'react';
import { styled } from '@mui/material/styles';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';


const Android12Switch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    '&:before, &:after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&:before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&:after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        theme.palette.getContrastText(theme.palette.primary.main),
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));
const  CustomizedSwitches=({id,userestado})=>{
  const [estado,setEstado]=useState(userestado);
  const [data,setData]=useState({});
  const getbyid=async()=>{
    try {
      const response=await axios.get(`/get/by/${id}`);
      console.log(response)
    } catch (error) {
      
    }
  }
  const updatePromise=()=>{
    return new Promise(async(resolve,reject)=>{
      try {
        await setEstado(!estado)
        resolve("a")
      } catch (error) {
        reject("b")
      }
    })
  }
  const handleClicked=async(e)=>{
    updatePromise()
    .then(()=>{
      console.log(estado)
      axios.put(`/users/state/update/${id}`,{estado:estado})
      .then((response)=>{
        console.log(response)
      })
    })
  }
  useEffect(()=>{
    getbyid()
  },[])
  return (
    <FormGroup>
      <FormControlLabel
        onClick={handleClicked}
        control={<Android12Switch checked={estado} />}
        label={estado?"True":"False"}
      />
    </FormGroup>
  );
}
export default CustomizedSwitches