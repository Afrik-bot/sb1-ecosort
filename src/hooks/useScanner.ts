import { useState, useCallback } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { getRecyclingInstructions } from '../services/recyclingData';

export interface DetectionResult {
  item: string;
  confidence: number;
  recyclable: boolean;
  instructions: string;
  timestamp: Date;
}

interface UseScannerReturn {
  isScanning: boolean;
  modelLoading: boolean;
  error: string | null;
  result: DetectionResult | null;
  initializeModels: () => Promise<void>;
  processImage: (imageElement: HTMLImageElement) => Promise<DetectionResult | null>;
  resetError: () => void;
  resetResult: () => void;
}

export function useScanner(): UseScannerReturn {
  const [isScanning, setIsScanning] = useState(false);
  const [modelLoading, setModelLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [models, setModels] = useState<{
    cocoSsd: cocoSsd.ObjectDetection | null;
    mobilenet: mobilenet.MobileNet | null;
  }>({ cocoSsd: null, mobilenet: null });

  const initializeModels = useCallback(async () => {
    try {
      setModelLoading(true);
      setError(null);

      // Ensure TensorFlow backend is ready
      if (!tf.getBackend()) {
        await tf.setBackend('webgl');
      }
      await tf.ready();

      // Load both models in parallel
      const [cocoSsdModel, mobilenetModel] = await Promise.all([
        cocoSsd.load({
          base: 'mobilenet_v2'
        }),
        mobilenet.load({
          version: 2,
          alpha: 1.0
        })
      ]);

      setModels({
        cocoSsd: cocoSsdModel,
        mobilenet: mobilenetModel
      });
    } catch (err) {
      console.error('Model initialization error:', err);
      setError('Failed to initialize scanning models. Please check your internet connection and refresh the page.');
    } finally {
      setModelLoading(false);
    }
  }, []);

  const processImage = useCallback(async (imageElement: HTMLImageElement): Promise<DetectionResult | null> => {
    if (!models.cocoSsd || !models.mobilenet) {
      throw new Error('Models not initialized');
    }

    setIsScanning(true);
    setError(null);

    try {
      // Run both models in parallel for better accuracy
      const [cocoResults, mobilenetResults] = await Promise.all([
        models.cocoSsd.detect(imageElement),
        models.mobilenet.classify(imageElement)
      ]);

      // Combine results for better accuracy
      let detectedItem = '';
      let confidence = 0;

      if (cocoResults.length > 0 && cocoResults[0].score > 0.6) {
        detectedItem = cocoResults[0].class;
        confidence = cocoResults[0].score;
      } else if (mobilenetResults.length > 0 && mobilenetResults[0].probability > 0.7) {
        detectedItem = mobilenetResults[0].className;
        confidence = mobilenetResults[0].probability;
      } else {
        throw new Error('Unable to identify item with sufficient confidence. Please try again with better lighting or a different angle.');
      }

      const recyclingInfo = getRecyclingInstructions(detectedItem);
      
      const result = {
        item: detectedItem,
        confidence,
        recyclable: recyclingInfo.recyclable,
        instructions: recyclingInfo.instructions,
        timestamp: new Date()
      };

      setResult(result);
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process image';
      setError(errorMessage);
      return null;
    } finally {
      setIsScanning(false);
    }
  }, [models]);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const resetResult = useCallback(() => {
    setResult(null);
  }, []);

  return {
    isScanning,
    modelLoading,
    error,
    result,
    initializeModels,
    processImage,
    resetError,
    resetResult
  };
}