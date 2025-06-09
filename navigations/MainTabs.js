import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Feather";

// Import screen components
import DailyScreen from "../screens/DailyScreen";
import ScheduleScreen from "../screens/schedule/ScheduleScreen";
import TimesheetScreen from "../screens/timesheet/TimesheetScreen";
import MoreScreen from "../screens/more/MoreScreen";

const Tab = createBottomTabNavigator();

const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Daily") iconName = "calendar";
          else if (route.name === "Schedule") iconName = "clock";
          else if (route.name === "Timesheet") iconName = "file-text";
          else if (route.name === "More") iconName = "menu";

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1A3E78",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Daily" component={DailyScreen} />
      <Tab.Screen name="Schedule" component={ScheduleScreen} />
      <Tab.Screen name="Timesheet" component={TimesheetScreen} />
      <Tab.Screen name="More" component={MoreScreen} />
    </Tab.Navigator>
  );
};

export default MainTabs;
