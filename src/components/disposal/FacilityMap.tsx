import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Facility } from '../../types/DisposalTypes';

interface FacilityMapProps {
  facilities: Facility[];
  selectedFacility: string | null;
  onSelectFacility: (id: string) => void;
}

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

export default function FacilityMap({ facilities, selectedFacility, onSelectFacility }: FacilityMapProps) {
  const center = facilities.length > 0
    ? [facilities[0].coordinates.latitude, facilities[0].coordinates.longitude]
    : [36.7783, -119.4179]; // California center

  return (
    <div className="h-[500px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[center[0], center[1]]}
        zoom={facilities.length > 0 ? 12 : 6}
        className="h-full w-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {facilities.map(facility => (
          <Marker
            key={facility.id}
            position={[facility.coordinates.latitude, facility.coordinates.longitude]}
            eventHandlers={{
              click: () => onSelectFacility(facility.id)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{facility.name}</h3>
                <p className="text-sm">{facility.address}</p>
                <p className="text-sm">{facility.city}, {facility.state} {facility.zipCode}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}