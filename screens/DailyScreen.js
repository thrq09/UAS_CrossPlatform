import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import useAuthStore from "../stores/useAuthStore";

const DailyScreen = () => {
  const navigation = useNavigation();
  const user = useAuthStore((state) => state.user);
  const todayDate = new Date();

  const shift = {
    location: "UKI Matcha PURI",
    startTime: "10:00",
    endTime: "19:00",
    totalHours: "9",
    breakTime: 30,
    breakUsed: 0,
    shiftType: "middle",
    role: "Kitchen",
  };

  const [status, setStatus] = useState("not_started"); // 'not_started', 'in_progress', 'completed'

  const handlePress = () => {
    if (status === "not_started") {
      setStatus("in_progress");
    } else if (status === "in_progress") {
      setStatus("completed");
    }
  };

  const formatDate = (date) => {
    const options = { weekday: "long", day: "2-digit", month: "short", year: "2-digit" };
    return date.toLocaleDateString("en-GB", options);
  };

  const getButtonLabel = () => {
    if (status === "not_started") return "Clock In";
    if (status === "in_progress") return "Clock Out";
    return "Shift Completed";
  };

  const isButtonDisabled = status === "completed";

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hey {user ? `${user.username}!` : "there!"}</Text>
          <Text style={styles.date}>{formatDate(todayDate)}</Text>
        </View>
        <View style={styles.icons}>
          <Icon name="headphones" size={22} style={styles.icon} />
          <Icon name="bell" size={22} style={styles.icon} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.location}>{shift.location}</Text>
        <Text style={styles.time}>
          (Today) {shift.startTime} - {shift.endTime} | {shift.totalHours}h
        </Text>
        <Text style={styles.break}>☕ {shift.breakTime} mins</Text>
        <Text style={styles.label}>{shift.role}</Text>
        <Text style={styles.label}>Shift: {shift.shiftType}</Text>
        <Text style={styles.breakUsage}>
          • You have used {shift.breakUsed} / {shift.breakTime} mins of unpaid break
        </Text>

        <TouchableOpacity
          style={[
            styles.clockButton,
            status === "not_started"
              ? { backgroundColor: "#4CAF50" }
              : status === "in_progress"
              ? { backgroundColor: "#FF9800" }
              : { backgroundColor: "#9E9E9E" },
          ]}
          onPress={handlePress}
          disabled={isButtonDisabled}
        >
          <Text style={styles.clockText}>{getButtonLabel()}</Text>
        </TouchableOpacity>
      </View>
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
    paddingTop: 50,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
  },
  date: {
    color: "#555",
    marginTop: 4,
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  icon: {
    marginHorizontal: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    elevation: 3,
  },
  location: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A4A4A",
  },
  time: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: "600",
  },
  break: {
    marginTop: 4,
    color: "#777",
  },
  label: {
    marginTop: 6,
    fontWeight: "500",
  },
  breakUsage: {
    marginTop: 4,
    fontSize: 13,
    color: "#4CAF50",
  },
  clockButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  clockText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default DailyScreen;
