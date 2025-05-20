
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Settings, User, Phone } from "lucide-react";

const Profile = () => {
  const [fullName, setFullName] = useState("Usuário Demo");
  const [email, setEmail] = useState("usuario@exemplo.com");
  const [phone, setPhone] = useState("(11) 98765-4321");
  const [deviceModel, setDeviceModel] = useState("iPhone 12");
  const [deviceId, setDeviceId] = useState("IMEI: 123456789012345");
  const [emergencyContact, setEmergencyContact] = useState("(11) 12345-6789");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    }, 1000);
  };

  const handleDeviceUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Dispositivo atualizado",
        description: "As informações do seu dispositivo foram atualizadas com sucesso.",
      });
    }, 1000);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="mb-8">
          <TabsTrigger value="profile" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Dados Pessoais
          </TabsTrigger>
          <TabsTrigger value="device" className="flex items-center">
            <Phone className="h-4 w-4 mr-2" />
            Meu Dispositivo
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Configurações
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>
                Atualize seus dados pessoais e informações de contato
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate}>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="fullName">Nome Completo</Label>
                    <Input
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="emergencyContact">Contato de Emergência</Label>
                    <Input
                      id="emergencyContact"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                    />
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Salvando..." : "Salvar Alterações"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="device">
          <Card>
            <CardHeader>
              <CardTitle>Meu Dispositivo</CardTitle>
              <CardDescription>
                Informações e configurações do seu dispositivo móvel
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDeviceUpdate}>
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="deviceModel">Modelo do Dispositivo</Label>
                    <Input
                      id="deviceModel"
                      value={deviceModel}
                      onChange={(e) => setDeviceModel(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="deviceId">IMEI / Número de série</Label>
                    <Input
                      id="deviceId"
                      value={deviceId}
                      onChange={(e) => setDeviceId(e.target.value)}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      O IMEI é um código único que identifica seu celular. Para encontrá-lo, digite *#06# no seu telefone.
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="font-medium text-lg mb-3">Rastreamento do dispositivo</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      O rastreamento do dispositivo permite localizar seu celular no mapa em caso de perda ou roubo.
                      Para funcionalidade completa, conecte este aplicativo ao Supabase.
                    </p>
                  </div>
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Salvando..." : "Salvar Informações do Dispositivo"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Configurações</CardTitle>
              <CardDescription>
                Gerencie as configurações da sua conta e do aplicativo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Notificações</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Configurações de notificações serão implementadas em uma versão futura.
                  </p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium text-lg mb-3">Privacidade e Segurança</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Configurações adicionais de privacidade e segurança serão implementadas em uma versão futura.
                  </p>
                </div>
                <Button variant="outline" className="w-full" onClick={() => {
                  toast({
                    title: "Funcionalidade em desenvolvimento",
                    description: "Esta função estará disponível em breve.",
                  });
                }}>
                  Redefinir senha
                </Button>
                <Button variant="destructive" className="w-full" onClick={() => {
                  toast({
                    title: "Funcionalidade em desenvolvimento",
                    description: "Esta função estará disponível em breve.",
                  });
                }}>
                  Excluir conta
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <p className="text-xs text-gray-500">
                GuardaMobile - Versão 1.0.0
              </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
