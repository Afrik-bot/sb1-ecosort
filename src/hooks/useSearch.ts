import { useMemo } from 'react';
import { Facility } from '../types/DisposalTypes';

interface SearchOptions {
  facilities: Facility[];
  searchTerm: string;
  zipCode?: string;
  filters: {
    facilityType: string;
    materials: string[];
    region: string;
  };
}

const normalize = (str: string | undefined): string => 
  (str || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, '')
    .trim();

const calculateRelevanceScore = (facility: Facility, searchTerms: string[]): number => {
  let score = 0;
  const searchableText = normalize([
    facility.name,
    facility.address,
    facility.city,
    ...facility.acceptedMaterials
  ].join(' '));

  for (const term of searchTerms) {
    if (facility.name.toLowerCase().includes(term)) score += 10;
    if (facility.zipCode === term) score += 8;
    if (facility.city.toLowerCase().includes(term)) score += 6;
    if (facility.acceptedMaterials.some(m => normalize(m).includes(term))) score += 5;
    if (searchableText.includes(term)) score += 2;
  }

  return score;
};

export function useSearch({ facilities, searchTerm, zipCode, filters }: SearchOptions) {
  return useMemo(() => {
    if (!facilities?.length) return [];

    const searchTerms = normalize(searchTerm).split(/\s+/).filter(Boolean);
    const normalizedZip = normalize(zipCode);

    return facilities
      .filter(facility => {
        if (normalizedZip && facility.zipCode !== normalizedZip) {
          return false;
        }

        if (filters.facilityType !== 'all' && facility.type !== filters.facilityType) {
          return false;
        }

        if (filters.region !== 'all' && facility.region !== filters.region) {
          return false;
        }

        if (filters.materials.length > 0) {
          const hasAllMaterials = filters.materials.every(material =>
            facility.acceptedMaterials.some(m => 
              normalize(m).includes(normalize(material))
            )
          );
          if (!hasAllMaterials) return false;
        }

        if (searchTerms.length > 0) {
          const searchableText = normalize([
            facility.name,
            facility.address,
            facility.city,
            ...facility.acceptedMaterials
          ].join(' '));

          return searchTerms.some(term => searchableText.includes(term));
        }

        return true;
      })
      .sort((a, b) => {
        const scoreA = calculateRelevanceScore(a, searchTerms);
        const scoreB = calculateRelevanceScore(b, searchTerms);

        if (scoreA !== scoreB) return scoreB - scoreA;
        return a.name.localeCompare(b.name);
      });
  }, [facilities, searchTerm, zipCode, filters]);
}