import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
    return (
        <MapContainer center={[-21.53640616305387, -64.72795038045169]} zoom={13} style={{ height: '500px', width: '90%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[-21.53640616305387, -64.72795038045169]}>
                <Popup>
                    CENTRO BOLIVIANO AMERICANO<br />EDUCATION USA 
                </Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
