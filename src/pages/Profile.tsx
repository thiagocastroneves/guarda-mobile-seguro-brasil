
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Settings, User, Phone, Shield, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Device } from "@/integrations/supabase/types.d";

const Profile = () => {
  const [fullName, setFullName] = useState("Usuário Demo");
  const [email, setEmail] = useState("usuario@exemplo.com");
  const [phone, setPhone] = useState("(11) 98765-4321");
  const [deviceModel, setDeviceModel] = useState("iPhone 12");
  const [deviceId, setDeviceId] = useState("IMEI: 123456789012345");
  const [emergencyContact, setEmergencyContact] = useState("(11) 12345-6789");
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userDevice, setUserDevice] = useState<Device | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get the current user's session
    const getUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
        setEmail(session.user.email || "");
        
        // Fetch user's device information
        const { data: devices, error } = await supabase
          .from('devices')
          .select('*')
          .eq('user_id', session.user.id)
          .maybeSingle();
        
        if (error) {
          console.error("Error fetching device:", error);
        } else if (devices) {
          setUserDevice(devices);
          setDeviceModel(devices.model || "");
          setDeviceId(devices.imei || "");
          setPhone(devices.phone_number || "");
        }
      }
    };
    
    getUserSession();
  }, []);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!userId) {
        throw new Error("Usuário não autenticado");
      }
      
      // Update user profile information would go here
      // This is a placeholder for future implementation

      toast({
        title: "Perfil atualizado",
        description: "Suas informações foram atualizadas com sucesso.",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Erro ao atualizar perfil",
        description: "Ocorreu um erro ao atualizar suas informações.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeviceUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!userId) {
        throw new Error("Usuário não autenticado");
      }
      
      const deviceData = {
        model: deviceModel,
        imei: deviceId.startsWith("IMEI: ") ? deviceId.substring(6) : deviceId,
        phone_number: phone,
        user_id: userId
      };
      
      let result;
      
      if (userDevice) {
        // Update existing device
        result = await supabase
          .from('devices')
          .update(deviceData)
          .eq('id', userDevice.id);
      } else {
        // Insert new device
        result = await supabase
          .from('devices')
          .insert([deviceData]);
      }
      
      if (result.error) throw result.error;
      
      toast({
        title: "Dispositivo atualizado",
        description: "As informações do seu dispositivo foram atualizadas com sucesso.",
      });
      
    } catch (error) {
      console.error("Error updating device:", error);
      toast({
        title: "Erro ao atualizar dispositivo",
        description: "Ocorreu um erro ao atualizar as informações do dispositivo.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
          <TabsTrigger value="security" className="flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Segurança
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
                      disabled
                    />
                    <p className="text-sm text-muted-foreground">
                      O email não pode ser alterado após o cadastro.
                    </p>
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
                      Para funcionalidade completa, conecte este aplicativo ao seu dispositivo via GPS.
                    </p>
                    <div className="flex items-center justify-between bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
                      <div className="flex items-center">
                        <AlertTriangle className="text-amber-500 mr-2 h-5 w-5" />
                        <span className="text-sm">Rastreamento não ativado</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Ativar
                      </Button>
                    </div>
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

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Segurança</CardTitle>
              <CardDescription>
                Configure opções de segurança adicionais para seu dispositivo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6">
                <div>
                  <h3 className="font-medium text-lg mb-3">Telefones de Emergência</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium">Polícia</p>
                        <p className="text-xl font-bold">190</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Bombeiros</p>
                        <p className="text-xl font-bold">193</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">SAMU</p>
                        <p className="text-xl font-bold">192</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Defesa Civil</p>
                        <p className="text-xl font-bold">199</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="font-medium text-lg mb-3">Dicas de Segurança</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 mr-2 mt-0.5 text-brand-green" />
                      <span>Mantenha seu sistema operacional e aplicativos atualizados.</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 mr-2 mt-0.5 text-brand-green" />
                      <span>Use autenticação de dois fatores em todas as suas contas sensíveis.</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 mr-2 mt-0.5 text-brand-green" />
                      <span>Evite redes Wi-Fi públicas para acessar dados sensíveis.</span>
                    </li>
                    <li className="flex items-start">
                      <Shield className="h-4 w-4 mr-2 mt-0.5 text-brand-green" />
                      <span>Não clique em links suspeitos e não forneça informações pessoais por meios não seguros.</span>
                    </li>
                  </ul>
                </div>
                
                <Button variant="outline" className="w-full" onClick={() => {
                  toast({
                    title: "Dicas de segurança",
                    description: "Visite nossa página de dicas para mais informações sobre segurança digital.",
                  });
                }}>
                  <Shield className="mr-2 h-4 w-4" />
                  Ver mais dicas de segurança
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Profile;
