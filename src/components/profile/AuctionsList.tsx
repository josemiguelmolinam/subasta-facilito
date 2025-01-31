import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, MessageCircle, CreditCard } from "lucide-react";
import { formatTimeLeft } from "@/lib/utils/date";

interface Auction {
  id: string;
  title: string;
  imageUrl: string;
  currentBid: number;
  endDate: Date;
  status: 'active' | 'outbid' | 'won' | 'lost';
  lastBid?: number;
}

interface AuctionsListProps {
  auctions: Auction[];
  onViewDetails: (id: string) => void;
  onContactSeller: (id: string) => void;
  onProcessPayment: (id: string) => void;
}

export const AuctionsList = ({
  auctions,
  onViewDetails,
  onContactSeller,
  onProcessPayment
}: AuctionsListProps) => {
  const getStatusBadge = (status: Auction['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800">En curso</Badge>;
      case 'outbid':
        return <Badge className="bg-blue-100 text-blue-800">Superado</Badge>;
      case 'won':
        return <Badge className="bg-yellow-100 text-yellow-800">Ganada</Badge>;
      case 'lost':
        return <Badge className="bg-red-100 text-red-800">No ganada</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {auctions.map((auction) => (
        <Card key={auction.id} className="overflow-hidden">
          <div className="flex">
            <div className="w-48 h-48">
              <img
                src={auction.imageUrl}
                alt={auction.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">{auction.title}</h3>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span className="text-sm text-gray-500">
                      {formatTimeLeft(auction.endDate)}
                    </span>
                  </div>
                </div>
                {getStatusBadge(auction.status)}
              </div>
              
              <div className="mt-4 flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewDetails(auction.id)}
                >
                  Ver detalles
                </Button>
                
                {auction.status === 'won' && (
                  <Button
                    size="sm"
                    onClick={() => onProcessPayment(auction.id)}
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Procesar pago
                  </Button>
                )}
                
                {auction.status === 'lost' && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onContactSeller(auction.id)}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contactar vendedor
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};