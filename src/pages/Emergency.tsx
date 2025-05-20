
import { useState } from "react";
import { Helmet } from "react-helmet";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import EmergencyDialog from "@/components/EmergencyDialog";
import ChatAssistant from "@/components/ChatAssistant";

const Emergency = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>Emergência | GuardaMobile</title>
      </Helmet>
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Assistência de Emergência</h1>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 mr-2" />
                Situação de Emergência?
              </h2>
              
              <p className="mb-4">
                Se você está passando por uma situação de roubo ou perda do seu dispositivo,
                ative o modo de emergência para receber orientações imediatas.
              </p>
              
              <Button 
                onClick={() => setDialogOpen(true)}
                className="bg-red-600 hover:bg-red-700 w-full sm:w-auto"
                size="lg"
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                Ativar Modo de Emergência
              </Button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Informações Importantes</h2>
              
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="bg-brand-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">1</span>
                  <span>Em caso de roubo, <strong>priorize sua segurança</strong>. Não reaja e evite confrontos.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-brand-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">2</span>
                  <span>Bloqueie imediatamente o aparelho e suas contas bancárias.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-brand-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">3</span>
                  <span>Entre em contato com sua operadora para bloquear o chip e IMEI.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-brand-blue text-white rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">4</span>
                  <span>Registre um Boletim de Ocorrência na delegacia mais próxima ou online.</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div>
            <ChatAssistant />
          </div>
        </div>
      </div>
      
      <EmergencyDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default Emergency;
