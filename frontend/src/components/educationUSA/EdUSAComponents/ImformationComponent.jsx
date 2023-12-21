import React from 'react';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const InformacionEducacion = ({ titulo, contenido }) => {
  return (
    <div className="p-4 text-center text-blue-900 bg-white rounded-lg">
      <br />
      <div className="mb-4 text-2xl font-bold text-gray-900 dark:text-white md:text-5xl lg:text-2xl">
        COMUNICATE
      </div>
      <div className="space-y-4">
        <div className="d-flex justify-content-center">
          {/* Enlace de WhatsApp */}
          <a href="https://api.whatsapp.com/send/?phone=59176192765&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer">
            <WhatsAppIcon style={{ fontSize: 40 }} />
          </a>

          {/* Enlace de Facebook */}
          <a href="https://www.facebook.com/centrobolivianoamericano.tarija" target="_blank" rel="noopener noreferrer">
            <FacebookIcon style={{ fontSize: 40 }} />
          </a>

          {/* Enlace de Instagram */}
          <a href="https://www.instagram.com/cbatarija/" target="_blank" rel="noopener noreferrer">
            <InstagramIcon style={{ fontSize: 40 }} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default InformacionEducacion;
