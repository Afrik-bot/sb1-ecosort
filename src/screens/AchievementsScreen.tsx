import * as React from "react";
import { StyleSheet } from "react-nativescript";
import type { UserAchievement } from "../types/RecyclingTypes";

export function AchievementsScreen() {
  const [achievements] = React.useState<UserAchievement[]>([
    {
      id: "1",
      title: "First Scan",
      description: "Scan your first recyclable item",
      points: 10,
      completed: true,
      dateEarned: new Date()
    },
    {
      id: "2",
      title: "Recycling Regular",
      description: "Set up a weekly recycling schedule",
      points: 20,
      completed: false
    }
  ]);

  return (
    <scrollView>
      <flexboxLayout style={styles.container}>
        <label className="text-xl mb-4">Your Achievements</label>
        {achievements.map(achievement => (
          <flexboxLayout 
            key={achievement.id} 
            className={`p-4 rounded-lg mb-4 w-full ${achievement.completed ? 'bg-green-100' : 'bg-gray-100'}`}
          >
            <label className="text-lg font-bold">{achievement.title}</label>
            <label>{achievement.description}</label>
            <label>Points: {achievement.points}</label>
            {achievement.completed && (
              <label className="text-green-600">
                Completed: {achievement.dateEarned?.toLocaleDateString()}
              </label>
            )}
          </flexboxLayout>
        ))}
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