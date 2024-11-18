import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import SearchForm from '../components/disposal/SearchForm';
import FacilityList from '../components/disposal/FacilityList';
import FacilityMap from '../components/disposal/FacilityMap';
import FacilityFilters from '../components/disposal/FacilityFilters';
import SearchHistory from '../components/disposal/SearchHistory';
import { useSearch } from '../hooks/useSearch';
import { Facility } from '../types/DisposalTypes';

export default function DisposalLocator() {
  const [searchTerm, setSearchTerm] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [facilities, setFacilities] = useState<Facility[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    facilityType: 'all',
    materials: [] as string[],
    region: 'all'
  });

  const { currentUser } = useAuth();

  // Use the search hook
  const searchResults = useSearch({
    facilities,
    searchTerm,
    zipCode,
    filters
  });

  useEffect(() => {
    if (currentUser) {
      loadUserData();
      loadAllFacilities();
    }
  }, [currentUser]);

  const loadUserData = async () => {
    try {
      const favoritesRef = collection(db, 'users', currentUser!.uid, 'favorites');
      const favoritesSnap = await getDocs(favoritesRef);
      setFavorites(favoritesSnap.docs.map(doc => doc.data().facilityId));

      const historyRef = collection(db, 'users', currentUser!.uid, 'searchHistory');
      const historySnap = await getDocs(query(historyRef, where('timestamp', '>', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000))));
      setSearchHistory(historySnap.docs.map(doc => doc.data().searchTerm));
    } catch (err) {
      console.error('Error loading user data:', err);
    }
  };

  const loadAllFacilities = async () => {
    setLoading(true);
    setError(null);

    try {
      const facilitiesRef = collection(db, 'facilities');
      const snapshot = await getDocs(facilitiesRef);
      
      const facilitiesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Facility[];

      setFacilities(facilitiesData);
    } catch (err) {
      console.error('Error loading facilities:', err);
      setError('Failed to load facilities. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (term: string, zip?: string) => {
    setSearchTerm(term);
    setZipCode(zip || '');
    setSelectedFacility(null);
    setError(null);
    setLoading(true);

    try {
      // Save search to history
      if (currentUser && (term || zip)) {
        const searchEntry = zip ? `${term} (${zip})` : term;
        await addDoc(collection(db, 'users', currentUser.uid, 'searchHistory'), {
          searchTerm: searchEntry,
          timestamp: serverTimestamp()
        });
        
        setSearchHistory(prev => [searchEntry, ...prev.filter(t => t !== searchEntry)].slice(0, 10));
      }

      // If ZIP code is provided, fetch facilities for that area
      if (zip) {
        const facilitiesRef = collection(db, 'facilities');
        const zipQuery = query(facilitiesRef, where('zipCode', '==', zip));
        const snapshot = await getDocs(zipQuery);
        
        const zipFacilities = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Facility[];

        setFacilities(zipFacilities);
      }
    } catch (err) {
      console.error('Error during search:', err);
      setError('Failed to perform search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async (facilityId: string) => {
    try {
      if (favorites.includes(facilityId)) {
        const favRef = collection(db, 'users', currentUser!.uid, 'favorites');
        const favQuery = query(favRef, where('facilityId', '==', facilityId));
        const snapshot = await getDocs(favQuery);
        snapshot.docs.forEach(async (doc) => {
          await doc.ref.delete();
        });
        setFavorites(prev => prev.filter(id => id !== facilityId));
      } else {
        await addDoc(collection(db, 'users', currentUser!.uid, 'favorites'), {
          facilityId,
          timestamp: serverTimestamp()
        });
        setFavorites(prev => [...prev, facilityId]);
      }
    } catch (err) {
      console.error('Error toggling favorite:', err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        California Disposal Facility Locator
      </h1>

      <div className="grid lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <SearchForm onSearch={handleSearch} loading={loading} />
            
            {error && (
              <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
                {error}
              </div>
            )}
          </div>

          <FacilityFilters
            filters={filters}
            onChange={setFilters}
          />

          <SearchHistory
            searches={searchHistory}
            onSelectSearch={(search) => {
              const match = search.match(/^(.*?)(?:\s*\((\d{5})\))?$/);
              if (match) {
                handleSearch(match[1], match[2]);
              } else {
                handleSearch(search);
              }
            }}
          />
        </div>

        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <FacilityMap
              facilities={searchResults}
              selectedFacility={selectedFacility}
              onSelectFacility={setSelectedFacility}
            />
          </div>

          <FacilityList
            facilities={searchResults}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            selectedFacility={selectedFacility}
            onSelectFacility={setSelectedFacility}
          />
        </div>
      </div>
    </div>
  );
}