import { useState, useRef, useEffect, useCallback } from 'react';
import cbaMonogram from '../../assets/cba-monogram.png';
import './ChatbotWidget.css';

const API_URL = 'http://localhost:3001/appi';

const WHATSAPP_NUMERO_DEFAULT = '59164576363';
const WHATSAPP_MENSAJE_DEFAULT = 'Hola, tengo una consulta sobre los programas del CBA Tarija.';

let idMensaje = 0;
const generarId = () => {
  idMensaje += 1;
  return `msg-${idMensaje}-${Date.now()}`;
};

const construirLinkWhatsapp = (numero, texto) =>
  `https://api.whatsapp.com/send/?phone=${numero}${texto ? `&text=${encodeURIComponent(texto)}` : ''}&type=phone_number&app_absent=0`;

const ChatbotWidget = () => {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([]);
  const [textoInput, setTextoInput] = useState('');
  const [escribiendo, setEscribiendo] = useState(false);
  const [mostrarTeaser, setMostrarTeaser] = useState(false);
  const [yaSeAbrioAlgunaVez, setYaSeAbrioAlgunaVez] = useState(false);

  const cuerpoChatRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!yaSeAbrioAlgunaVez) setMostrarTeaser(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, [yaSeAbrioAlgunaVez]);

  useEffect(() => {
    if (cuerpoChatRef.current) {
      cuerpoChatRef.current.scrollTop = cuerpoChatRef.current.scrollHeight;
    }
  }, [mensajes, escribiendo]);

  const agregarMensajeBot = useCallback((respuesta, sugerencias = [], acciones = []) => {
    setMensajes((prev) => [
      ...prev,
      { id: generarId(), autor: 'bot', texto: respuesta, sugerencias, acciones },
    ]);
  }, []);

  const agregarMensajeUsuario = useCallback((texto) => {
    setMensajes((prev) => [
      ...prev,
      { id: generarId(), autor: 'usuario', texto },
    ]);
  }, []);

  const agregarMensajeErrorConexion = useCallback(() => {
    agregarMensajeBot(
      'No pude conectarme en este momento. Puedes escribirnos directamente y te respondemos a la brevedad:',
      [],
      [
        {
          tipo: 'whatsapp',
          texto: 'Escribir por WhatsApp',
          valor: WHATSAPP_NUMERO_DEFAULT,
          mensaje: WHATSAPP_MENSAJE_DEFAULT,
        },
      ]
    );
  }, [agregarMensajeBot]);

  const cargarSaludoInicial = useCallback(async () => {
    setEscribiendo(true);
    try {
      const res = await fetch(`${API_URL}/chatbot/saludo`);
      if (!res.ok) throw new Error('Respuesta no válida del servidor');
      const data = await res.json();
      agregarMensajeBot(data.data.respuesta, data.data.sugerencias, data.data.acciones);
    } catch (error) {
      console.error('Error al cargar el saludo del chatbot:', error);
      agregarMensajeErrorConexion();
    } finally {
      setEscribiendo(false);
    }
  }, [agregarMensajeBot, agregarMensajeErrorConexion]);

  const handleAbrirCerrar = () => {
    const nuevoEstado = !abierto;
    setAbierto(nuevoEstado);
    setMostrarTeaser(false);

    if (nuevoEstado && !yaSeAbrioAlgunaVez) {
      setYaSeAbrioAlgunaVez(true);
      cargarSaludoInicial();
    }

    if (nuevoEstado) {
      // pequeño delay para que el panel termine de animarse antes de enfocar
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  };

  const enviarConsulta = async (mensajeTexto) => {
    if (!mensajeTexto.trim()) return;

    agregarMensajeUsuario(mensajeTexto);
    setTextoInput('');
    setEscribiendo(true);

    try {
      const res = await fetch(`${API_URL}/chatbot/consulta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ mensaje: mensajeTexto }),
      });
      if (!res.ok) throw new Error('Respuesta no válida del servidor');
      const data = await res.json();
      agregarMensajeBot(data.data.respuesta, data.data.sugerencias, data.data.acciones);
    } catch (error) {
      console.error('Error al consultar el chatbot:', error);
      agregarMensajeErrorConexion();
    } finally {
      setEscribiendo(false);
    }
  };

  const handleClickSugerencia = async (sugerencia) => {
    agregarMensajeUsuario(sugerencia.texto);
    setEscribiendo(true);
    try {
      const res = await fetch(`${API_URL}/chatbot/sugerencia`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sugerencia.id }),
      });
      if (!res.ok) throw new Error('Respuesta no válida del servidor');
      const data = await res.json();
      agregarMensajeBot(data.data.respuesta, data.data.sugerencias, data.data.acciones);
    } catch (error) {
      console.error('Error al consultar sugerencia del chatbot:', error);
      agregarMensajeErrorConexion();
    } finally {
      setEscribiendo(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    enviarConsulta(textoInput);
  };

  return (
    <div className="cba-chatbot-container">
      {abierto && (
        <div className="cba-chatbot-panel" role="dialog" aria-label="Asesoramiento en línea">
          <header className="cba-chatbot-header">
            <div className="cba-chatbot-avatar">
              <img src={cbaMonogram} alt="CBA" />
            </div>
            <div className="cba-chatbot-header-info">
              <p className="cba-chatbot-header-title">Asesoramiento Online</p>
              <p className="cba-chatbot-header-subtitle">
                <span className="cba-chatbot-status-dot" /> Asistente virtual
              </p>
            </div>
            <button
              type="button"
              className="cba-chatbot-collapse-btn"
              onClick={handleAbrirCerrar}
              aria-label="Minimizar chat"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
                <path
                  d="M6 9l6 6 6-6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </header>

          <div className="cba-chatbot-body" ref={cuerpoChatRef}>
            {mensajes.map((mensaje) => (
              <div key={mensaje.id} className={`cba-mensaje-bloque cba-mensaje-bloque--${mensaje.autor}`}>
                {mensaje.autor === 'bot' ? (
                  <div className="cba-mensaje-fila-bot">
                    <div className="cba-mensaje-mini-avatar" aria-hidden="true">
                      <RobotIcon size={16} />
                    </div>
                    <div className="cba-mensaje cba-mensaje--bot">{mensaje.texto}</div>
                  </div>
                ) : (
                  <div className="cba-mensaje cba-mensaje--usuario">{mensaje.texto}</div>
                )}

                {mensaje.autor === 'bot' && mensaje.sugerencias?.length > 0 && (
                  <div className="cba-chips-fila">
                    {mensaje.sugerencias.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        className="cba-chip"
                        onClick={() => handleClickSugerencia(s)}
                      >
                        {s.texto}
                      </button>
                    ))}
                  </div>
                )}

                {mensaje.autor === 'bot' && mensaje.acciones?.length > 0 && (
                  <div className="cba-acciones-fila">
                    {mensaje.acciones.map((accion, i) =>
                      accion.tipo === 'whatsapp' ? (
                        <a
                          key={i}
                          href={construirLinkWhatsapp(accion.valor, accion.mensaje)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="cba-accion-whatsapp"
                        >
                          <WhatsappIcon size={15} />
                          {accion.texto}
                        </a>
                      ) : null
                    )}
                  </div>
                )}
              </div>
            ))}

            {escribiendo && (
              <div className="cba-mensaje-bloque cba-mensaje-bloque--bot">
                <div className="cba-mensaje-fila-bot">
                  <div className="cba-mensaje-mini-avatar" aria-hidden="true">
                    <RobotIcon size={16} />
                  </div>
                  <div className="cba-mensaje cba-mensaje--bot cba-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              </div>
            )}
          </div>

          <form className="cba-chatbot-input-row" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              type="text"
              className="cba-chatbot-input"
              placeholder="Escribe tu mensaje y pulsa 'Enter'"
              value={textoInput}
              onChange={(e) => setTextoInput(e.target.value)}
              maxLength={300}
              aria-label="Escribe tu mensaje"
            />
            <button
              type="submit"
              className="cba-chatbot-send-btn"
              disabled={!textoInput.trim()}
              aria-label="Enviar mensaje"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none">
                <path
                  d="M3 11l18-8-8 18-2-8-8-2z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="currentColor"
                />
              </svg>
            </button>
          </form>
        </div>
      )}

      {!abierto && mostrarTeaser && (
        <div className="cba-chatbot-teaser">
          <button
            type="button"
            className="cba-chatbot-teaser-cerrar"
            aria-label="Cerrar sugerencia"
            onClick={() => setMostrarTeaser(false)}
          >
            ×
          </button>
          ¿Tienes preguntas? Escríbenos 👋
        </div>
      )}

      <button
        type="button"
        className="cba-chatbot-fab"
        onClick={handleAbrirCerrar}
        aria-label={abierto ? 'Cerrar asesoramiento online' : 'Abrir asesoramiento online'}
      >
        {abierto ? (
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        ) : (
          <>
            <RobotIcon size={30} className="cba-fab-robot" />
            {!yaSeAbrioAlgunaVez && <span className="cba-chatbot-fab-badge" />}
          </>
        )}
      </button>
    </div>
  );
};

/**
 * Icono de robot para el FAB y el mini-avatar de cada mensaje del bot.
 * Usa currentColor para heredar el color del botón/contenedor donde se monte.
 */
const RobotIcon = ({ size = 24, className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    fill="none"
    className={className}
  >
    {/* antena */}
    <circle cx="12" cy="3.6" r="1.3" fill="currentColor" className="cba-robot-antena-dot" />
    <line x1="12" y1="4.9" x2="12" y2="7" stroke="currentColor" strokeWidth="1.5" />
    {/* cabeza */}
    <rect x="4.5" y="7" width="15" height="11.5" rx="4.5" stroke="currentColor" strokeWidth="1.8" />
    {/* ojos */}
    <circle cx="9.3" cy="12.8" r="1.4" fill="currentColor" />
    <circle cx="14.7" cy="12.8" r="1.4" fill="currentColor" />
    {/* sonrisa */}
    <path d="M9.5 15.8c0.8 0.7 4.2 0.7 5 0" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    {/* orejas/antenas laterales */}
    <line x1="2.3" y1="12" x2="4.5" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <line x1="19.5" y1="12" x2="21.7" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const WhatsappIcon = ({ size = 16 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor">
    <path d="M17.6 6.3A8.86 8.86 0 0 0 12 4a8.9 8.9 0 0 0-7.6 13.6L3 21l3.5-1.4A8.9 8.9 0 0 0 12 21a8.9 8.9 0 0 0 5.6-15.7ZM12 19.3a7.2 7.2 0 0 1-3.7-1l-.3-.2-2.4 1 1-2.3-.2-.3A7.3 7.3 0 1 1 19.3 12 7.3 7.3 0 0 1 12 19.3Zm4-5.4c-.2-.1-1.3-.6-1.5-.7s-.4-.1-.5.1-.5.7-.7.8-.3.1-.5 0a5.9 5.9 0 0 1-1.7-1.1 6.5 6.5 0 0 1-1.2-1.5c-.1-.2 0-.4.1-.5l.4-.5a.5.5 0 0 0 0-.5c-.1-.1-.5-1.2-.7-1.6s-.4-.4-.5-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.1 5 5 0 0 0 1 2.6 11 11 0 0 0 4.2 3.7c1.6.6 2.2.6 2.6.5a1.6 1.6 0 0 0 1.1-.8 1.3 1.3 0 0 0 .1-.8c0-.1-.2-.2-.4-.3Z" />
  </svg>
);

export default ChatbotWidget;