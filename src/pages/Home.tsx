import { Link } from 'react-router-dom';
import { CameraIcon, MapIcon, AcademicCapIcon } from '@heroicons/react/24/outline';

function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8 text-green-700">
        Smart Recycling Assistant
      </h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Link to="/scanner" 
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <CameraIcon className="h-12 w-12 text-green-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Scan & Sort</h2>
          <p className="text-gray-600 text-center">
            Identify items and get recycling instructions instantly
          </p>
        </Link>

        <Link to="/map"
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <MapIcon className="h-12 w-12 text-blue-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Find Centers</h2>
          <p className="text-gray-600 text-center">
            Locate nearby recycling centers and drop-off points
          </p>
        </Link>

        <Link to="/education"
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow md:col-span-2">
          <AcademicCapIcon className="h-12 w-12 text-purple-600 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Learn More</h2>
          <p className="text-gray-600 text-center">
            Discover recycling tips and environmental impact
          </p>
        </Link>
      </div>

      <div className="mt-12 p-6 bg-green-50 rounded-lg">
        <h3 className="text-xl font-semibold mb-4 text-green-800">Today's Impact</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">24</p>
            <p className="text-sm text-gray-600">Items Recycled</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">12kg</p>
            <p className="text-sm text-gray-600">CO₂ Saved</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">89%</p>
            <p className="text-sm text-gray-600">Accuracy Rate</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;