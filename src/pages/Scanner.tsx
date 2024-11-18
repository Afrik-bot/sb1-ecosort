import { useRef, useEffect } from 'react';
import Webcam from 'react-webcam';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useScanner } from '../hooks/useScanner';
import ScannerControls from '../components/scanner/ScannerControls';
import ScanResult from '../components/scanner/ScanResult';
import { useState } from 'react';

function Scanner() {
  const {
    isScanning,
    modelLoading,
    error,
    result,
    initializeModels,
    processImage,
    resetError
  } = useScanner();

  const [facingMode, setFacingMode] = useState<'user' | 'environment'>('environment');
  const webcamRef = useRef<Webcam>(null);
  const { currentUser } = useAuth();

  useEffect(() => {
    initializeModels();
  }, [initializeModels]);

  const saveDetectionResult = async () => {
    if (!currentUser || !result) return;

    try {
      await addDoc(collection(db, 'scans'), {
        userId: currentUser.uid,
        item: result.item,
        confidence: result.confidence,
        recyclable: result.recyclable,
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.error('Error saving scan result:', err);
    }
  };

  const handleCapture = async () => {
    if (!webcamRef.current) return;

    try {
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        throw new Error('Failed to capture image from camera');
      }

      const img = new Image();
      img.src = imageSrc;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = () => reject(new Error('Failed to load captured image'));
      });

      const detectionResult = await processImage(img);
      if (detectionResult) {
        await saveDetectionResult();
      }
    } catch (err) {
      console.error('Capture error:', err);
    }
  };

  const toggleCamera = () => {
    setFacingMode(prev => prev === 'user' ? 'environment' : 'user');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Scan Item</h1>
      
      <div className="bg-white p-4 rounded-lg shadow-md">
        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
            <p>{error}</p>
            <button
              onClick={resetError}
              className="mt-2 text-sm font-medium hover:text-red-800"
            >
              Try Again
            </button>
          </div>
        )}

        <div className="relative aspect-video mb-4">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="rounded-lg w-full"
            videoConstraints={{
              facingMode,
              width: 1280,
              height: 720
            }}
            onUserMediaError={(err) => {
              console.error('Camera error:', err);
              resetError();
            }}
          />
        </div>

        <ScannerControls
          onCapture={handleCapture}
          onToggleCamera={toggleCamera}
          isScanning={isScanning}
          modelLoading={modelLoading}
          hasError={!!error}
        />

        {result && <ScanResult result={result} />}
      </div>
    </div>
  );
}

export default Scanner;