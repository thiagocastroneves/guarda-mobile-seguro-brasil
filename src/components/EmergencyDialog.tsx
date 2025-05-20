
import { useState } from "react";
import { AlertTriangle, Shield, Phone, FileText, X } from "lucide-react";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Incident } from "@/integrations/supabase/types.d";

interface EmergencyDialogProps {
  open: boolean;
  onClose: () => void;
}

const EmergencyDialog = ({ open, onClose }: EmergencyDialogProps) => {
  const [step, setStep] = useState<'type' | 'checklist'>('type');
  const [incidentType, setIncidentType] = useState<'Roubo' | 'Perda' | 'Outro' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleTypeSelect = async (type: 'Roubo' | 'Perda' | 'Outro') => {
    setIncidentType(type);
    setIsSubmitting(true);
    
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session || !session.session) {
        toast({
          title: "Necessário fazer login",
          description: "Por favor, faça login para continuar",
          variant: "destructive",
        });
        onClose();
        return;
      }
      
      // Create a new incident
      const { data: incident, error } = await supabase
        .from('incidents')
        .insert([
          { 
            incident_type: type,
            status: 'open',
            user_id: session.session.user.id
          }
        ])
        .select()
        .single();
      
      if (error) throw error;
      
      if (incident) {
        // Create default checklist items
        await supabase.from('checklist_items').insert([
          { incident_id: incident.id, item_type: 'device_block', status: 'pending' },
          { incident_id: incident.id, item_type: 'bank_block', status: 'pending' },
          { incident_id: incident.id, item_type: 'carrier_contact', status: 'pending' },
          { incident_id: incident.id, item_type: 'police_report', status: 'pending' }
        ]);

        // Add initial chat message
        await supabase.from('chat_messages').insert([
          {
            user_id: session.session.user.id,
            sender: 'system',
            message: `Incidente de ${type} registrado. Siga as orientações no checklist de emergência.`
          }
        ]);
      }
      
      setStep('checklist');
    } catch (error) {
      console.error("Error creating incident:", error);
      toast({
        title: "Erro ao registrar incidente",
        description: "Ocorreu um erro ao registrar o incidente. Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setStep('type');
    setIncidentType(null);
    onClose();
  };

  return (
    <AlertDialog open={open} onOpenChange={(isOpen) => !isOpen && resetAndClose()}>
      <AlertDialogContent className="max-w-md">
        {step === 'type' ? (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl text-center">
                <div className="flex items-center justify-center mb-2">
                  <AlertTriangle className="h-8 w-8 text-red-500 mr-2" />
                  <span>Emergência</span>
                </div>
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center text-base">
                Selecione o tipo de situação:
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid gap-4 py-4">
              <Button 
                onClick={() => handleTypeSelect('Roubo')} 
                className="bg-red-600 hover:bg-red-700"
                disabled={isSubmitting}
              >
                <AlertTriangle className="mr-2 h-5 w-5" />
                Roubo
              </Button>
              <Button 
                onClick={() => handleTypeSelect('Perda')} 
                variant="secondary"
                disabled={isSubmitting}
              >
                <Shield className="mr-2 h-5 w-5" />
                Perda
              </Button>
              <Button 
                onClick={() => handleTypeSelect('Outro')}
                variant="outline"
                disabled={isSubmitting}
              >
                Outro
              </Button>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isSubmitting}>Cancelar</AlertDialogCancel>
            </AlertDialogFooter>
          </>
        ) : (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl">
                <div className="flex items-center">
                  <AlertTriangle className="h-6 w-6 text-red-500 mr-2" />
                  <span>Checklist de Emergência: {incidentType}</span>
                </div>
              </AlertDialogTitle>
              <AlertDialogDescription>
                Siga esses passos imediatamente:
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="grid gap-3 py-4">
              <ChecklistItemButton
                icon={<Shield className="h-5 w-5" />}
                title="Bloqueio do dispositivo"
                description="Bloqueie seu aparelho remotamente"
              />
              <ChecklistItemButton
                icon={<FileText className="h-5 w-5" />}
                title="Bloqueio de contas bancárias"
                description="Entre em contato com seus bancos"
              />
              <ChecklistItemButton
                icon={<Phone className="h-5 w-5" />}
                title="Contato com operadora"
                description="Bloqueie o número e IMEI"
              />
              <ChecklistItemButton
                icon={<FileText className="h-5 w-5" />}
                title="Registro de B.O."
                description="Faça um boletim de ocorrência"
              />
            </div>
            <AlertDialogFooter className="flex flex-col space-y-2">
              <Button onClick={resetAndClose} className="w-full">
                Continuar para o assistente
              </Button>
              <AlertDialogCancel className="w-full mt-2">Fechar</AlertDialogCancel>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

const ChecklistItemButton = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) => {
  const [completed, setCompleted] = useState(false);
  const { toast } = useToast();
  
  const handleClick = () => {
    setCompleted(true);
    toast({
      title: "Item marcado como concluído",
      description: `${title} foi marcado como concluído`,
    });
    // In a full implementation, this would update the database
  };
  
  return (
    <Button 
      variant={completed ? "default" : "outline"}
      className={`justify-start text-left h-auto py-3 ${completed ? 'bg-green-600 hover:bg-green-700' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-center">
        <div className="mr-3">{icon}</div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="text-sm opacity-80">{description}</p>
        </div>
      </div>
    </Button>
  );
};

export default EmergencyDialog;
