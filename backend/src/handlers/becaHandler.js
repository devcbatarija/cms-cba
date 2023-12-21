const express = require('express');
const { getAllBeca,
    addBeca,
    hiddenBeca,
    updateBeca,
    deleteBeca,
    getBeca,
    deleteBecaSelect,
    getFilterBecas } = require('../controllers/becaController');
const { response } = require('../utils')
module.exports = {
    getFilterBecas: async (req, res) => {
        const filters = req.body;
        const result = await getFilterBecas(filters);
        response(res, 200, result);
    },
    getAllBeca: async (req, res) => {
        try {
            const response = await getAllBeca();
            res.status(200).json({
                results: response
            })
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    },
    addBeca: async (req, res) => {
        try {
            const newp = await addBeca(req.body);
            res.status(201).json(newp);
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    },
    hiddenBeca: async (req, res) => {
        try {
            const publication = await hiddenBeca(req.params.id);
            res.status(404).json(publication);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    updateBeca: async (req, res) => {
        try {
            const id = req.params.id;
            const changes = req.body;
            const publication = await updateBeca(id, changes);
            res.status(200).json(publication);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    deleteBeca: async (req, res) => {
        try {
            const publication = await deleteBeca(req.body.ids);
            res.status(200).json(publication);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    getBeca: async (req, res) => {
        try {
            const publication = await getBeca(req.params.id);
            res.status(200).json({
                results: publication
            })
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    deleteBecaSelect: async (req, res) => {
        // console.log(req.body)
        try {
            const result = await deleteBecaSelect(req.body.ids);
            res.status(200).json({ results: result })
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}