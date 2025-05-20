import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { AlertTriangle, Filter, Plus } from 'lucide-react';
import { Badge } from './ui/badge';
import MapComponent from './MapComponent';

// Mock data for risk zones
const mockRiskZones = [
  {
    id: 1,
    center: [-23.5505, -46.6333], // São Paulo
    radius: 2000,
    intensity: 0.8,
    type: 'roubo',
    lastIncident: '2024-03-15',
    description: 'Área com histórico de roubos de celular'
  },
  {
    id: 2,
    center: [-22.9068, -43.1729], // Rio de Janeiro
    radius: 1500,
    intensity: 0.9,
    type: 'furto',
    lastIncident: '2024-03-14',
    description: 'Zona de alto risco para furtos'
  }
];

const RiskZonesMap = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [isMapLoading, setIsMapLoading] = useState(true);

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setIsMapLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getColorByIntensity = (intensity: number) => {
    const hue = (1 - intensity) * 120; // 120 is green, 0 is red
    return `hsl(${hue}, 70%, 50%)`;
  };

  const filteredZones = selectedType
    ? mockRiskZones.filter(zone => zone.type === selectedType)
    : mockRiskZones;

  return (
    <div className="relative h-[600px] w-full rounded-lg overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
      {isMapLoading ? (
        <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-blue mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">Carregando mapa...</p>
          </div>
        </div>
      ) : (
        <MapComponent zones={filteredZones} getColorByIntensity={getColorByIntensity} />
      )}

      {/* Controls Overlay */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <Button
          variant="outline"
          size="icon"
          className="bg-white dark:bg-gray-800"
          onClick={() => setShowReportModal(true)}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-white dark:bg-gray-800"
          onClick={() => setSelectedType(null)}
        >
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      {/* Filter Panel */}
      <div className="absolute top-4 left-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg z-10">
        <h3 className="font-semibold mb-2">Filtrar por Tipo</h3>
        <div className="flex flex-col gap-2">
          <Button
            variant={selectedType === 'roubo' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('roubo')}
          >
            Roubo
          </Button>
          <Button
            variant={selectedType === 'furto' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedType('furto')}
          >
            Furto
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RiskZonesMap; 