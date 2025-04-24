import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen"
import ViewSnapScreen from "./screens/ViewSnapScreen";
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function MainApp() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "View Snap") {
            iconName = focused ? "document-text" : "document-text-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "information-circle" : "information-circle-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#a6192e",
        tabBarInactiveTintColor: "gray",
        headerShown: false, // Optional: hide header for cleaner look
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="View Snap" component={ViewSnapScreen} />
    </Tab.Navigator>
  );
} 
