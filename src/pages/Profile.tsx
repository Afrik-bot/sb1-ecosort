import { useState } from 'react';
import { UserIcon, ChartBarIcon, CalendarIcon } from '@heroicons/react/24/outline';
import SubscriptionButton from '../components/SubscriptionButton';

function Profile() {
  const [stats] = useState({
    itemsRecycled: 156,
    co2Saved: "34.5",
    streakDays: 12
  });

  const [currentPlan, setCurrentPlan] = useState<'Free' | 'Premium'>('Free');

  const [achievements] = useState([
    {
      id: 1,
      title: "Recycling Pioneer",
      description: "Recycled first 100 items",
      completed: true
    },
    {
      id: 2,
      title: "Eco Warrior",
      description: "Maintained 10-day recycling streak",
      completed: true
    },
    {
      id: 3,
      title: "Master Sorter",
      description: "Achieved 95% sorting accuracy",
      completed: false
    }
  ]);

  const handleSubscribe = async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    // In a real app, this would handle payment processing
    setCurrentPlan('Premium');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-green-100 p-4 rounded-full">
              <UserIcon className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">John Doe</h1>
              <p className="text-gray-600">Eco Warrior Level 5</p>
            </div>
          </div>
          <SubscriptionButton 
            currentPlan={currentPlan}
            onSubscribe={handleSubscribe}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{stats.itemsRecycled}</p>
            <p className="text-sm text-gray-600">Items Recycled</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{stats.co2Saved}kg</p>
            <p className="text-sm text-gray-600">CO₂ Saved</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{stats.streakDays}</p>
            <p className="text-sm text-gray-600">Day Streak</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Achievements</h2>
        <div className="space-y-4">
          {achievements.map(achievement => (
            <div key={achievement.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-full ${achievement.completed ? 'bg-green-100' : 'bg-gray-200'}`}>
                <ChartBarIcon className={`h-6 w-6 ${achievement.completed ? 'text-green-600' : 'text-gray-400'}`} />
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">{achievement.title}</h3>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
              {achievement.completed && (
                <span className="ml-auto text-green-600">✓</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;