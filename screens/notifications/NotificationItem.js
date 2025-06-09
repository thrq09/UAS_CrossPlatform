// screens/notifications/NotificationItem.js
import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const NotificationItem = ({ title, description, time }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconPlaceholder} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    color: "#222",
  },
  description: {
    color: "#555",
    fontSize: 13,
    marginTop: 2,
  },
  time: {
    color: "gray",
    fontSize: 12,
    marginTop: 4,
  },
});

export default NotificationItem;
