import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Scanner from './pages/Scanner';
import RecyclingMap from './pages/RecyclingMap';
import Education from './pages/Education';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import DisposalLocator from './pages/DisposalLocator';
import Auth from './pages/Auth';

function AppRoutes() {
  const { currentUser } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      {currentUser && <Navbar />}
      <main className={`${currentUser ? 'container mx-auto px-4 py-8' : ''}`}>
        <Routes>
          <Route path="/auth" element={
            currentUser ? <Navigate to="/" replace /> : <Auth />
          } />
          <Route path="/" element={
            currentUser ? <Home /> : <Navigate to="/auth" replace />
          } />
          <Route path="/scanner" element={
            currentUser ? <Scanner /> : <Navigate to="/auth" replace />
          } />
          <Route path="/map" element={
            currentUser ? <RecyclingMap /> : <Navigate to="/auth" replace />
          } />
          <Route path="/disposal" element={
            currentUser ? <DisposalLocator /> : <Navigate to="/auth" replace />
          } />
          <Route path="/education" element={
            currentUser ? <Education /> : <Navigate to="/auth" replace />
          } />
          <Route path="/profile" element={
            currentUser ? <Profile /> : <Navigate to="/auth" replace />
          } />
          <Route path="/subscription" element={
            currentUser ? <Subscription /> : <Navigate to="/auth" replace />
          } />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;