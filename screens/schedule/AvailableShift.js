import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const AvailableShift = () => {
  return (
    <View style={styles.container}>
      {/* Add Leave & Add Availability Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity style={styles.button}>
          <Icon name="plus-circle" size={16} color="#14A2E2" />
          <Text style={styles.buttonText}>Add Leave</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="plus-circle" size={16} color="#14A2E2" />
          <Text style={styles.buttonText}>Add Availability</Text>
        </TouchableOpacity>
      </View>

      {/* Empty Icon */}
      <View style={styles.emptyState}>
        <Image
          icon = "inbox" // ganti path sesuai lokasi file
          style={{ width: 100, height: 100, marginBottom: 16 }}
          resizeMode="contain"
        />
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#666" }}>
          No pending request
        </Text>
        <Text style={{ textAlign: "center", color: "#888", marginTop: 4 }}>
          Please wait for your manager to ask for your availability
        </Text>
      </View>

      {/* Acknowledge Button */}
      <View style={styles.acknowledgeContainer}>
        <TouchableOpacity style={[styles.acknowledgeButton, styles.sendButton]} disabled>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#F5F7FA",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: "#14A2E2",
    fontWeight: "600",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  acknowledgeContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  acknowledgeButton: {
    borderRadius: 10,
  },
  sendButton: {
    backgroundColor: "#ccc",
    paddingVertical: 12,
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AvailableShift;
