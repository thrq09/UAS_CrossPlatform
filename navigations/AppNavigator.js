import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainTabs from "./MainTabs";
import OrganisationDetailScreen from "../screens/more/component/OrganisationDetailScreen";
import NotificationScreen from "../screens/notifications/NotificationScreen";
import ProfileScreen from "../screens/more/profile/ProfileScreen";
import LocationScreen from "../screens/LocationScreen";
import MyLeavesScreen from "../screens/more/MyLeavesScreen";
import MyPayslipScreen from "../screens/more/MyPayslipScreen";


const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainTabs} />
      <Stack.Screen name="OrganisationDetail" component={OrganisationDetailScreen} />
      <Stack.Screen name="Notification" component={NotificationScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="MyLeaves" component={MyLeavesScreen} />
      <Stack.Screen name="MyPayslip" component={MyPayslipScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
