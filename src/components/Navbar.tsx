import { Link, useNavigate } from 'react-router-dom';
import { HomeIcon, CameraIcon, MapIcon, AcademicCapIcon, UserIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="bg-green-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl">
            EcoSort
          </Link>
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center space-x-1 hover:bg-green-700 px-3 py-2 rounded">
              <HomeIcon className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link to="/scanner" className="flex items-center space-x-1 hover:bg-green-700 px-3 py-2 rounded">
              <CameraIcon className="h-5 w-5" />
              <span>Scan</span>
            </Link>
            <Link to="/map" className="flex items-center space-x-1 hover:bg-green-700 px-3 py-2 rounded">
              <MapIcon className="h-5 w-5" />
              <span>Map</span>
            </Link>
            <Link to="/disposal" className="flex items-center space-x-1 hover:bg-green-700 px-3 py-2 rounded">
              <TrashIcon className="h-5 w-5" />
              <span>Disposal</span>
            </Link>
            <Link to="/education" className="flex items-center space-x-1 hover:bg-green-700 px-3 py-2 rounded">
              <AcademicCapIcon className="h-5 w-5" />
              <span>Learn</span>
            </Link>
            <Link to="/profile" className="flex items-center space-x-1 hover:bg-green-700 px-3 py-2 rounded">
              <UserIcon className="h-5 w-5" />
              <span>Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 hover:bg-green-700 px-3 py-2 rounded"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}