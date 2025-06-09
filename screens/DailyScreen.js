import React from "react";
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import ShiftCard from "../components/ShiftCard";
import HeaderSection from "../components/HeaderSection";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "../stores/useAuthStore";
import scheduleData from "./schedule/scheduleData"; // ✅ Import sesuai path kamu

const DailyScreen = () => {
  const navigation = useNavigation();
  const user = useAuthStore((state) => state.user);

  const today = new Date().toISOString().split("T")[0]; // Format: "2025-04-10"
  const todayShifts = scheduleData.filter((item) => item.date === today);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hey{user ? `, ${user.username}` : ""}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
          <Icon name="headphones" size={22} />
          <Icon style={{ marginLeft: 30, marginTop: -20 }} name="bell" size={22} />
        </TouchableOpacity>
      </View>

      {todayShifts.length > 0 ? (
        todayShifts.map((shift) => (
          <ShiftCard key={shift.id} shift={shift} />
        ))
      ) : (
        <Text style={{ textAlign: "center", marginTop: 40 }}>No shifts scheduled for today</Text>
      )}

      <HeaderSection />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingHorizontal: 16,
  },
  header: {
    paddingTop: 45,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default DailyScreen;
