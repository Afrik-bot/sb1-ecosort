import * as React from "react";
import { EventData } from "@nativescript/core";
import { Camera } from "@nativescript/camera";
import { StyleSheet } from "react-nativescript";
import * as cocoSsd from "@tensorflow-models/coco-ssd";

export function Scanner() {
  const [scanning, setScanning] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);

  const startScanning = async () => {
    try {
      setScanning(true);
      const image = await Camera.takePicture({
        width: 300,
        height: 300,
        keepAspectRatio: true,
        saveToGallery: false
      });

      // Load and run TensorFlow model
      const model = await cocoSsd.load();
      const predictions = await model.detect(image);
      
      if (predictions.length > 0) {
        setResult(predictions[0].class);
      }
    } catch (error) {
      console.error("Scanning error:", error);
    } finally {
      setScanning(false);
    }
  };

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-xl mb-4">Scan Recyclable Item</label>
      <button
        className="bg-green-500 text-white p-4 rounded-lg"
        onTap={startScanning}
        isEnabled={!scanning}
      >
        {scanning ? "Scanning..." : "Start Scan"}
      </button>
      {result && (
        <label className="mt-4 text-lg">
          Detected: {result}
        </label>
      )}
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 20
  }
});