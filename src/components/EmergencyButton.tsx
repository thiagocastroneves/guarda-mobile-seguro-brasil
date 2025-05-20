
import { AlertTriangle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface EmergencyButtonProps {
  text?: string;
  className?: string;
}

const EmergencyButton = ({ 
  text = "EMERGÊNCIA", 
  className = "" 
}: EmergencyButtonProps) => {
  const { toast } = useToast();

  const handleEmergencyClick = () => {
    toast({
      title: "Modo de emergência ativado",
      description: "Esta é uma demonstração. Em um aplicativo completo, isso ativaria protocolos de emergência.",
      variant: "destructive",
    });
  };

  return (
    <button
      onClick={handleEmergencyClick}
      className={`emergency-button flex items-center justify-center ${className}`}
    >
      <AlertTriangle className="mr-2 h-6 w-6" />
      {text}
    </button>
  );
};

export default EmergencyButton;
