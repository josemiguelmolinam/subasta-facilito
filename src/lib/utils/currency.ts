export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
};

export const calculateNextMinimumBid = (currentBid: number): number => {
  if (currentBid < 100) return currentBid + 5;
  if (currentBid < 500) return currentBid + 10;
  if (currentBid < 1000) return currentBid + 50;
  if (currentBid < 5000) return currentBid + 100;
  return currentBid + 500;
};