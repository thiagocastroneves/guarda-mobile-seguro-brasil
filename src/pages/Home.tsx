
import EmergencyButton from "@/components/EmergencyButton";
import SecurityTipCard from "@/components/SecurityTipCard";
import MapPlaceholder from "@/components/MapPlaceholder";
import { Link } from "react-router-dom";
import { ShieldCheck, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

const securityTips = [
  {
    title: "Mantenha seu dispositivo bloqueado",
    description: "Configure uma senha forte, biometria ou reconhecimento facial para proteger seu acesso.",
    icon: <ShieldCheck className="h-8 w-8 text-brand-blue" />
  },
  {
    title: "Cuidado com redes públicas",
    description: "Evite acessar dados sensíveis quando conectado a redes Wi-Fi públicas e não seguras.",
    icon: <Info className="h-8 w-8 text-brand-green" />
  },
  {
    title: "Atenção em locais públicos",
    description: "Mantenha seu celular sempre próximo e em local seguro, especialmente em áreas movimentadas.",
    icon: <AlertTriangle className="h-8 w-8 text-amber-500" />
  }
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-brand-blue to-brand-blue-dark py-12 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Proteja seu smartphone com GuardaMobile</h1>
              <p className="text-lg mb-8">
                Seu assistente digital para prevenção e resposta a roubos de celular no Brasil
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <EmergencyButton className="w-full sm:w-auto" />
                <Button 
                  variant="outline" 
                  className="bg-white text-brand-blue border-white hover:bg-white/90 hover:text-brand-blue-dark w-full sm:w-auto"
                  asChild
                >
                  <Link to="/register">Cadastre-se Agora</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center">Dicas de Segurança</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {securityTips.map((tip, index) => (
                <SecurityTipCard 
                  key={index}
                  title={tip.title}
                  description={tip.description}
                  icon={tip.icon}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-8 text-center">Localização do Dispositivo</h2>
              <MapPlaceholder className="mb-4" />
              <p className="text-center text-gray-600 text-sm">
                Acompanhe a localização do seu dispositivo em tempo real*
                <br />
                <span className="text-xs">*Funcionalidade completa disponível após login</span>
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-brand-green text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold mb-4">Comece agora mesmo</h2>
            <p className="mb-6">Registre-se gratuitamente e proteja seu dispositivo</p>
            <Button 
              size="lg" 
              className="bg-white text-brand-green hover:bg-gray-100"
              asChild
            >
              <Link to="/register">Criar Conta</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
