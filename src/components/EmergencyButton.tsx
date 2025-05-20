
import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import EmergencyDialog from './EmergencyDialog';

interface EmergencyButtonProps {
  text?: string;
  className?: string;
}

const EmergencyButton = ({ 
  text = "EMERGÊNCIA", 
  className = "" 
}: EmergencyButtonProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setDialogOpen(true)}
        className={`emergency-button bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-md transition-colors flex items-center justify-center ${className}`}
      >
        <AlertTriangle className="mr-2 h-6 w-6" />
        {text}
      </button>
      
      <EmergencyDialog 
        open={dialogOpen} 
        onClose={() => setDialogOpen(false)} 
      />
    </>
  );
};

export default EmergencyButton;
