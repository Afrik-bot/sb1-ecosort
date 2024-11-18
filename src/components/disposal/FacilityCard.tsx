import { MapPinIcon, ClockIcon, StarIcon as StarOutline } from '@heroicons/react/24/outline';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { Facility } from '../../types/DisposalTypes';

interface FacilityCardProps {
  facility: Facility;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export default function FacilityCard({ facility, isFavorite, onToggleFavorite }: FacilityCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{facility.name}</h3>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPinIcon className="h-5 w-5 mr-2" />
            <p>{facility.address}, {facility.city}, {facility.state} {facility.zipCode}</p>
          </div>
          <div className="flex items-center mt-2 text-gray-600">
            <ClockIcon className="h-5 w-5 mr-2" />
            <p>{facility.hours}</p>
          </div>
        </div>
        <button
          onClick={onToggleFavorite}
          className="text-yellow-500 hover:text-yellow-600"
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? (
            <StarSolid className="h-6 w-6" />
          ) : (
            <StarOutline className="h-6 w-6" />
          )}
        </button>
      </div>

      <div className="mt-4">
        <h4 className="font-medium text-gray-900 mb-2">Accepted Materials:</h4>
        <div className="flex flex-wrap gap-2">
          {facility.acceptedMaterials.map((material, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
            >
              {material}
            </span>
          ))}
        </div>
      </div>

      {facility.notes && (
        <div className="mt-4 text-sm text-gray-600">
          <p className="font-medium">Additional Notes:</p>
          <p>{facility.notes}</p>
        </div>
      )}
    </div>
  );
}