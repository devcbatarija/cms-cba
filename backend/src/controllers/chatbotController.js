/**
 * chatbotController.js
 *
 * Sigue el mismo patrón que el resto de controllers del proyecto:
 * recibe el request, valida lo mínimo, delega la lógica al handler
 * y devuelve la respuesta HTTP.
 *
 * NOTA: este controller usa try/catch "a mano". Si en tu proyecto ya
 * tienes un wrapper como catchedAsync.js o un formato fijo en response.js /
 * resError.js, compárteme un controller existente (ej. testimoniosController.js)
 * y lo adapto exactamente a ese estilo.
 */

const {
  buscarRespuesta,
  obtenerRespuestaPorId,
  obtenerSaludoInicial,
} = require('../handlers/chatbotHandler');

/**
 * GET /api/chatbot/saludo
 * Devuelve el mensaje de bienvenida + sugerencias iniciales.
 * Se llama una sola vez, cuando el usuario abre el widget por primera vez.
 */
const obtenerSaludo = async (req, res) => {
  try {
    const data = obtenerSaludoInicial();
    return res.status(200).json({ ok: true, data });
  } catch (error) {
    console.error('[chatbotController] Error en obtenerSaludo:', error);
    return res.status(500).json({
      ok: false,
      mensaje: 'No se pudo iniciar el asistente virtual.',
    });
  }
};

/**
 * POST /api/chatbot/consulta
 * Body: { mensaje: string }
 * Busca la mejor respuesta para el mensaje libre del usuario.
 */
const responderConsulta = async (req, res) => {
  try {
    const { mensaje } = req.body;

    if (!mensaje || typeof mensaje !== 'string' || !mensaje.trim()) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El campo "mensaje" es requerido.',
      });
    }

    const resultado = buscarRespuesta(mensaje.trim());
    return res.status(200).json({ ok: true, data: resultado });
  } catch (error) {
    console.error('[chatbotController] Error en responderConsulta:', error);
    return res.status(500).json({
      ok: false,
      mensaje: 'Ocurrió un error al procesar tu consulta.',
    });
  }
};

/**
 * POST /api/chatbot/sugerencia
 * Body: { id: string }
 * Devuelve la respuesta asociada a un chip/sugerencia que el usuario tocó
 * (evita volver a correr la búsqueda por palabras clave).
 */
const responderSugerencia = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id || typeof id !== 'string') {
      return res.status(400).json({
        ok: false,
        mensaje: 'El campo "id" es requerido.',
      });
    }

    const resultado = obtenerRespuestaPorId(id);
    return res.status(200).json({ ok: true, data: resultado });
  } catch (error) {
    console.error('[chatbotController] Error en responderSugerencia:', error);
    return res.status(500).json({
      ok: false,
      mensaje: 'Ocurrió un error al procesar tu selección.',
    });
  }
};

module.exports = {
  obtenerSaludo,
  responderConsulta,
  responderSugerencia,
};