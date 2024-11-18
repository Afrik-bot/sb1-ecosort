import { ArrowsRightLeftIcon, CameraIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface ScannerControlsProps {
  onCapture: () => void;
  onToggleCamera: () => void;
  isScanning: boolean;
  modelLoading: boolean;
  hasError: boolean;
}

export default function ScannerControls({
  onCapture,
  onToggleCamera,
  isScanning,
  modelLoading,
  hasError
}: ScannerControlsProps) {
  return (
    <div className="flex justify-center space-x-4">
      <button
        onClick={onCapture}
        disabled={isScanning || modelLoading || hasError}
        className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={modelLoading ? 'Loading scanner' : isScanning ? 'Scanning in progress' : 'Scan item'}
      >
        {isScanning ? (
          <ArrowPathIcon className="h-5 w-5 animate-spin mr-2" />
        ) : (
          <CameraIcon className="h-5 w-5 mr-2" />
        )}
        {modelLoading ? 'Loading...' : isScanning ? 'Scanning...' : 'Scan Item'}
      </button>

      <button
        onClick={onToggleCamera}
        className="flex items-center px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
        aria-label="Toggle camera"
      >
        <ArrowsRightLeftIcon className="h-5 w-5" />
      </button>
    </div>
  );
}