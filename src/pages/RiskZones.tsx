import { Helmet } from "react-helmet";
import RiskZonesMap from "@/components/RiskZonesMap";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info } from "lucide-react";

const RiskZones = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Zonas de Risco - GuardaMobile</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <AlertTriangle className="h-8 w-8 text-amber-500" />
          <h1 className="text-3xl font-bold">Zonas de Risco</h1>
        </div>

        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4 mb-6">
          <div className="flex gap-3">
            <Info className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
                Informações Importantes
              </h3>
              <p className="text-amber-700 dark:text-amber-400 text-sm">
                Este mapa mostra áreas com histórico de incidentes de roubo e furto de celulares.
                As zonas são atualizadas regularmente com base em relatos da comunidade e dados oficiais.
                Use os filtros para visualizar diferentes tipos de incidentes.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <RiskZonesMap />
        </div>

        <div className="flex justify-center gap-4">
          <Button variant="outline">
            Como Contribuir
          </Button>
          <Button>
            Reportar Incidente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RiskZones; 