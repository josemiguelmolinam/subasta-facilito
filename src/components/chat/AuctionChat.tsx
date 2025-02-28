
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageCircle, Send, X, MinusCircle, Info, ChevronUp, Clock, CheckCheck, CheckCircle, CircleOff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  content: string;
  timestamp: Date;
  isMe: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

interface AuctionChatProps {
  auctionId: string;
  auctionTitle: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar?: string;
}

// Mock data - en un caso real esto vendría de una BD
const MOCK_MESSAGES: Message[] = [
  {
    id: "1",
    senderId: "seller1",
    senderName: "TechStore Official",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    content: "¡Hola! Gracias por tu interés en este producto. Estoy aquí para responder cualquier duda que tengas.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 día atrás
    isMe: false,
  },
  {
    id: "2",
    senderId: "me",
    senderName: "Yo",
    content: "Hola, ¿El iPhone tiene garantía oficial de Apple?",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 horas atrás
    isMe: true,
    status: 'read'
  },
  {
    id: "3",
    senderId: "seller1",
    senderName: "TechStore Official",
    senderAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix",
    content: "Sí, el dispositivo tiene garantía oficial de Apple por 1 año a partir de la fecha de compra.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutos atrás
    isMe: false,
  },
];

export const AuctionChat = ({ auctionId, auctionTitle, sellerId, sellerName, sellerAvatar }: AuctionChatProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Message[]>(MOCK_MESSAGES);
  const [newMessage, setNewMessage] = useState("");
  const [minimized, setMinimized] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [sellerTyping, setSellerTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();

  // Scroll al último mensaje cuando se abre el chat o llega uno nuevo
  useEffect(() => {
    if (isOpen && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Limpiar conteo de no leídos cuando se abre
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const formatMessageTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = diffMs / (1000 * 60 * 60);
    
    if (diffHrs < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffHrs < 48) {
      return 'Ayer ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit' });
    }
  };

  const getMessageStatusIcon = (status?: 'sent' | 'delivered' | 'read') => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="h-3 w-3 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="h-3 w-3 text-gray-400" />;
      case 'read':
        return <CheckCheck className="h-3 w-3 text-blue-500" />;
      default:
        return <CircleOff className="h-3 w-3 text-gray-400" />;
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg: Message = {
      id: Date.now().toString(),
      senderId: "me",
      senderName: "Yo",
      content: newMessage.trim(),
      timestamp: new Date(),
      isMe: true,
      status: 'sent'
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");

    // Actualizar estado del mensaje a entregado después de un momento
    setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => 
          msg.id === newMsg.id ? {...msg, status: 'delivered'} : msg
        )
      );
    }, 1000);

    // Mostrar que el vendedor está escribiendo
    setTimeout(() => {
      setSellerTyping(true);
      
      // Simulamos respuesta automática después de un momento
      setTimeout(() => {
        setSellerTyping(false);
        
        const autoReply: Message = {
          id: (Date.now() + 1).toString(),
          senderId: sellerId,
          senderName: sellerName,
          senderAvatar: sellerAvatar,
          content: "Gracias por tu mensaje. Te responderé a la brevedad posible.",
          timestamp: new Date(),
          isMe: false,
        };
        
        setMessages(prevMessages => [...prevMessages, autoReply]);
        
        // Marcar nuestro mensaje como leído
        setTimeout(() => {
          setMessages(prevMessages => 
            prevMessages.map(msg => 
              msg.id === newMsg.id ? {...msg, status: 'read'} : msg
            )
          );
        }, 1000);
        
        // Si el chat está minimizado, aumentamos el contador de no leídos
        if (minimized) {
          setUnreadCount(prev => prev + 1);
        }
      }, 3000);
    }, 1500);

    // Foco en el textarea después de enviar
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Para chat flotante cuando no usamos el Sheet
  const renderChatFloating = () => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed bottom-0 right-4 z-50 w-80 sm:w-96 rounded-t-lg shadow-2xl bg-white flex flex-col border border-gray-200 max-h-[500px]">
        {/* Header */}
        <div className="p-3 border-b flex justify-between items-center bg-gradient-to-r from-primary to-purple-700 text-white rounded-t-lg">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={sellerAvatar} />
              <AvatarFallback>{sellerName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-sm">{sellerName}</h3>
              <div className="flex items-center">
                <div className="h-2 w-2 rounded-full bg-green-400 mr-1.5"></div>
                <p className="text-xs opacity-80 truncate max-w-[160px]">En línea</p>
              </div>
            </div>
          </div>
          <div className="flex gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white hover:bg-white/10"
              onClick={() => setMinimized(true)}
            >
              <MinusCircle className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-white hover:bg-white/10"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Info del producto */}
        <div className="bg-gray-50 p-3 border-b">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gray-200 rounded overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80" 
                alt={auctionTitle}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium truncate">{auctionTitle}</p>
              <div className="flex justify-between items-center">
                <p className="text-xs text-gray-500">ID: {auctionId}</p>
                <Badge variant="outline" className="text-[10px] h-4 px-1">Activo</Badge>
              </div>
            </div>
          </div>
        </div>
        
        {/* Messages area */}
        <ScrollArea className="flex-1 p-3 overflow-y-auto">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isMe ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${message.isMe ? "flex-row-reverse" : ""}`}>
                  {!message.isMe && (
                    <Avatar className="h-8 w-8 flex-shrink-0">
                      <AvatarImage src={message.senderAvatar} />
                      <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div>
                    <div
                      className={`rounded-lg px-3 py-2 ${
                        message.isMe
                          ? "bg-primary text-white"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                    <div className={`flex items-center gap-1 mt-1 ${message.isMe ? 'justify-end' : ''}`}>
                      <p className="text-xs text-gray-500">
                        {formatMessageTime(message.timestamp)}
                      </p>
                      {message.isMe && getMessageStatusIcon(message.status)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {sellerTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[80%]">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={sellerAvatar} />
                    <AvatarFallback>{sellerName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="rounded-lg px-3 py-2 bg-gray-100 text-gray-800">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Escribiendo...</p>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Input area */}
        <div className="p-3 border-t">
          <div className="flex gap-2">
            <Textarea
              ref={textareaRef}
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe un mensaje..."
              className="min-h-[45px] resize-none text-sm"
            />
            <Button
              size="icon"
              onClick={handleSendMessage}
              disabled={newMessage.trim() === ""}
              className="h-[45px] w-[45px] flex-shrink-0 bg-primary hover:bg-primary/90"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            El tiempo de respuesta es aproximadamente 2-4 horas
          </p>
        </div>
      </div>
    );
  };

  // Botón minimizado
  const renderMinimizedButton = () => {
    if (!minimized) return null;
    
    return (
      <Button
        onClick={() => {
          setMinimized(false); 
          setUnreadCount(0);
        }}
        className="fixed bottom-0 right-4 z-50 rounded-t-lg rounded-b-none w-auto px-4 gap-2 shadow-lg"
      >
        <div className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">Chat con {sellerName}</span>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
              {unreadCount}
            </Badge>
          )}
          <ChevronUp className="h-4 w-4" />
        </div>
      </Button>
    );
  };

  // Botón flotante para abrir el chat
  const renderChatButton = () => {
    if (isOpen || minimized) return null;
    
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 rounded-full w-auto px-4 gap-2 shadow-lg"
      >
        <MessageCircle className="h-5 w-5" />
        <span>Chat con vendedor</span>
        {unreadCount > 0 && (
          <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
            {unreadCount}
          </Badge>
        )}
      </Button>
    );
  };

  return (
    <>
      {renderChatButton()}
      {renderChatFloating()}
      {renderMinimizedButton()}
    </>
  );
};
