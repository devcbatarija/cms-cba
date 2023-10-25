const { Publicacion, Usuario } = require("../db")
const { Op } = require('sequelize');
const dayjs= require('dayjs');

module.exports = {
    getFilterPublications: async (filters) => {
        let whereClause = {};

        if (!filters.allPublications) {
            // Si el filtro de año está activado
            if (filters.year.state) {
                let startYear = dayjs().year(filters.year.year).startOf('year'); // Primer día del año
                let endYear = startYear.endOf('year'); // Primer día del siguiente año
            
                // Si el filtro de mes está activado
                if (filters.month.state) {
                    startYear = startYear.month(filters.month.month - 1); // Primer día del mes
                    endYear = startYear.endOf('month') // Primer día del siguiente mes
            
                    // Si el filtro de día está activado
                    if (filters.day.state) {
                        startYear = startYear.date(filters.day.day); // El día específico
                        endYear = startYear.endOf('day'); // El día siguiente
                    }
                }
            
                whereClause.createdAt = {
                    [Op.between]: [startYear.format(), endYear.format()]
                };
            }
            
        }

        const publications = await Publicacion.findAll({ where: whereClause });
        const sortedData = [...publications].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA;
        });
        return sortedData;
    },
    getAllPublicacion: async () => {
        try {
            const data = await Publicacion.findAll({
                include: [{
                    model: Usuario,

                }]
            });
            const sortedData = [...data].sort((a, b) => {
                const dateA = new Date(a.createdAt);
                const dateB = new Date(b.createdAt);
                return dateB - dateA;
            });
            return sortedData;
        } catch (error) {
            return error;
        }
    },
    addPublicacion: async (p) => {
        try {
            const publication = {
                titulo: p.titulo,
                descripcion: p.descripcion,
                multimedia: p.multimedia,
                estado: p.estado,
                tipo: p.tipo,
                UsuarioIdUsuario: p.UsuarioIdUsuario
            };
            const newPublication = await Publicacion.create(
                publication
            );
            return newPublication;
        } catch (error) {
            return error;
        }
    },
    hiddenPublication: async (id) => {
        try {
            const publication = await Publicacion.findByPk(id);
            await publication.update({ estado: false });
            publication.save();
            return publication;
        } catch (error) {
            return error;
        }
    },
    updatePublication: async (id, changes) => {
        try {
            const publication = await Publicacion.findByPk(id);
            await publication.update(changes);
            publication.save();
            return publication;
        } catch (error) {
            return error;
        }
    },
    deletePublication: async (id) => {
        console.log(id)
        try {
            const publication = await Publicacion.findByPk(id);
            Publicacion.delete(publication);
            return publication;
        } catch (error) {
            return error;
        }
    },
    getPublication: async (id) => {
        try {
            const publication = await Publicacion.findByPk(id);
            return publication;
        } catch (error) {
            return error;
        }
    },
    deletePublicationSelect: async (pubIds) => {
        console.log(pubIds)
        try {
            for (let id of pubIds) {
                const publi = await Publicacion.findByPk(id);
                await publi.destroy();
            }
            const remainingPublis = await Publicacion.findAll();
            return remainingPublis;
        } catch (error) {
            return error;
        }
    }
}