import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";

import ConfirmedShift from "./ConfirmedShift";
import AvailableShift from "./AvailableShift";
import MyAvailability from "./MyAvailability";
import GrabShift from "./GrabShift";

const Tab = createMaterialTopTabNavigator();
const { width } = Dimensions.get("window");

const ScheduleScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <Text style={styles.title}>Schedule</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
          <Icon name="bell" size={22} />
        </TouchableOpacity>
      </View>

      <Tab.Navigator
        screenOptions={{
          tabBarLabelStyle: { fontSize: 12 },
          tabBarStyle: { backgroundColor: "#fff" },
          tabBarIndicatorStyle: { backgroundColor: "#14A2E2" },
        }}
      >
        <Tab.Screen name="Confirmed" component={ConfirmedShift} />
        <Tab.Screen name="Available Shifts" component={AvailableShift} />
        <Tab.Screen name="My Availabilities" component={MyAvailability} />
        <Tab.Screen name="Grab" component={GrabShift} />
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingTop: 45,
    paddingBottom: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default ScheduleScreen;
