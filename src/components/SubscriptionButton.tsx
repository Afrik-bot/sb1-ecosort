import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

interface SubscriptionButtonProps {
  currentPlan: 'Free' | 'Premium';
  onSubscribe?: () => Promise<void>;
}

export default function SubscriptionButton({ currentPlan, onSubscribe }: SubscriptionButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClick = async () => {
    if (currentPlan === 'Free') {
      navigate('/subscription');
    } else if (onSubscribe) {
      setIsLoading(true);
      setError(null);
      try {
        await onSubscribe();
      } catch (err) {
        setError('Unable to process subscription. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (currentPlan === 'Premium') {
    return (
      <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-lg">
        <span className="text-sm font-medium">Premium Member</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-start">
      <button
        onClick={handleClick}
        disabled={isLoading}
        className="group relative inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        aria-label="Upgrade to Premium"
      >
        <span className="flex items-center">
          {isLoading ? (
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <span className="mr-2">Upgrade to Premium</span>
              <span className="font-medium">$4.99/month</span>
              <ArrowRightIcon className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </span>
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}