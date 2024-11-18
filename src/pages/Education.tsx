import { useState } from 'react';
import { BookOpenIcon, LightBulbIcon, CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { RECYCLING_BASICS, PLASTIC_TYPES, COMPOSTING_GUIDE, QUICK_TIPS } from '../data/educationContent';
import { SUBSCRIPTION_PLANS } from '../data/subscriptionPlans';
import type { Article } from '../types/EducationTypes';

function Education() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [currentPlan] = useState(SUBSCRIPTION_PLANS[0]); // Default to free plan

  const articles = [RECYCLING_BASICS, PLASTIC_TYPES, COMPOSTING_GUIDE];

  const handleArticleClick = (article: Article) => {
    if (article.isPremium && currentPlan.name === 'Free') {
      setShowUpgradeModal(true);
    } else {
      setSelectedArticle(article);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        Education Hub
      </h1>

      {!selectedArticle ? (
        <div className="grid md:grid-cols-2 gap-6">
          {articles.map(article => {
            const Icon = article.id === 'basics' ? BookOpenIcon :
                        article.id === 'plastics' ? LightBulbIcon : CheckCircleIcon;
            return (
              <div
                key={article.id}
                onClick={() => handleArticleClick(article)}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer relative"
              >
                <div className="flex items-center mb-4">
                  <Icon className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <h2 className="text-xl font-semibold">{article.title}</h2>
                    <span className="text-sm text-green-600">
                      {article.isPremium ? 'Premium' : 'Free'}
                    </span>
                  </div>
                  {article.isPremium && currentPlan.name === 'Free' && (
                    <LockClosedIcon className="h-5 w-5 text-gray-400 absolute top-4 right-4" />
                  )}
                </div>
                <p className="text-gray-600">{article.description}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <button
            onClick={() => setSelectedArticle(null)}
            className="text-green-600 mb-4 hover:text-green-700"
          >
            ← Back to Articles
          </button>
          
          <h2 className="text-2xl font-bold mb-6">{selectedArticle.title}</h2>
          
          {selectedArticle.sections.map((section, index) => {
            const isAccessible = !section.isPremium || currentPlan.name === 'Premium';
            
            return (
              <div key={index} className="mb-8">
                <h3 className="text-xl font-semibold mb-3">{section.title}</h3>
                {isAccessible ? (
                  <>
                    <div className="prose max-w-none">
                      {section.content.split('\n').map((paragraph, i) => (
                        <p key={i} className="mb-2">{paragraph}</p>
                      ))}
                    </div>
                    {section.images?.map((image, i) => (
                      <img
                        key={i}
                        src={image}
                        alt={`${section.title} illustration ${i + 1}`}
                        className="mt-4 rounded-lg"
                      />
                    ))}
                  </>
                ) : (
                  <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="text-gray-600">
                        This content is exclusive to Premium members
                      </p>
                      <button
                        onClick={() => setShowUpgradeModal(true)}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      >
                        Upgrade to Premium
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <div className="mt-8 bg-green-50 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4 text-green-800">Quick Tips</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {QUICK_TIPS.map(tip => {
            const isAccessible = !tip.isPremium || currentPlan.name === 'Premium';
            
            return (
              <div
                key={tip.id}
                className={`p-4 rounded-lg ${
                  isAccessible ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{tip.title}</h3>
                    {isAccessible ? (
                      <p className="text-gray-600">{tip.description}</p>
                    ) : (
                      <p className="text-gray-400">Premium content</p>
                    )}
                  </div>
                  {tip.isPremium && currentPlan.name === 'Free' && (
                    <LockClosedIcon className="h-5 w-5 text-gray-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Unlock Premium Content</h2>
            <p className="text-gray-600 mb-4">
              Get access to exclusive guides, detailed instructions, and expert tips
            </p>
            <div className="flex-1 overflow-y-auto pr-2">
              <ul className="space-y-3 mb-6">
                {SUBSCRIPTION_PLANS[1].features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-end space-x-4 pt-4 border-t mt-4">
              <button
                onClick={() => setShowUpgradeModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Maybe Later
              </button>
              <button
                onClick={() => {
                  // Handle payment processing
                  setShowUpgradeModal(false);
                }}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Upgrade Now - ${SUBSCRIPTION_PLANS[1].price}/month
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Education;