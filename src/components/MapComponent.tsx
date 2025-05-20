import { useEffect } from 'react';
import { MapContainer, TileLayer, Circle, Popup, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

interface Zone {
  id: number;
  center: [number, number];
  radius: number;
  intensity: number;
  type: string;
  lastIncident: string;
  description: string;
}

interface MapComponentProps {
  zones: Zone[];
  getColorByIntensity: (intensity: number) => string;
}

const MapController = () => {
  const map = useMap();
  
  useEffect(() => {
    // Center on Brazil
    map.setView([-15.7801, -47.9292], 4);
  }, [map]);

  return null;
};

const MapComponent = ({ zones, getColorByIntensity }: MapComponentProps) => {
  return (
    <MapContainer
      center={[-15.7801, -47.9292]}
      zoom={4}
      style={{ height: '100%', width: '100%', zIndex: 0 }}
      className="z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapController />
      
      {zones.map(zone => (
        <Circle
          key={zone.id}
          center={zone.center as LatLngExpression}
          radius={zone.radius}
          pathOptions={{
            fillColor: getColorByIntensity(zone.intensity),
            fillOpacity: 0.4,
            color: getColorByIntensity(zone.intensity),
            weight: 2
          }}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold mb-2">Zona de Risco</h3>
              <p className="text-sm mb-2">{zone.description}</p>
              <div className="flex gap-2 mb-2">
                <Badge variant="outline">{zone.type}</Badge>
                <Badge variant="outline">Último: {zone.lastIncident}</Badge>
              </div>
              <Button size="sm" className="w-full">
                Reportar Incidente
              </Button>
            </div>
          </Popup>
        </Circle>
      ))}
    </MapContainer>
  );
};

export default MapComponent; 