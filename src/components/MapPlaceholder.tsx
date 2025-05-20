
import { MapPin } from 'lucide-react';

interface MapPlaceholderProps {
  className?: string;
}

const MapPlaceholder = ({ className = "" }: MapPlaceholderProps) => {
  return (
    <div className={`bg-gray-100 rounded-lg overflow-hidden relative ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-brand-blue/20 to-brand-green/20">
        <div className="text-center">
          <MapPin className="h-10 w-10 text-brand-blue mx-auto" />
          <p className="text-gray-700 mt-2">Mapa de localização</p>
          <p className="text-xs text-gray-500 mt-1">(Placeholder)</p>
        </div>
      </div>
      <div className="h-48 md:h-64 w-full"></div>
    </div>
  );
};

export default MapPlaceholder;
