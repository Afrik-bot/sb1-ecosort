import * as React from "react";
import { Geolocation } from "@nativescript/geolocation";
import { StyleSheet } from "react-nativescript";
import type { RecyclingCenter } from "../types/RecyclingTypes";

export function RecyclingMap() {
  const [centers, setCenters] = React.useState<RecyclingCenter[]>([]);
  const [userLocation, setUserLocation] = React.useState<{ latitude: number; longitude: number } | null>(null);

  React.useEffect(() => {
    const getCurrentLocation = async () => {
      try {
        const location = await Geolocation.getCurrentLocation({
          desiredAccuracy: 3,
          updateDistance: 10,
          maximumAge: 20000,
        });
        
        setUserLocation({
          latitude: location.latitude,
          longitude: location.longitude,
        });
        
        // Here you would fetch nearby recycling centers
        // using the user's location
      } catch (error) {
        console.error("Location error:", error);
      }
    };

    getCurrentLocation();
  }, []);

  return (
    <flexboxLayout style={styles.container}>
      <label className="text-xl mb-4">Nearby Recycling Centers</label>
      {userLocation ? (
        <label>Your location: {userLocation.latitude}, {userLocation.longitude}</label>
      ) : (
        <label>Loading location...</label>
      )}
      {/* Map view would go here */}
    </flexboxLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    padding: 20
  }
});