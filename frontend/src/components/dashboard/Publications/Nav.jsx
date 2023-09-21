import React, { useState } from 'react';
import PublicationAdd from './PublicationAdd';
import PublicationPreview from './PublicationPreview';
import TablePublication from './PublicationTable';
import PublicationTable from './PublicationTable';
import ContarinerNewPublication from './containerNewPublication';

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
        <button style={buttonStyle} onClick={() => handleNavButtonClick('crear')}>Tabla de publicaciones</button>
        <button style={buttonStyle} onClick={() => handleNavButtonClick('vista-previa')}>Nueva publicacion</button>
      </nav>
      
      {currentView === 'crear' ? (
        <TablePublication />
      ) : (
        <ContarinerNewPublication/>
      )}
    </div>
  );
}

export default Publicacion;
