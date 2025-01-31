import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Wallet, Building2 } from "lucide-react";

interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'paypal' | 'bank_transfer';
  last4?: string;
  brand?: string;
  expiryDate?: string;
}

interface PaymentMethodsProps {
  methods: PaymentMethod[];
  balance: number;
  onAddMethod: () => void;
  onRemoveMethod: (id: string) => void;
}

export const PaymentMethods = ({
  methods,
  balance,
  onAddMethod,
  onRemoveMethod
}: PaymentMethodsProps) => {
  const getMethodIcon = (type: PaymentMethod['type']) => {
    switch (type) {
      case 'credit_card':
        return CreditCard;
      case 'paypal':
        return Wallet;
      case 'bank_transfer':
        return Building2;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Métodos de Pago</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-auction-soft/30 p-4 rounded-lg">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-auction-secondary">
              Saldo disponible
            </span>
            <span className="text-lg font-semibold text-auction-primary">
              {balance.toLocaleString('es-ES', {
                style: 'currency',
                currency: 'EUR'
              })}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {methods.map((method) => {
            const Icon = getMethodIcon(method.type);
            return (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-gray-100 rounded-full">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">
                      {method.type === 'credit_card'
                        ? `${method.brand} ****${method.last4}`
                        : method.type === 'paypal'
                        ? 'PayPal'
                        : 'Transferencia bancaria'}
                    </p>
                    {method.expiryDate && (
                      <p className="text-sm text-gray-500">
                        Expira: {method.expiryDate}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoveMethod(method.id)}
                >
                  Eliminar
                </Button>
              </div>
            );
          })}
        </div>

        <Button onClick={onAddMethod} className="w-full">
          Añadir método de pago
        </Button>
      </CardContent>
    </Card>
  );
};