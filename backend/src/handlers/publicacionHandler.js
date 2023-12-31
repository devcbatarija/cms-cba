const express = require('express');
const { getAllPublicacion,
    addPublicacion,
    hiddenPublication,
    updatePublication,
    deletePublication,
    getPublication,
    deletePublicationSelect,
    getFilterPublications } = require('../controllers/publicacionController');
const { response } = require('../utils')
module.exports = {
    getFilterPublications: async (req, res) => {
        const filters = req.body;
        const result = await getFilterPublications(filters);
        response(res, 200, result);
    },
    getAllPublicacion: async (req, res) => {
        try {
            const response = await getAllPublicacion();
            res.status(200).json({
                results: response
            })
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    },
    addPublicacion: async (req, res) => {
        try {
            const newp = await addPublicacion(req.body);
            res.status(201).json(newp);
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    },
    hiddenPublication: async (req, res) => {
        try {
            const publication = await hiddenPublication(req.params.id);
            res.status(404).json(publication);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    updatePublication: async (req, res) => {
        try {
            const id = req.params.id;
            const changes = req.body;
            const publication = await updatePublication(id, changes);
            res.status(200).json(publication);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    deletePublication: async (req, res) => {
        try {
            const publication = await deletePublication(req.body.ids);
            res.status(200).json(publication);
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    getPublication: async (req, res) => {
        try {
            const publication = await getPublication(req.params.id);
            res.status(200).json({
                results: publication
            })
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    deletePublicationSelect: async (req, res) => {
        // console.log(req.body)
        try {
            const result = await deletePublicationSelect(req.body.ids);
            res.status(200).json({ results: result })
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}