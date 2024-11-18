import FacilityCard from './FacilityCard';
import { Facility } from '../../types/DisposalTypes';

interface FacilityListProps {
  facilities: Facility[];
  favorites: string[];
  onToggleFavorite: (facilityId: string) => void;
  selectedFacility: string | null;
  onSelectFacility: (id: string) => void;
}

export default function FacilityList({
  facilities,
  favorites,
  onToggleFavorite,
  selectedFacility,
  onSelectFacility
}: FacilityListProps) {
  if (facilities.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-600">No facilities found. Try adjusting your search criteria.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {facilities.map(facility => (
        <div
          key={facility.id}
          className={`cursor-pointer transition-all ${
            selectedFacility === facility.id ? 'ring-2 ring-green-500 rounded-lg' : ''
          }`}
          onClick={() => onSelectFacility(facility.id)}
        >
          <FacilityCard
            facility={facility}
            isFavorite={favorites.includes(facility.id)}
            onToggleFavorite={() => onToggleFavorite(facility.id)}
          />
        </div>
      ))}
    </div>
  );
}