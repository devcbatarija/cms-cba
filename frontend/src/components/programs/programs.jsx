import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { getAllProgram } from '../../redux-toolkit/actions/programActions';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, CardActions, CardHeader, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';



export default function ProgramList() {
    const dispatch = useDispatch()
    const theme = useTheme();
    const [programs, setPrograms] = useState([]);

    const programa = useSelector((state) => state.programs.programs)

    useEffect(() => {
        dispatch(getAllProgram())
    }, []);

    return (
        <>
            <div className='programa' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {programa.map((program, index) => (
                    <>
                    <Typography variant="h4" className="mb-4 text-3xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-6xl" >
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">{program.nombre}</span>
                                </Typography>
                    <Card key={program.id_Programa} sx={{ display: 'flex', flexDirection: index % 2 === 0 ? 'row-reverse' : 'row', width: '80%', margin: '20px auto', boxShadow: 0, transition: '0.3s' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', padding: '10px 20px 0px 20px' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography variant="h5" className="text-2xl font-bold dark:text-white" style={{ textAlign: 'justify' }}>{program.descripcion}</Typography>
                                <Typography variant="h5" className="text-2xl font-bold dark:text-white">Turno: <small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">{program.turno}</small></Typography>
                                <Typography variant="h5" className="text-2xl font-bold dark:text-white">Modalidad: <small className="ml-2 font-semibold text-gray-500 dark:text-gray-400">{program.modalidad}</small></Typography>
                            </CardContent>
                        </Box>
                        <CardMedia
                            component="img"
                            sx={{ width: '50%', boxShadow: '0px 0px 08px rgba(0, 0, 0, 0.2)' }}
                            image={program.imagen}
                            alt={`${program.nombre} album cover`}
                        />
                    </Card>
                    </>

                ))}

            </div>

            <div className='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Card sx={{ display: 'flex', flexDirection: 'row', width: '80%', margin: '20px auto', boxShadow: 0 }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', width: '50%', padding: '10px 20px 0px 20px' }}>
                        <CardHeader
                            title="Horarios disponibles"
                        />
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            {programa.map((program, index) => (
                                <Typography key={program.id_Programa} variant="subtitle1" color="text.secondary" component="div" sx={{ textAlign: 'center' }}>
                                    {program.turno}
                                </Typography>
                            ))}
                        </CardContent>
                    </Box>
                    <CardMedia
                        component="img"
                        sx={{ width: '45%', boxShadow: '0px 0px 08px rgba(0, 0, 0, 0.2)' }}
                        image={"https://www.tapeciarnia.pl/tapety/normalne/91278_trzy_dziewczynki_przyjaciolki_reprodukcja_obrazu.jpg"}
                        alt="Horarios disponibles"
                    />
                </Card>
            </div>


        </>

    );
}
