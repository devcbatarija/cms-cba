import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Iconos por defecto de Leaflet (hay que importarlos a mano con Vite/Webpack)
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: iconRetina,
    iconUrl: icon,
    shadowUrl: iconShadow,
});

const UBICACION_CBA = [-21.53640616305387, -64.72795038045169];

const MapComponent = () => {
    return (
        <MapContainer
            center={UBICACION_CBA}
            zoom={16}
            scrollWheelZoom={false}
            style={{ height: '420px', width: '100%' }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                maxZoom={19}
            />
            <Marker position={UBICACION_CBA}>
                <Popup>
                    <strong>Centro Boliviano Americano</strong><br />
                    EducationUSA
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;