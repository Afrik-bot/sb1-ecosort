import { BaseNavigationContainer } from '@react-navigation/core';
import * as React from "react";
import { stackNavigatorFactory } from "react-nativescript-navigation";
import { HomeScreen } from "../screens/HomeScreen";
import { ScannerScreen } from "../screens/ScannerScreen";
import { MapScreen } from "../screens/MapScreen";
import { ScheduleScreen } from "../screens/ScheduleScreen";
import { AchievementsScreen } from "../screens/AchievementsScreen";

const StackNavigator = stackNavigatorFactory();

export const MainStack = () => (
  <BaseNavigationContainer>
    <StackNavigator.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#4CAF50"
        },
        headerTintColor: "#fff"
      }}
    >
      <StackNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Recycling Assistant" }}
      />
      <StackNavigator.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{ title: "Scan Item" }}
      />
      <StackNavigator.Screen
        name="Map"
        component={MapScreen}
        options={{ title: "Recycling Centers" }}
      />
      <StackNavigator.Screen
        name="Schedule"
        component={ScheduleScreen}
        options={{ title: "My Schedule" }}
      />
      <StackNavigator.Screen
        name="Achievements"
        component={AchievementsScreen}
        options={{ title: "Achievements" }}
      />
    </StackNavigator.Navigator>
  </BaseNavigationContainer>
);