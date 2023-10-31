import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, Button, TextField, Box, Typography } from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProgramaPrecios = () => {
    const [campos, setCampos] = useState([]);
    const [filas, setFilas] = useState([]);
    const [nuevoCampoNombre, setNuevoCampoNombre] = useState('');
    const [nuevoCampoTipo, setNuevoCampoTipo] = useState('texto');
    const [programas, setProgramas] = useState([]);
    const [programaSeleccionado, setProgramaSeleccionado] = useState({ idPrograma: '' });

    // Función para actualizar los campos y filas basándose en el objeto pasado como argumento
    const updateColsRows = (obj) => {
        if (obj.ProgramPrice) {
            setCampos(obj.ProgramPrice.columns);
            setFilas(obj.ProgramPrice.rows);
        } else {
            setCampos([]);
            setFilas([]);
        }
    }

    // Efecto que se ejecuta una vez al cargar el componente para obtener la lista de programas
    useEffect(() => {
        axios.get('http://localhost:3001/api/Program')
            .then(response => {
                setProgramas(response.data.results);
            })
            .catch(error => {
            });
    }, []);

    const agregarCampo = (e) => {
        e.preventDefault();
        if (nuevoCampoNombre && nuevoCampoTipo) {
            setCampos([...campos, nuevoCampoNombre]);
            const nuevasFilas = filas.map((fila) => [...fila, '']);
            setFilas(nuevasFilas);
            setNuevoCampoNombre('');
            setNuevoCampoTipo('texto');
        } else {

        }
    };

    // Función para agregar una nueva fila
    const agregarFila = () => {
        const nuevaFila = new Array(campos.length).fill('');
        setFilas([...filas, nuevaFila]);
    };

    // Función para modificar un dato en una fila y columna específicas
    const modificarDato = (filaIndice, campoIndice, valor) => {
        const nuevasFilas = [...filas];
        nuevasFilas[filaIndice][campoIndice] = valor;
        setFilas(nuevasFilas);
    };

    // Función para eliminar una fila específica
    const eliminarFila = (filaIndice) => {
        const nuevasFilas = filas.filter((_, index) => index !== filaIndice);
        setFilas(nuevasFilas);
    };
    // Función para eliminar una columna específica
    const eliminarColumna = (campoIndice) => {
        const nuevasColumnas = campos.filter((_, index) => index !== campoIndice);
        const nuevasFilas = filas.map((fila) => fila.filter((_, index) => index !== campoIndice));
        setCampos(nuevasColumnas);
        setFilas(nuevasFilas);
    };

    //Función para guardar los datos en el servidor
    const guardarDatos = async () => {
        try {
            const datos = {
                columns: campos,
                rows: filas,
                ProgramaIdPrograma: programaSeleccionado.idPrograma
            };
            let response;
            if (programaSeleccionado.ProgramPrice != null) {
                response = await axios.put(`http://localhost:3001/api/ProgramPrices/?id=${programaSeleccionado.ProgramPrice.id_Programa}`, datos);
            } else {
                response = await axios.post('http://localhost:3001/api/ProgramPrices/add', datos);
            }
            alert('Guardado exitosamente');
        } catch (error) {
            console.error('Error:', error);
            alert('Error al guardar los datos');
        }
    };


    // Función para filtrar el programa seleccionado y actualizar campos y filas
    const filterProgram = async (id) => {
        const selected = programas.find((pr) => pr.idPrograma == id);
        setProgramaSeleccionado(selected);
        updateColsRows(selected);
    };

    return (
        <TableContainer
            component={Paper}
            sx={{ width: "100%", borderRadius: "0", height: "100vh", overflow: "auto" }}
        >
            <Box sx={{ p: 4 }} className="container mx-auto">
                <Typography variant="p" gutterBottom component="div">
                    Selecciona el programa para agregar los costos
                </Typography>
                <Select
                    variant="outlined"
                    value={programaSeleccionado.idPrograma}
                    onChange={(e) => filterProgram(e.target.value)}
                    sx={{ width: "100%", mb: 2, maxWidth: 360 }}
                    className="border p-2 w-full sm:w-1/3"
                >
                    <MenuItem value="">Selecciona un programa</MenuItem>
                    {programas.map((programa) => (
                        <MenuItem key={programa.idPrograma} value={programa.idPrograma}>
                            {programa.nombre}
                        </MenuItem>
                    ))}
                </Select>
                <form onSubmit={agregarCampo} className="mb-4">
                    <Box sx={{ mb: 4, display: "flex", flexDirection: { xs: "column", sm: "row" } }} className="mb-4 flex flex-col sm:flex-row">
                        <TextField
                            variant="outlined"
                            placeholder="Nombre del Campo"
                            value={nuevoCampoNombre}
                            onChange={(e) => setNuevoCampoNombre(e.target.value)}
                            sx={{ mb: { xs: 2, sm: 0 }, mr: { sm: 2 }, flexGrow: 1 }}
                            className="border p-2 mb-2 sm:mb-0 sm:mr-2 w-full sm:w-1/3"
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={agregarCampo}
                            className="bg-blue-500 text-white py-2 px-4 ml-2 rounded hover:bg-blue-700"
                        >
                            Agregar Campo
                        </Button>
                    </Box>
                </form>
                <Table className="table-auto w-full">
                    <TableHead className="uppercase">
                        <TableRow>
                            {campos.map((campo, indice) => (
                                <TableCell key={indice} sx={{ position: "relative", fontWeight: "bold" }}>
                                    {campo}
                                    <Button
                                        onClick={() => eliminarColumna(indice)}
                                        color="error"
                                        sx={{ position: "absolute", right: 0, top: 0, mt: 1, mr: 1, fontSize: "0.75rem", color: "error.main" }}
                                        className="absolute right-0 top-0 mt-1 mr-1 text-xs text-red-500 cursor-pointer"
                                    >
                                        <strong>Quitar</strong>
                                    </Button>
                                </TableCell>
                            ))}
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {filas.map((fila, filaIndice) => (
                            <TableRow key={filaIndice}>
                                {fila.map((dato, index) => (
                                    <TableCell key={index}>
                                        <TextField
                                            variant="outlined"
                                            type={campos[index].tipo === "numero" ? "number" : "text"}
                                            value={dato}
                                            onChange={(e) => modificarDato(filaIndice, index, e.target.value)}
                                            fullWidth
                                            className="w-full"
                                        />
                                    </TableCell>
                                ))}
                                <TableCell>
                                    <Button onClick={() => eliminarFila(filaIndice)} color="error" className="text-red-500">
                                        Eliminar Fila
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Button
                    onClick={agregarFila}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 4 }}
                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
                    Agregar Fila
                </Button>
                <Button
                    onClick={guardarDatos}
                    variant="contained"
                    color="error"
                    sx={{ mt: 4, ml: 2 }}
                    className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">
                    Guardar todo
                </Button>
            </Box>
        </TableContainer>
    );
};

export default ProgramaPrecios;