import { Helmet } from "react-helmet";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, AlertTriangle, Smartphone, Lock, Wifi, MapPin, ChevronDown } from "lucide-react";
import EmergencySimulation from "@/components/EmergencySimulation";

const securityTips = [
  {
    category: "Proteção do Dispositivo",
    icon: <Smartphone className="h-6 w-6 text-brand-blue" />,
    tips: [
      "Configure uma senha forte ou biometria",
      "Ative a localização do dispositivo",
      "Mantenha o sistema operacional atualizado",
      "Use um antivírus confiável"
    ]
  },
  {
    category: "Segurança Digital",
    icon: <Lock className="h-6 w-6 text-brand-green" />,
    tips: [
      "Evite redes Wi-Fi públicas",
      "Use autenticação em dois fatores",
      "Faça backup regular dos dados",
      "Não compartilhe senhas"
    ]
  },
  {
    category: "Prevenção de Roubo",
    icon: <AlertTriangle className="h-6 w-6 text-amber-500" />,
    tips: [
      "Mantenha o celular sempre próximo",
      "Evite usar em locais isolados",
      "Não deixe o celular à vista no carro",
      "Registre o IMEI do dispositivo"
    ]
  }
];

const faqItems = [
  {
    question: "O que fazer se meu celular for roubado?",
    answer: "Primeiro, mantenha a calma. Use o GuardaMobile para acionar o modo de emergência, que irá guiá-lo através dos passos necessários: bloquear o dispositivo, registrar um boletim de ocorrência, notificar seu banco e operadora, e rastrear o dispositivo se possível."
  },
  {
    question: "Como posso prevenir roubos de celular?",
    answer: "Algumas medidas importantes incluem: manter o dispositivo sempre próximo, evitar uso em locais isolados, ativar recursos de segurança como biometria e localização, e registrar o IMEI do dispositivo. O GuardaMobile oferece dicas personalizadas baseadas em sua localização."
  },
  {
    question: "O GuardaMobile pode rastrear meu celular roubado?",
    answer: "Sim, se o recurso de localização estiver ativado no seu dispositivo. O GuardaMobile pode ajudar a localizar seu celular através do GPS e outras tecnologias de rastreamento, aumentando as chances de recuperação."
  },
  {
    question: "Como funciona o modo de emergência?",
    answer: "O modo de emergência é ativado com um único toque e guia você através de todos os passos necessários após um roubo ou furto. Ele inclui bloqueio remoto, notificações automáticas, e acesso rápido a números de emergência."
  }
];

const EducationalCenter = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Centro Educativo - GuardaMobile</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <ShieldCheck className="h-8 w-8 text-brand-blue" />
          <h1 className="text-3xl font-bold">Centro Educativo</h1>
        </div>

        {/* Security Tips Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Dicas de Segurança</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {securityTips.map((category) => (
              <Card key={category.category} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  {category.icon}
                  <h3 className="text-lg font-semibold">{category.category}</h3>
                </div>
                <ul className="space-y-2">
                  {category.tips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ChevronDown className="h-4 w-4 text-brand-blue mt-1 flex-shrink-0" />
                      <span className="text-sm">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Emergency Simulation Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Simulação de Emergência</h2>
          <EmergencySimulation />
        </section>

        {/* FAQ Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Perguntas Frequentes</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        {/* Emergency Guide Section */}
        <section className="bg-red-50 dark:bg-red-900/20 rounded-lg p-6 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-semibold mb-4">Guia de Emergência</h2>
              <p className="mb-4">
                Em caso de roubo ou furto do seu dispositivo, siga estes passos imediatamente:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-6">
                <li>Mantenha a calma e procure um local seguro</li>
                <li>Acione o modo de emergência no GuardaMobile</li>
                <li>Bloqueie seu dispositivo remotamente</li>
                <li>Registre um boletim de ocorrência</li>
                <li>Notifique seu banco e operadora</li>
              </ol>
              <Button variant="destructive" className="w-full sm:w-auto">
                Ativar Modo de Emergência
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Quer mais segurança?</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Registre-se gratuitamente para receber alertas personalizados e dicas de segurança baseadas em sua localização.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg">
              Criar Conta Grátis
            </Button>
            <Button size="lg" variant="outline">
              Saiba Mais
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default EducationalCenter; 