import { useState } from "react";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { formatCurrency } from "@/lib/utils/currency";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { 
  Hammer, 
  AlertCircle, 
  ArrowLeft, 
  TrendingUp, 
  History, 
  Shield, 
  Clock, 
  Eye,
  ChartBar,
  Info
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const PlaceBid = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [bidAmount, setBidAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data - In a real app, this would come from your API
  const auction = {
    id,
    title: "iPhone 15 Pro Max - 256GB",
    currentBid: 950,
    minimumBid: 960,
    imageUrl: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80",
    endTime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2),
    totalViews: 324,
    totalBids: 15,
    bidHistory: [
      { id: 1, user: "User123", amount: 950, date: "2024-01-27 15:30" },
      { id: 2, user: "Bidder456", amount: 900, date: "2024-01-27 15:15" },
      { id: 3, user: "Collector789", amount: 850, date: "2024-01-27 15:00" },
    ],
    bidIncrements: [
      { range: "0-99", increment: 5 },
      { range: "100-499", increment: 10 },
      { range: "500-999", increment: 25 },
      { range: "1000+", increment: 50 },
    ]
  };

  const handleBidSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const bidValue = parseFloat(bidAmount);
    
    if (isNaN(bidValue)) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Por favor, introduce una cantidad válida",
      });
      setIsSubmitting(false);
      return;
    }

    if (bidValue <= auction.currentBid) {
      toast({
        variant: "destructive",
        title: "Puja insuficiente",
        description: `Tu puja debe ser superior a ${formatCurrency(auction.currentBid)}`,
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Aquí iría la lógica para enviar la puja al backend
      console.log("Enviando puja:", { auctionId: id, amount: bidValue });
      
      toast({
        title: "¡Puja realizada con éxito!",
        description: `Has pujado ${formatCurrency(bidValue)} por este artículo`,
      });
      
      // Redirigir al detalle de la subasta
      navigate(`/auction/${id}`);
    } catch (error) {
      console.error("Error al realizar la puja:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo procesar tu puja. Por favor, inténtalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const timeLeft = () => {
    const now = new Date();
    const diff = auction.endTime.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${days}d ${hours}h ${minutes}m`;
  };

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate(`/auction/${id}`)}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Volver a la subasta
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Columna izquierda - Imagen y detalles */}
          <div className="space-y-6">
            <Card className="overflow-hidden">
              <div className="relative aspect-square">
                <img
                  src={auction.imageUrl}
                  alt={auction.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 right-4 flex gap-2">
                  <Badge variant="secondary" className="bg-white/80">
                    <Eye className="w-4 h-4 mr-1" />
                    {auction.totalViews} vistas
                  </Badge>
                  <Badge variant="secondary" className="bg-white/80">
                    <ChartBar className="w-4 h-4 mr-1" />
                    {auction.totalBids} pujas
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-auction-dark mb-4">
                  {auction.title}
                </h2>
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-sm text-gray-600">Puja actual</span>
                    <div className="text-2xl font-bold text-auction-primary">
                      {formatCurrency(auction.currentBid)}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-600">Tiempo restante</span>
                    <div className="text-lg font-semibold text-auction-tertiary flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {timeLeft()}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Historial de pujas */}
            <Card className="p-6">
              <div className="flex items-center mb-4">
                <History className="w-5 h-5 text-auction-secondary mr-2" />
                <h3 className="text-lg font-semibold">Historial de pujas</h3>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Cantidad</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {auction.bidHistory.map((bid) => (
                    <TableRow key={bid.id}>
                      <TableCell className="font-medium">{bid.user}</TableCell>
                      <TableCell>{formatCurrency(bid.amount)}</TableCell>
                      <TableCell>{bid.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>

          {/* Columna derecha - Formulario de puja */}
          <div>
            <Card className="p-6">
              <form onSubmit={handleBidSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-auction-dark flex items-center">
                      <Hammer className="w-5 h-5 mr-2" />
                      Realizar puja
                    </h3>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Info className="w-5 h-5 text-auction-secondary" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Las pujas son vinculantes y no pueden ser canceladas</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  
                  <div className="bg-auction-soft p-4 rounded-lg">
                    <div className="flex items-center text-auction-secondary mb-2">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      <span>Puja mínima</span>
                    </div>
                    <p className="text-lg font-semibold text-auction-primary">
                      {formatCurrency(auction.minimumBid)}
                    </p>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="increments">
                      <AccordionTrigger className="text-sm text-auction-secondary">
                        Ver incrementos de puja
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="space-y-2">
                          {auction.bidIncrements.map((increment, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{increment.range}€</span>
                              <span>+{increment.increment}€</span>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>

                  <div className="space-y-2">
                    <label htmlFor="bidAmount" className="text-sm font-medium text-gray-700">
                      Tu puja
                    </label>
                    <div className="relative">
                      <Input
                        id="bidAmount"
                        type="number"
                        step="0.01"
                        min={auction.minimumBid}
                        value={bidAmount}
                        onChange={(e) => setBidAmount(e.target.value)}
                        className="pl-8 text-lg"
                        placeholder={`${auction.minimumBid}`}
                      />
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        €
                      </span>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 mr-2" />
                      <div className="text-sm text-yellow-700">
                        <p className="font-medium mb-1">Información importante</p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Tu puja es vinculante y no puede ser cancelada</li>
                          <li>Asegúrate de revisar todos los detalles antes de pujar</li>
                          <li>La puja más alta gana cuando finalice la subasta</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start">
                      <Shield className="w-5 h-5 text-green-600 mt-0.5 mr-2" />
                      <div className="text-sm text-green-700">
                        <p className="font-medium mb-1">Garantía Subastalo</p>
                        <ul className="list-disc pl-4 space-y-1">
                          <li>Pago seguro garantizado</li>
                          <li>Protección al comprador</li>
                          <li>Soporte 24/7</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-auction-primary hover:bg-auction-secondary text-white text-lg py-6 transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="animate-spin mr-2">
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                      </div>
                      Procesando...
                    </div>
                  ) : (
                    <>
                      <Hammer className="w-5 h-5 mr-2" />
                      Confirmar puja
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PlaceBid;