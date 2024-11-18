interface SearchHistoryProps {
  searches: string[];
  onSelectSearch: (zipCode: string) => void;
}

export default function SearchHistory({ searches, onSelectSearch }: SearchHistoryProps) {
  if (searches.length === 0) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Recent Searches</h2>
      <div className="space-y-2">
        {searches.map((zipCode, index) => (
          <button
            key={`${zipCode}-${index}`}
            onClick={() => onSelectSearch(zipCode)}
            className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <span className="text-gray-900">{zipCode}</span>
          </button>
        ))}
      </div>
    </div>
  );
}