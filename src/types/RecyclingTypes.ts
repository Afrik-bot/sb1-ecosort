export interface RecyclableItem {
  id: string;
  name: string;
  category: string;
  recyclable: boolean;
  instructions: string;
  materialType: string;
}

export interface RecyclingCenter {
  id: string;
  name: string;
  address: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  acceptedItems: string[];
  operatingHours: string;
}

export interface UserAchievement {
  id: string;
  title: string;
  description: string;
  points: number;
  completed: boolean;
  dateEarned?: Date;
}

export interface RecyclingSchedule {
  id: string;
  type: string;
  dayOfWeek: number;
  time: string;
  enabled: boolean;
  lastPickup?: Date;
}