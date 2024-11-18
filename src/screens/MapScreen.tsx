import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RecyclingService } from "../services/RecyclingService";
import type { RecyclingCenter } from "../types/RecyclingTypes";

export function MapScreen() {
  const [centers, setCenters] = React.useState<RecyclingCenter[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const loadCenters = async () => {
      const nearbyCenters = await RecyclingService.getNearbyRecyclingCenters();
      setCenters(nearbyCenters);
      setLoading(false);
    };

    loadCenters();
  }, []);

  return (
    <scrollView>
      <flexboxLayout style={styles.container}>
        <label className="text-xl mb-4">Nearby Recycling Centers</label>
        {loading ? (
          <activityIndicator busy={true} />
        ) : (
          centers.map(center => (
            <flexboxLayout 
              key={center.id} 
              className="bg-white p-4 rounded-lg mb-4 w-full"
            >
              <label className="text-lg font-bold">{center.name}</label>
              <label>{center.address}</label>
              <label>{center.operatingHours}</label>
              <label>Accepts: {center.acceptedItems.join(", ")}</label>
            </flexboxLayout>
          ))
        )}
      </flexboxLayout>
    </scrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    padding: 20
  }
});