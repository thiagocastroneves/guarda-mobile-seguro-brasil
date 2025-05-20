import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapTest = () => (
  <div style={{ height: '600px', width: '100%', margin: '2rem auto', maxWidth: 800 }}>
    <MapContainer center={[-23.5505, -46.6333]} zoom={12} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={[-23.5505, -46.6333]}>
        <Popup>São Paulo</Popup>
      </Marker>
    </MapContainer>
  </div>
);

export default MapTest; 