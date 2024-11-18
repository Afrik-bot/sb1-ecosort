import { useState, useEffect } from 'react';
import { MapIcon, PhoneIcon, ClockIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import { CALIFORNIA_CENTERS, type RecyclingCenter } from '../data/recyclingCenters';

function RecyclingMap() {
  const [centers, setCenters] = useState<RecyclingCenter[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');

  useEffect(() => {
    filterCenters(selectedRegion, selectedMaterial);
  }, [selectedRegion, selectedMaterial]);

  const filterCenters = (region: string, material: string) => {
    let filtered = [...CALIFORNIA_CENTERS];
    
    if (region !== 'all') {
      filtered = filtered.filter(center => center.region === region);
    }
    
    if (material !== 'all') {
      filtered = filtered.filter(center => 
        center.materials.some(m => m.toLowerCase().includes(material.toLowerCase()))
      );
    }
    
    setCenters(filtered);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        California Recycling Centers
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 space-y-4 md:space-y-0">
          <h2 className="text-xl font-semibold">Find Centers</h2>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            <select
              value={selectedRegion}
              onChange={(e) => setSelectedRegion(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Regions</option>
              <option value="Northern California">Northern California</option>
              <option value="Southern California">Southern California</option>
            </select>
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
              className="border rounded-lg px-3 py-2"
            >
              <option value="all">All Materials</option>
              <option value="plastic">Plastic</option>
              <option value="paper">Paper</option>
              <option value="glass">Glass</option>
              <option value="metal">Metal</option>
              <option value="electronics">Electronics</option>
              <option value="hazardous">Hazardous Waste</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          {centers.map(center => (
            <div key={center.id} className="border rounded-lg p-6 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-green-700">{center.name}</h3>
                  <p className="text-gray-600">{center.address}</p>
                  <p className="text-gray-600">{center.city}, {center.state} {center.zip}</p>
                </div>
                <div className="text-right">
                  <p className="text-green-600 font-semibold">{center.region}</p>
                  <a href={`tel:${center.phone}`} className="text-blue-600 flex items-center justify-end mt-1">
                    <PhoneIcon className="h-4 w-4 mr-1" />
                    {center.phone}
                  </a>
                  {center.website && (
                    <a 
                      href={center.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 flex items-center justify-end mt-1"
                    >
                      <GlobeAltIcon className="h-4 w-4 mr-1" />
                      Website
                    </a>
                  )}
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <ClockIcon className="h-5 w-5 text-gray-500 mr-2" />
                <span className="text-gray-600">{center.hours}</span>
              </div>

              <div className="mb-4">
                <h4 className="font-semibold mb-2">Accepted Materials:</h4>
                <div className="flex flex-wrap gap-2">
                  {center.materials.map(material => (
                    <span
                      key={material}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {material}
                    </span>
                  ))}
                </div>
              </div>

              {center.specialInstructions && (
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Special Instructions:</h4>
                  <p className="text-gray-700">{center.specialInstructions}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {center.certifications.map(cert => (
                  <span
                    key={cert}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecyclingMap;