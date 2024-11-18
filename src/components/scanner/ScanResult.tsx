import { DetectionResult } from '../../hooks/useScanner';

interface ScanResultProps {
  result: DetectionResult;
}

export default function ScanResult({ result }: ScanResultProps) {
  return (
    <div className="mt-6 p-4 bg-green-50 rounded-lg">
      <h2 className="font-semibold mb-2">Scan Result:</h2>
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg capitalize">{result.item.replace(/_/g, ' ')}</p>
        <span className="text-sm text-gray-600">
          Confidence: {(result.confidence * 100).toFixed(1)}%
        </span>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Recycling Status:</h3>
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${
          result.recyclable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {result.recyclable ? 'Recyclable' : 'Not Recyclable'}
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <p className="text-gray-700">{result.instructions}</p>
        </div>
      </div>
    </div>
  );
}