import React from "react";
import { View, StyleSheet } from "react-native";
import { Text, Card, Badge } from "react-native-paper";

const TimesheetCard = ({ item }) => {
  if (!item) return null; // Hindari crash

  const {
    location = "Unknown",
    date = "-",
    time,
    clockIn = "-",
    clockOut = "-",
    duration = "-",
    break: breakTime = "0 mins",
  } = item;

  const clockTime = time || `${clockIn} - ${clockOut}`.trim();

  return (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.header}>
          <Badge style={styles.badge}>{location}</Badge>
          <Text style={styles.date}>{date}</Text>
          <Text style={styles.totalHours}>{duration}</Text>
        </View>

        <View style={styles.breakRow}>
          <Text style={styles.breakText}>Break: {breakTime}</Text>
        </View>

        <View style={styles.timeRow}>
          <Text style={styles.clockText}>{clockTime}</Text>
        </View>
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    backgroundColor: "#eaeaea",
    color: "#333",
  },
  date: {
    fontWeight: "bold",
    fontSize: 16,
    flex: 1,
    marginLeft: 10,
  },
  totalHours: {
    color: "#144b8e",
    fontWeight: "bold",
  },
  breakRow: {
    marginTop: 8,
  },
  breakText: {
    color: "#555",
  },
  timeRow: {
    marginTop: 4,
  },
  clockText: {
    color: "#222",
  },
});

export default TimesheetCard;
