
import { Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

interface ProcessPaymentParams {
  stripe: Stripe;
  elements: StripeElements;
  cardName: string;
  email: string;
  total: number;
  orderId: string;
  userId: string;
}

export const processPayment = async ({
  stripe,
  elements,
  cardName,
  email,
  total,
  orderId,
  userId,
}: ProcessPaymentParams) => {
  // Get card element
  const cardElement = elements.getElement('card') as StripeCardElement;
  if (!cardElement) throw new Error('No se pudo acceder al elemento de tarjeta');

  // Create payment method
  const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
    type: 'card',
    card: cardElement,
    billing_details: {
      name: cardName,
      email: email || 'cliente@ejemplo.com',
    },
  });

  if (pmError) throw new Error(pmError.message);

  // For development, simulate a successful response
  // In production, uncomment and use the API call code
  
  return {
    success: true,
    paymentIntentId: `sim_${orderId}`,
  };
  
  /* In production, use this code instead:
  const API_URL = import.meta.env.VITE_API_URL || 'https://localhost:3000';
  
  const response = await fetch(`${API_URL}/api/create-payment-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: Math.round(total * 1.21 * 100),
      currency: 'eur',
      orderId,
      paymentMethod: paymentMethod.id,
      userId,
    }),
    credentials: 'include',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error en PaymentIntent: ${errorText}`);
  }

  const { clientSecret } = await response.json();
  
  const { error, paymentIntent } = await stripe.confirmCardPayment(
    clientSecret,
    {
      payment_method: paymentMethod.id,
    }
  );

  if (error) throw new Error(error.message);

  if (paymentIntent.status === 'requires_action') {
    const { error: confirmError } = await stripe.confirmCardPayment(clientSecret);
    if (confirmError) throw new Error(confirmError.message);
  }

  if (
    paymentIntent.status === 'succeeded' ||
    paymentIntent.status === 'requires_capture'
  ) {
    return {
      success: true,
      paymentIntentId: paymentIntent.id,
    };
  }
  
  throw new Error('El pago no pudo completarse.');
  */
};
