import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid';

interface FiltersState {
  facilityType: string;
  materials: string[];
  region: string;
}

interface FacilityFiltersProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
}

const facilityTypes = [
  { id: 'all', name: 'All Facilities' },
  { id: 'recycling', name: 'Recycling Centers' },
  { id: 'hazardous', name: 'Hazardous Waste' },
  { id: 'electronic', name: 'E-Waste' },
  { id: 'composting', name: 'Composting' }
];

const regions = [
  { id: 'all', name: 'All Regions' },
  { id: 'northern', name: 'Northern California' },
  { id: 'southern', name: 'Southern California' }
];

const materials = [
  'Batteries',
  'Electronics',
  'Glass',
  'Hazardous Waste',
  'Metal',
  'Oil',
  'Paint',
  'Paper',
  'Plastic',
  'Tires',
  'Yard Waste'
];

export default function FacilityFilters({ filters, onChange }: FacilityFiltersProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Facility Type
          </label>
          <Listbox
            value={filters.facilityType}
            onChange={(value) => onChange({ ...filters, facilityType: value })}
          >
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm">
                <span className="block truncate">
                  {facilityTypes.find(type => type.id === filters.facilityType)?.name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                  {facilityTypes.map((type) => (
                    <Listbox.Option
                      key={type.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                        }`
                      }
                      value={type.id}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {type.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Region
          </label>
          <Listbox
            value={filters.region}
            onChange={(value) => onChange({ ...filters, region: value })}
          >
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-green-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-green-300 sm:text-sm">
                <span className="block truncate">
                  {regions.find(r => r.id === filters.region)?.name}
                </span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
                  {regions.map((region) => (
                    <Listbox.Option
                      key={region.id}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active ? 'bg-green-100 text-green-900' : 'text-gray-900'
                        }`
                      }
                      value={region.id}
                    >
                      {({ selected }) => (
                        <>
                          <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                            {region.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-green-600">
                              <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Accepted Materials
          </label>
          <div className="space-y-2">
            {materials.map((material) => (
              <label key={material} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.materials.includes(material)}
                  onChange={(e) => {
                    const newMaterials = e.target.checked
                      ? [...filters.materials, material]
                      : filters.materials.filter(m => m !== material);
                    onChange({ ...filters, materials: newMaterials });
                  }}
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="ml-2 text-sm text-gray-600">{material}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}