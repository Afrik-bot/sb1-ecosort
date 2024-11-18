import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RecyclingService } from "../services/RecyclingService";

export function ScannerScreen() {
  const [scanning, setScanning] = React.useState(false);
  const [result, setResult] = React.useState<string | null>(null);

  const handleScan = async () => {
    setScanning(true);
    const scannedItem = await RecyclingService.scanItem();
    setResult(scannedItem);
    setScanning(false);
  };

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-xl mb-4">Scan Recyclable Item</label>
      <button
        className="bg-green-500 text-white p-4 rounded-lg"
        onTap={handleScan}
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