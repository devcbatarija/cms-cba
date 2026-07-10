const faqData = require('../data/chatbotFAQ.json');

const UMBRAL_MINIMO_PUNTAJE = 2;

function normalizarTexto(texto) {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // elimina tildes/diacríticos
    .replace(/[^a-z0-9ñ\s]/g, ' ') // quita signos de puntuación
    .replace(/\s+/g, ' ')
    .trim();
}

function calcularPuntaje(mensajeNormalizado, entrada) {
  const tokensMensaje = mensajeNormalizado.split(' ');
  let puntaje = 0;

  for (const keywordOriginal of entrada.keywords) {
    const keyword = normalizarTexto(keywordOriginal);
    const esFrase = keyword.includes(' ');

    if (esFrase) {
      if (mensajeNormalizado.includes(keyword)) {
        puntaje += 3;
      }
    } else {
      if (tokensMensaje.includes(keyword)) {
        puntaje += 2;
      } else if (keyword.length > 4 && mensajeNormalizado.includes(keyword)) {
        puntaje += 1;
      }
    }
  }

  return puntaje;
}

function obtenerSugerenciasPrincipales() {
  return faqData
    .filter((entrada) => entrada.principal)
    .map((entrada) => ({ id: entrada.id, texto: entrada.tituloSugerencia }));
}


function resolverSugerencias(idsSugeridos = []) {
  return idsSugeridos
    .map((id) => faqData.find((entrada) => entrada.id === id))
    .filter(Boolean)
    .map((entrada) => ({ id: entrada.id, texto: entrada.tituloSugerencia }));
}

/**
 * Busca la mejor respuesta para un mensaje libre del usuario.
 */
function buscarRespuesta(mensajeUsuario) {
  const mensajeNormalizado = normalizarTexto(mensajeUsuario);

  let mejorEntrada = null;
  let mejorPuntaje = 0;

  for (const entrada of faqData) {
    const puntaje = calcularPuntaje(mensajeNormalizado, entrada);
    if (puntaje > mejorPuntaje) {
      mejorPuntaje = puntaje;
      mejorEntrada = entrada;
    }
  }

  if (mejorEntrada && mejorPuntaje >= UMBRAL_MINIMO_PUNTAJE) {
    return {
      encontrada: true,
      id: mejorEntrada.id,
      respuesta: mejorEntrada.respuesta,
      acciones: mejorEntrada.acciones || [],
      sugerencias: resolverSugerencias(mejorEntrada.sugerencias),
    };
  }

  return {
    encontrada: false,
    id: null,
    respuesta:
      'No estoy seguro de haber entendido tu consulta 🤔. Puedes intentar con otras palabras o elegir una de estas opciones:',
    acciones: [],
    sugerencias: obtenerSugerenciasPrincipales(),
  };
}

/**
 * Devuelve una respuesta directa a partir del id de una sugerencia/chip
 * (cuando el usuario hace clic en un botón en vez de escribir).
 */
function obtenerRespuestaPorId(id) {
  const entrada = faqData.find((item) => item.id === id);

  if (!entrada) {
    return buscarRespuesta(id); // fallback: intenta tratarlo como texto libre
  }

  return {
    encontrada: true,
    id: entrada.id,
    respuesta: entrada.respuesta,
    acciones: entrada.acciones || [],
    sugerencias: resolverSugerencias(entrada.sugerencias),
  };
}

/**
 * Mensaje de bienvenida según la hora del día, con sugerencias iniciales.
 */
function obtenerSaludoInicial() {
  const hora = new Date().getHours();
  let saludo;

  if (hora >= 5 && hora < 12) saludo = 'Buenos días';
  else if (hora >= 12 && hora < 19) saludo = 'Buenas tardes';
  else saludo = 'Buenas noches';

  return {
    respuesta: `${saludo} 👋 Soy el asistente virtual del CBA Tarija. Puedo ayudarte con información sobre programas, horarios, precios, becas e inscripciones. ¿En qué te puedo ayudar?`,
    acciones: [],
    sugerencias: obtenerSugerenciasPrincipales(),
  };
}

module.exports = {
  buscarRespuesta,
  obtenerRespuestaPorId,
  obtenerSaludoInicial,
  // se exportan por si quieres testearlas o reutilizarlas (ej. con pytest/jest)
  normalizarTexto,
  calcularPuntaje,
};