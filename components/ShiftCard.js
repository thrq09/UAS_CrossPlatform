import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const ShiftCard = ({ shift }) => {
  if (!shift) return null; // Tidak render apapun kalau tidak ada shift

  const {
    location = "Uki Matcha SCBD",
    time = "12:00 - 21:00",
    duration = "9h",
    role = "middle kitchen 2",
    clockInFrom = "11:00",
  } = shift;

  return (
    <View style={styles.card}>
      {/* Header */}
      <View style={styles.header}>
        <Icon name="headphones" size={22} color="#333" />
      </View>

      {/* Shift Info */}
      <View style={styles.shiftHeader}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>UMS</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{location}</Text>
          <Text style={styles.subtitle}>{location}</Text>
        </View>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>UMS</Text>
        </View>
      </View>

      {/* Shift Time */}
      <Text style={styles.shiftTime}>
        <Text style={{ fontWeight: "bold" }}>(Today) {time}</Text> | {duration}
      </Text>

      {/* Shift Details */}
      <Text style={styles.shiftDetails}>Shift: {role}</Text>
      <Text style={styles.breakTime}>You have used 0 / 0 mins of unpaid break</Text>

      {/* Clock In Button */}
      <TouchableOpacity style={styles.clockInButton} disabled>
        <Image source={require("../assets/splash-icon.png")} style={styles.icon} />
        <Text style={styles.clockInText}>Clock In</Text>
      </TouchableOpacity>

      <Text style={styles.clockInNote}>
        You may only clock in from <Text style={{ color: "red" }}>{clockInFrom}</Text>
      </Text>

      {/* No Shift Section */}
      <View style={styles.noShiftSection}>
        <View style={styles.noShiftHeader}>
          <Text style={styles.noShiftText}>Can’t find your shift?</Text>
          <Icon name="more-vertical" size={20} color="#333" />
        </View>

        <TouchableOpacity style={styles.requestButton}>
          <Text style={styles.requestButtonText}>Send Unscheduled Shift Request</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  shiftHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F4A261",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  logoText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#777",
  },
  badge: {
    backgroundColor: "#EAEAEA",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  shiftTime: {
    fontSize: 16,
    marginTop: 8,
  },
  shiftDetails: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: "bold",
  },
  breakTime: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  clockInButton: {
    backgroundColor: "#EAEAEA",
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  clockInText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#777",
    marginLeft: 8,
  },
  icon: {
    width: 20,
    height: 20,
  },
  clockInNote: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
  },
  noShiftSection: {
    marginTop: 24,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  noShiftHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  noShiftText: {
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  requestButton: {
    backgroundColor: "#14A2E2",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  requestButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ShiftCard;
