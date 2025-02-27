
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";
import { formatCurrency } from "@/lib/utils/currency";

interface PricingCardProps {
  title: string;
  price: number;
  description: string;
  features: string[];
  isPopular?: boolean;
  ctaText: string;
  onSelectPlan: () => void;
}

export const PricingCard = ({
  title,
  price,
  description,
  features,
  isPopular = false,
  ctaText,
  onSelectPlan,
}: PricingCardProps) => {
  return (
    <Card className={`w-full h-full transition-all duration-300 hover:shadow-xl ${
      isPopular 
        ? "border-auction-primary shadow-auction-primary/20 scale-105 relative z-10" 
        : "hover:scale-102"
    }`}>
      {isPopular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <div className="bg-gradient-to-r from-auction-primary to-auction-tertiary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
            Más popular
          </div>
        </div>
      )}
      <CardHeader className={`${isPopular ? "bg-gradient-to-br from-auction-soft to-white" : ""} rounded-t-lg pb-6`}>
        <CardTitle className="text-2xl font-bold text-center text-auction-dark">{title}</CardTitle>
        <CardDescription className="text-center text-muted-foreground pt-2">{description}</CardDescription>
        <div className="mt-4 text-center">
          <span className="text-4xl font-bold bg-gradient-to-r from-auction-primary to-auction-tertiary bg-clip-text text-transparent">{formatCurrency(price)}</span>
          <span className="text-muted-foreground">/mes</span>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start group">
              <div className="rounded-full bg-auction-soft p-1 mr-3 group-hover:bg-auction-primary/20 transition-colors">
                <Check className="h-4 w-4 text-auction-primary" />
              </div>
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter className="pt-4">
        <Button 
          onClick={onSelectPlan} 
          className={`w-full ${
            isPopular 
              ? "bg-gradient-to-r from-auction-primary to-auction-tertiary hover:from-auction-tertiary hover:to-auction-primary text-white shadow-md" 
              : "bg-white border border-auction-primary/70 text-auction-primary hover:bg-auction-soft/30"
          }`}
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
};
