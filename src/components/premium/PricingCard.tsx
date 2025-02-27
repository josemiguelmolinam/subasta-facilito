
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
          <div className="bg-auction-primary text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
            Más popular
          </div>
        </div>
      )}
      <CardHeader className={`${isPopular ? "bg-auction-soft/30" : ""} rounded-t-lg pb-6`}>
        <CardTitle className="text-2xl font-bold text-center text-auction-dark">{title}</CardTitle>
        <CardDescription className="text-center text-muted-foreground pt-2">{description}</CardDescription>
        <div className="mt-4 text-center">
          <span className="text-4xl font-bold text-auction-primary">{formatCurrency(price)}</span>
          <span className="text-muted-foreground">/mes</span>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="h-5 w-5 text-auction-primary mr-2 mt-0.5 flex-shrink-0" />
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
              ? "bg-auction-primary hover:bg-auction-secondary text-white" 
              : "bg-white border border-auction-primary/70 text-auction-primary hover:bg-auction-soft/30"
          }`}
        >
          {ctaText}
        </Button>
      </CardFooter>
    </Card>
  );
};
