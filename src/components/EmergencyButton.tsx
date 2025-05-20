import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

interface EmergencyButtonProps {
  className?: string;
}

const EmergencyButton = ({ className }: EmergencyButtonProps) => {
  return (
    <Button
      variant="destructive"
      size="lg"
      className={className}
      data-tour="emergency-button"
      asChild
    >
      <Link to="/emergency">
        <AlertTriangle className="mr-2 h-5 w-5" />
        Modo de Emergência
      </Link>
    </Button>
  );
};

export default EmergencyButton;
