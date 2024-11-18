import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null>;

const DEMO_MODE = true; // Toggle this for production

export const getStripe = () => {
  if (!stripePromise) {
    if (DEMO_MODE) {
      // In demo mode, simulate Stripe functionality
      stripePromise = Promise.resolve({
        redirectToCheckout: async () => ({ error: null })
      } as unknown as Stripe);
    } else {
      const key = import.meta.env.VITE_STRIPE_PUBLIC_KEY;
      if (!key) {
        throw new Error('Stripe publishable key is not configured');
      }
      stripePromise = loadStripe(key);
    }
  }
  return stripePromise;
};

export const createSubscription = async (priceId: string): Promise<{ sessionId: string }> => {
  try {
    // In demo mode, simulate a successful response
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      sessionId: 'demo_session_' + Date.now()
    };
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw new Error('Failed to create subscription');
  }
};