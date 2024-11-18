import * as React from "react";
import { StyleSheet } from "react-nativescript";
import { RecyclingService } from "../services/RecyclingService";
import type { RecyclingSchedule } from "../types/RecyclingTypes";

export function ScheduleScreen() {
  const [schedules, setSchedules] = React.useState<RecyclingSchedule[]>([
    {
      id: "1",
      type: "General Recycling",
      dayOfWeek: 1, // Monday
      time: "08:00",
      enabled: true
    }
  ]);

  const toggleSchedule = async (id: string) => {
    setSchedules(prev => prev.map(schedule => {
      if (schedule.id === id) {
        const updated = { ...schedule, enabled: !schedule.enabled };
        if (updated.enabled) {
          RecyclingService.scheduleReminder(updated.dayOfWeek, updated.time);
        }
        return updated;
      }
      return schedule;
    }));
  };

  return (
    <scrollView>
      <flexboxLayout style={styles.container}>
        <label className="text-xl mb-4">Recycling Schedule</label>
        {schedules.map(schedule => (
          <flexboxLayout 
            key={schedule.id} 
            className="bg-white p-4 rounded-lg mb-4 w-full"
          >
            <label className="text-lg font-bold">{schedule.type}</label>
            <label>Day: {new Date(2024, 0, schedule.dayOfWeek).toLocaleDateString('en-US', { weekday: 'long' })}</label>
            <label>Time: {schedule.time}</label>
            <button
              className={`p-2 rounded-lg mt-2 ${schedule.enabled ? 'bg-green-500' : 'bg-gray-500'}`}
              onTap={() => toggleSchedule(schedule.id)}
            >
              {schedule.enabled ? 'Enabled' : 'Disabled'}
            </button>
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