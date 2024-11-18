import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { FrameNavigationProp } from "react-nativescript-navigation";

type HomeScreenProps = {
  navigation: FrameNavigationProp<any, "Home">;
};

export function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <scrollView>
      <flexboxLayout style={styles.container}>
        <label className="text-2xl font-bold mb-8 text-green-700">
          Smart Recycling Assistant
        </label>
        
        <button
          className="bg-green-500 text-white p-4 rounded-lg mb-4 w-full"
          onTap={() => navigation.navigate("Scanner")}
        >
          Scan Item
        </button>

        <button
          className="bg-blue-500 text-white p-4 rounded-lg mb-4 w-full"
          onTap={() => navigation.navigate("Map")}
        >
          Find Recycling Centers
        </button>

        <button
          className="bg-purple-500 text-white p-4 rounded-lg mb-4 w-full"
          onTap={() => navigation.navigate("Schedule")}
        >
          My Schedule
        </button>

        <button
          className="bg-yellow-500 text-white p-4 rounded-lg mb-4 w-full"
          onTap={() => navigation.navigate("Achievements")}
        >
          Achievements
        </button>

        <label className="text-lg mt-4 text-center text-gray-600">
          Start by scanning an item or find nearby recycling centers
        </label>
      </flexboxLayout>
    </scrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20
  }
});