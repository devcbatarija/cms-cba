import React, { useState } from 'react';
import PublicationAdd from './PublicationAdd';
import PublicationPreview from './PublicationPreview';
import TablePublication from './PublicationTable';
import PublicationTable from './PublicationTable';

function Publicacion() {
  const [currentView, setCurrentView] = useState('crear');

  const handleNavButtonClick = (view) => {
    setCurrentView(view);
  };

  const buttonStyle = {
    backgroundColor: 'white',
    border: 'none',
    color: 'black',
    padding: '15px 32px',
    textAlign: 'center',
    textDecoration: 'none',
    display: 'inline-block',
    fontSize: '16px',
    margin: '4px 2px',
    cursor: 'pointer'
  };

  return (
    <div style={{ backgroundColor: 'white', color: 'black' }}>
      <nav>
        <button style={buttonStyle} onClick={() => handleNavButtonClick('crear')}>Crear Publicación</button>
        <button style={buttonStyle} onClick={() => handleNavButtonClick('vista-previa')}>Vista Previa</button>
      </nav>
      
      {currentView === 'crear' ? (
        <TablePublication />
      ) : (
        <PublicationPreview post={{/* Aquí proporciona los datos de la publicación */}} />
      )}
    </div>
  );
}

export default Publicacion;
