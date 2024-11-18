import { useState, useCallback } from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useDebounce } from '../../hooks/useDebounce';

interface SearchFormProps {
  onSearch: (searchTerm: string, zipCode?: string) => void;
  loading: boolean;
}

export default function SearchForm({ onSearch, loading }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [zipCode, setZipCode] = useState('');
  const debouncedSearch = useDebounce(onSearch, 300);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const trimmedSearch = searchTerm.trim();
    const trimmedZip = zipCode.trim();
    
    if (trimmedZip && !/^\d{5}$/.test(trimmedZip)) {
      return;
    }
    
    onSearch(trimmedSearch, trimmedZip || undefined);
  }, [searchTerm, zipCode, onSearch]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (!zipCode && value.trim()) {
      debouncedSearch(value);
    }
  }, [zipCode, debouncedSearch]);

  const handleZipChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 5);
    setZipCode(value);
  }, []);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by name, materials, or location"
          className="w-full px-4 py-3 pl-12 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          disabled={loading}
        />
        <MagnifyingGlassIcon 
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
            loading ? 'text-gray-400 animate-pulse' : 'text-gray-400'
          }`}
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={zipCode}
            onChange={handleZipChange}
            placeholder="Enter ZIP code"
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent"
            disabled={loading}
            maxLength={5}
            inputMode="numeric"
            aria-label="ZIP code"
          />
        </div>
        <button
          type="submit"
          disabled={loading || (!searchTerm.trim() && !zipCode.trim())}
          className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[120px] transition-colors"
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <>
              <MagnifyingGlassIcon className="h-5 w-5 mr-2" />
              Search
            </>
          )}
        </button>
      </div>

      {zipCode && !/^\d{5}$/.test(zipCode) && (
        <p className="text-sm text-red-600" role="alert">
          Please enter a valid 5-digit ZIP code
        </p>
      )}
    </form>
  );
}