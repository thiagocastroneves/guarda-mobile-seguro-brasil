
import { useState, useEffect, useRef } from "react";
import { Send, User, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { ChatMessage } from "@/integrations/supabase/types.d";

const ChatAssistant = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Fetch chat history
    const fetchChatHistory = async () => {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session?.session) return;
      
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', session.session.user.id)
        .order('created_at', { ascending: true });
        
      if (error) {
        console.error("Error fetching chat history:", error);
      } else if (data && data.length > 0) {
        setMessages(data as ChatMessage[]);
      } else {
        // Add welcome message if no chat history
        const welcomeMessage = {
          id: "welcome",
          user_id: session.session.user.id,
          sender: "system" as const,
          message: "Olá! Sou o assistente do GuardaMobile. Como posso ajudar você hoje?",
          created_at: new Date().toISOString()
        };
        setMessages([welcomeMessage]);
      }
    };
    
    fetchChatHistory();
  }, []);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const { data: session } = await supabase.auth.getSession();
    if (!session?.session) return;
    
    const userMessage = {
      id: Date.now().toString(),
      user_id: session.session.user.id,
      sender: "user" as const,
      message: inputValue,
      created_at: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    
    try {
      // Save user message to Supabase
      await supabase.from('chat_messages').insert([{
        user_id: session.session.user.id,
        sender: 'user',
        message: inputValue
      }]);
      
      // Generate bot response based on user input
      let botResponse = "";
      const lowerInput = inputValue.toLowerCase();
      
      if (lowerInput.includes('roubado') || lowerInput.includes('roubo')) {
        botResponse = "Sinto muito pelo ocorrido. Para casos de roubo, recomendo imediatamente: 1) Bloqueie seu aparelho remotamente; 2) Bloqueie seus cartões e contas bancárias; 3) Contate sua operadora para bloquear o número e IMEI; 4) Registre um boletim de ocorrência. Posso te auxiliar em algum desses passos?";
      } else if (lowerInput.includes('perdi') || lowerInput.includes('perda')) {
        botResponse = "Perder o celular é frustrante. Como primeiro passo, tente localizar seu dispositivo usando ferramentas como 'Encontre Meu Dispositivo' (Android) ou 'Buscar iPhone' (iOS). Caso não consiga localizá-lo, recomendo seguir os passos de bloqueio de dispositivo, contas e chip. Posso ajudar com alguma dessas etapas?";
      } else if (lowerInput.includes('dica') || lowerInput.includes('prevenir')) {
        botResponse = "Aqui vão algumas dicas preventivas: 1) Mantenha seu dispositivo bloqueado com senha forte, biometria ou reconhecimento facial; 2) Ative a localização remota; 3) Faça backups regulares; 4) Evite usar o celular em locais de risco ou expostos; 5) Instale aplicativos de segurança confiáveis; 6) Anote o número IMEI (digite *#06# para visualizar).";
      } else {
        botResponse = "Estou aqui para ajudar com questões relacionadas à segurança do seu dispositivo. Posso ajudar com orientações em caso de roubo, perda ou fornecer dicas preventivas. Como posso te auxiliar hoje?";
      }
      
      // Add bot response
      const botMessage = {
        id: (Date.now() + 1).toString(),
        user_id: session.session.user.id,
        sender: "system" as const,
        message: botResponse,
        created_at: new Date().toISOString()
      };
      
      // Simulate delay for more natural conversation
      setTimeout(async () => {
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
        
        // Save bot message to Supabase
        await supabase.from('chat_messages').insert([{
          user_id: session.session.user.id,
          sender: 'system',
          message: botResponse
        }]);
      }, 1000);
    } catch (error) {
      console.error("Error in chat:", error);
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const renderSuggestionButtons = () => {
    const suggestions = [
      "Meu celular foi roubado",
      "Perdi meu celular",
      "Preciso de dicas preventivas"
    ];
    
    // Only show suggestions when there are few messages
    if (messages.length <= 2) {
      return (
        <div className="flex flex-wrap gap-2 mb-3">
          {suggestions.map((suggestion, index) => (
            <Button
              key={index}
              variant="outline"
              size="sm"
              className="text-xs h-auto py-1"
              onClick={() => {
                setInputValue(suggestion);
                setTimeout(() => handleSendMessage(), 100);
              }}
            >
              {suggestion}
            </Button>
          ))}
        </div>
      );
    }
    
    return null;
  };
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Bot className="h-6 w-6 mr-2" />
          Assistente GuardaMobile
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[400px] overflow-y-auto mb-4 p-2">
          {messages.map((msg, index) => (
            <div
              key={msg.id || index}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} mb-3`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  msg.sender === 'user'
                    ? 'bg-brand-blue text-white'
                    : 'bg-gray-100 dark:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {msg.sender === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                  <span className="font-semibold text-xs">
                    {msg.sender === 'user' ? 'Você' : 'Assistente'}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start mb-3">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg px-4 py-2">
                <p className="text-sm">Digitando...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef}></div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-stretch">
        {renderSuggestionButtons()}
        <div className="flex w-full gap-2">
          <Input
            placeholder="Digite sua mensagem..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={isLoading || !inputValue.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChatAssistant;
