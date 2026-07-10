const { Visita } = require('../db');
const { Op, fn, col } = require('sequelize');

async function registrarVisita(req, res) {
  try {
    await Visita.create({ ruta: req.body.ruta });
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error('Error registrando visita:', err.message);
    res.status(500).json({ error: 'Error registrando visita' });
  }
}

async function getInteracciones(req, res) {
  try {
    const inicioHoy = new Date();
    inicioHoy.setHours(0, 0, 0, 0);

    const visitasHoy = await Visita.count({
      where: {
        fecha: { [Op.gte]: inicioHoy },
      },
    });

    res.json({ visitasHoy });
  } catch (err) {
    console.error('Error obteniendo interacciones:', err.message);
    res.status(500).json({ error: 'Error obteniendo interacciones' });
  }
}

// NUEVO: visitas agrupadas por día, para el gráfico de tendencia
async function getVisitasPorDia(req, res) {
  try {
    const dias = parseInt(req.query.dias) || 14;

    const desde = new Date();
    desde.setDate(desde.getDate() - (dias - 1));
    desde.setHours(0, 0, 0, 0);

    const resultados = await Visita.findAll({
      attributes: [
        [fn('DATE', col('fecha')), 'dia'],
        [fn('COUNT', col('fecha')), 'cantidad'],
      ],
      where: {
        fecha: { [Op.gte]: desde },
      },
      group: [fn('DATE', col('fecha'))],
      order: [[fn('DATE', col('fecha')), 'ASC']],
      raw: true,
    });

    // rellenamos los días sin visitas con 0, para que el gráfico no tenga huecos
    const mapaResultados = {};
    resultados.forEach((r) => {
      const key = new Date(r.dia).toISOString().split('T')[0];
      mapaResultados[key] = parseInt(r.cantidad);
    });

    const data = [];
    for (let i = 0; i < dias; i++) {
      const fecha = new Date(desde);
      fecha.setDate(fecha.getDate() + i);
      const key = fecha.toISOString().split('T')[0];
      data.push({
        fecha: key,
        label: fecha.toLocaleDateString('es-BO', { day: '2-digit', month: 'short' }),
        visitas: mapaResultados[key] || 0,
      });
    }

    res.json({ data });
  } catch (err) {
    console.error('Error obteniendo visitas por día:', err.message);
    res.status(500).json({ error: 'Error obteniendo visitas por día' });
  }
}

module.exports = { getInteracciones, registrarVisita, getVisitasPorDia };