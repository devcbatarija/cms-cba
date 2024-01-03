const { Beca, Usuario } = require("../db")
const { Op } = require('sequelize');
const dayjs= require('dayjs');

module.exports = {
    getFilterBecas: async (filters) => {
        let whereClause = {};

        if (!filters.allBecas) {
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

        const becas = await Beca.findAll({ where: whereClause });
        const sortedData = [...becas].sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return dateB - dateA;
        });
        return sortedData;
    },
    getAllBeca: async () => {
        try {
            const data = await Beca.findAll({
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
    addBeca: async (p) => {
        try {
            const beca = {
                titulo: p.titulo,
                descripcion: p.descripcion,
                multimedia: p.multimedia,
                estado: p.estado,
                tipo: p.tipo,
                UsuarioIdUsuario: p.UsuarioIdUsuario
            };
            const newBeca = await Beca.create(
                beca
            );
            return newBeca;
        } catch (error) {
            return error;
        }
    },
    hiddenBeca: async (id) => {
        try {
            const beca = await Beca.findByPk(id);
            await beca.update({ estado: false });
            beca.save();
            return beca;
        } catch (error) {
            return error;
        }
    },
    updateBeca: async (id, changes) => {
        try {
            const beca = await Beca.findByPk(id);
            await beca.update(changes);
            beca.save();
            return beca;
        } catch (error) {
            return error;
        }
    },
    deleteBeca: async (id) => {
        console.log(id)
        try {
            const beca = await Beca.findByPk(id);
            Beca.delete(beca);
            return beca;
        } catch (error) {
            return error;
        }
    },
    getBeca: async (id) => {
        try {
            const beca = await Beca.findByPk(id);
            return beca;
        } catch (error) {
            return error;
        }
    },
    deleteBecaSelect: async (pubIds) => {
        console.log(pubIds)
        try {
            for (let id of pubIds) {
                const publi = await Beca.findByPk(id);
                await publi.destroy();
            }
            const remainingPublis = await Beca.findAll();
            return remainingPublis;
        } catch (error) {
            return error;
        }
    }
}