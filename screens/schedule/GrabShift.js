import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const GrabShift = () => {
  return (
    <View style={styles.container}>
      {/* Empty Icon */}
      <View style={styles.emptyState}>
        <Image
          icon = "inbox" // ganti path kalau berbeda
          style={{ width: 100, height: 100, marginBottom: 16 }}
          resizeMode="contain"
        />
        <Text style={{ fontWeight: "bold", fontSize: 16, color: "#666" }}>
          No shifts up for Grab
        </Text>
        <Text style={{ textAlign: "center", color: "#888", marginTop: 4 }}>
          Grab requests show up when your manager urgently needs you in shifts
        </Text>
      </View>

      {/* Grab Button */}
      <View style={styles.acknowledgeContainer}>
        <TouchableOpacity style={[styles.acknowledgeButton, styles.grabButton]} disabled>
          <Text style={styles.grabButtonText}>Grab</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
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
  grabButton: {
    backgroundColor: "#ccc",
    paddingVertical: 12,
    alignItems: "center",
  },
  grabButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default GrabShift;
