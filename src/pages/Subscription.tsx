import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/24/outline';
import { SUBSCRIPTION_PLANS } from '../data/subscriptionPlans';
import { getStripe, createSubscription } from '../services/stripeService';

function Subscription() {
  const [selectedPlan, setSelectedPlan] = useState(SUBSCRIPTION_PLANS[1]); // Premium plan
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubscribe = async () => {
    if (isProcessing) return;
    
    setIsProcessing(true);
    setError(null);

    try {
      // Demo mode: Simulate successful subscription
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate('/profile', { 
        state: { 
          subscriptionSuccess: true,
          plan: selectedPlan.name 
        }
      });
    } catch (err) {
      console.error('Subscription error:', err);
      setError('Unable to process payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Choose Your Plan
        </h1>
        <p className="text-xl text-gray-600">
          Unlock premium features and make a bigger environmental impact
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {SUBSCRIPTION_PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-2xl ${
              plan.name === 'Premium' 
                ? 'bg-green-50 border-2 border-green-500'
                : 'bg-white border border-gray-200'
            } p-8 shadow-sm`}
          >
            {plan.name === 'Premium' && (
              <div className="absolute top-0 right-6 transform -translate-y-1/2">
                <span className="inline-flex items-center px-4 py-1 rounded-full text-sm font-semibold bg-green-500 text-white">
                  Recommended
                </span>
              </div>
            )}

            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{plan.name}</h2>
              <div className="mt-4">
                <span className="text-4xl font-bold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-gray-600 ml-2">
                  {plan.price === 0 ? 'Forever' : '/month'}
                </span>
              </div>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <CheckIcon className="h-6 w-6 text-green-500 flex-shrink-0" />
                  <span className="ml-3 text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                setSelectedPlan(plan);
                if (plan.name === 'Premium') {
                  handleSubscribe();
                }
              }}
              disabled={isProcessing || plan.name === 'Free'}
              className={`w-full py-3 px-6 rounded-lg text-center font-semibold ${
                plan.name === 'Premium'
                  ? 'bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed'
                  : 'bg-gray-100 text-gray-600'
              } transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                plan.name === 'Premium' ? 'focus:ring-green-500' : 'focus:ring-gray-500'
              }`}
              aria-label={`Select ${plan.name} plan`}
            >
              {isProcessing && plan.name === 'Premium' ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </div>
              ) : (
                plan.name === 'Premium' ? 'Upgrade Now' : 'Current Plan'
              )}
            </button>
          </div>
        ))}
      </div>

      {error && (
        <div 
          className="text-center p-4 mb-8 bg-red-50 border border-red-200 rounded-lg" 
          role="alert"
        >
          <p className="text-red-600">{error}</p>
          <button
            onClick={() => setError(null)}
            className="mt-2 text-sm text-red-700 hover:text-red-800"
          >
            Try again
          </button>
        </div>
      )}

      <div className="bg-gray-50 rounded-xl p-8 mb-12">
        <h3 className="text-xl font-semibold mb-4">Premium Benefits</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-semibold mb-2">Advanced Recognition</h4>
            <p className="text-gray-600">Enhanced item detection with detailed recycling instructions</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Detailed Analytics</h4>
            <p className="text-gray-600">Track your environmental impact with comprehensive metrics</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Priority Support</h4>
            <p className="text-gray-600">Get help when you need it with dedicated support</p>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-600">
        <p className="mb-2">Secure payment processing by Stripe</p>
        <p className="text-sm">Cancel anytime. No questions asked.</p>
      </div>
    </div>
  );
}

export default Subscription;