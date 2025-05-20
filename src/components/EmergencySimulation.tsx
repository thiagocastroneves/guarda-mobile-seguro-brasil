import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, ShieldCheck, Phone, FileText, Building2, Wifi, Clock } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Mantenha a Calma",
    description: "Encontre um local seguro e respire fundo. Você está no controle da situação.",
    icon: <ShieldCheck className="h-6 w-6 text-brand-blue" />,
    duration: 30
  },
  {
    id: 2,
    title: "Bloqueie o Dispositivo",
    description: "Use o modo de emergência do GuardaMobile para bloquear seu dispositivo remotamente.",
    icon: <Phone className="h-6 w-6 text-red-500" />,
    duration: 60
  },
  {
    id: 3,
    title: "Registre o BO",
    description: "Registre um boletim de ocorrência na delegacia mais próxima ou online.",
    icon: <FileText className="h-6 w-6 text-amber-500" />,
    duration: 120
  },
  {
    id: 4,
    title: "Notifique Instituições",
    description: "Entre em contato com seu banco e operadora para bloquear serviços.",
    icon: <Building2 className="h-6 w-6 text-green-500" />,
    duration: 90
  },
  {
    id: 5,
    title: "Rastreie o Dispositivo",
    description: "Use o GuardaMobile para tentar localizar seu dispositivo.",
    icon: <Wifi className="h-6 w-6 text-purple-500" />,
    duration: 60
  }
];

const EmergencySimulation = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);

  const startSimulation = () => {
    setIsSimulating(true);
    setCurrentStep(0);
    setProgress(0);
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setProgress(((currentStep + 1) / steps.length) * 100);
    } else {
      setIsSimulating(false);
      setCurrentStep(0);
      setProgress(0);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {!isSimulating ? (
        <Card className="p-6 text-center">
          <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">Simulação de Emergência</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Esta simulação irá guiá-lo através dos passos necessários em caso de roubo ou furto do seu dispositivo.
            Cada etapa tem um tempo estimado para conclusão.
          </p>
          <Button size="lg" onClick={startSimulation}>
            Iniciar Simulação
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Progresso</h3>
            <span className="text-sm text-gray-500">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="mb-6" />
          
          <Card className="p-6">
            <div className="flex items-start gap-4">
              {steps[currentStep].icon}
              <div>
                <h3 className="text-xl font-semibold mb-2">{steps[currentStep].title}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {steps[currentStep].description}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>Tempo estimado: {steps[currentStep].duration} segundos</span>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => {
                setIsSimulating(false);
                setCurrentStep(0);
                setProgress(0);
              }}
            >
              Cancelar
            </Button>
            <Button onClick={nextStep}>
              {currentStep === steps.length - 1 ? "Finalizar" : "Próximo Passo"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmergencySimulation; 