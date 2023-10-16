const express = require('express');
const { obtenerTodosLosProgramasPrecios, 
    crearProgramaPrecios, actualizarProgramaPrecios,
     eliminarProgramaPrecios } = require('../controllers/programPriceController');

module.exports = {
    obtenerTodosLosProgramasPrecios: async (req, res) => {
        try {
            const response = await obtenerTodosLosProgramasPrecios();
            res.status(200).json({
                results: response
            })
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    },
    crearProgramaPrecios: async (req, res) => {
        try {
            const newp = await crearProgramaPrecios(req.body);
            res.status(201).json(newp);
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    },
    actualizarProgramaPrecios: async (req, res, next) => {
        try {
            const { id } = req.query;
            if (!id) {
                res.status(200).json({ message: id });
                next()
            }
            const changes = req.body;
            const programPrice = await actualizarProgramaPrecios(id, changes);
            res.status(200).json(programPrice);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    eliminarProgramaPrecios: async (req, res) => {
        try {
            const programPrice = await eliminarProgramaPrecios(req.body.ids);
            res.status(200).json(programPrice);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}