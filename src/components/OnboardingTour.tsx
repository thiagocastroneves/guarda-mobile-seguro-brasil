import { useState, useEffect } from 'react';
import Joyride, { CallBackProps, STATUS } from 'react-joyride';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Map, BookOpen, AlertTriangle } from 'lucide-react';

const steps = [
  {
    target: 'body',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Bem-vindo ao GuardaMobile!</h3>
        <p className="text-sm">
          Vamos te guiar pelos principais recursos do aplicativo para proteger seu dispositivo.
        </p>
      </div>
    ),
    placement: 'center',
    disableBeacon: true
  },
  {
    target: '[data-tour="emergency-button"]',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Botão de Emergência</h3>
        <p className="text-sm">
          Em caso de roubo ou furto, toque aqui para ativar o modo de emergência e seguir os passos necessários.
        </p>
      </div>
    ),
    placement: 'bottom'
  },
  {
    target: '[data-tour="risk-zones"]',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Zonas de Risco</h3>
        <p className="text-sm">
          Visualize áreas com histórico de incidentes e receba alertas quando estiver em locais de risco.
        </p>
      </div>
    ),
    placement: 'bottom'
  },
  {
    target: '[data-tour="educational-center"]',
    content: (
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Centro Educativo</h3>
        <p className="text-sm">
          Acesse dicas de segurança, simulações de emergência e aprenda a proteger seu dispositivo.
        </p>
      </div>
    ),
    placement: 'bottom'
  }
];

const OnboardingTour = () => {
  const [run, setRun] = useState(false);

  useEffect(() => {
    // Check if it's the user's first visit
    const hasSeenTour = localStorage.getItem('hasSeenTour');
    if (!hasSeenTour) {
      setRun(true);
    }
  }, []);

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRun(false);
      localStorage.setItem('hasSeenTour', 'true');
    }
  };

  return (
    <>
      <Joyride
        steps={steps}
        run={run}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#2563eb',
            zIndex: 1000
          }
        }}
      />
      <Button
        variant="outline"
        size="sm"
        className="fixed bottom-4 right-4 z-50"
        onClick={() => setRun(true)}
      >
        <ShieldCheck className="h-4 w-4 mr-2" />
        Iniciar Tour
      </Button>
    </>
  );
};

export default OnboardingTour; 