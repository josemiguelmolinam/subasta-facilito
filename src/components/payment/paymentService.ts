
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

  // Para desarrollo, simulamos una respuesta exitosa
  // En producción, descomentar y usar el código de llamada a la API
  
  return {
    success: true,
    paymentIntentId: `pi_${Date.now()}`,
  };
  
  /* En producción, usar este código:
  
  // Opción 1: Checkout Sessions API (más sencillo)
  const API_URL = import.meta.env.VITE_API_URL || 'https://api.tudominio.com';
  
  try {
    const response = await fetch(`${API_URL}/api/create-checkout-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentMethodId: paymentMethod.id,
        amount: Math.round(total * 1.21 * 100), // en centavos
        description: `Pedido #${orderId}`,
        customerEmail: email,
        metadata: {
          orderId,
          userId
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al procesar el pago');
    }

    const { sessionId } = await response.json();
    
    // Redirigir al Checkout si es necesario o confirmar directamente
    const { error } = await stripe.confirmCardPayment(sessionId);
    
    if (error) {
      throw new Error(error.message);
    }
    
    return {
      success: true,
      paymentIntentId: sessionId,
    };
  } catch (error) {
    throw new Error(error.message);
  }
  
  // Opción 2: Payment Intents API (más control)
  const response = await fetch(`${API_URL}/api/create-payment-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      amount: Math.round(total * 1.21 * 100), // en centavos
      currency: 'eur',
      payment_method_types: ['card'],
      payment_method: paymentMethod.id,
      confirm: true,
      description: `Pedido #${orderId}`,
      metadata: {
        orderId,
        userId
      },
      receipt_email: email,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error en PaymentIntent: ${errorText}`);
  }

  const { clientSecret, paymentIntentId } = await response.json();
  
  const { error, paymentIntent } = await stripe.confirmCardPayment(
    clientSecret
  );

  if (error) throw new Error(error.message);

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
