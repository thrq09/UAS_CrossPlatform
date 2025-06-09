import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Text, Card, Avatar, Divider, Button } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ShiftCard = () => (
  <Card style={styles.card}>
    <Card.Content>
      <View style={styles.header}>
        <Avatar.Text size={36} label="UMS" style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.title}>Uki Matcha SCBD</Text>
          <Text style={styles.subtitle}>Uki Matcha SCBD</Text>
        </View>
        <Text style={styles.orgCode}>UMS</Text>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.details}>
        <Text style={styles.shiftTime}>17:00 - 23:00 | 6h</Text>
        <Text>☕ 30m <Text style={{ fontWeight: "bold" }}>Kitchen</Text></Text>
        <Text>Shift: <Text style={{ fontWeight: "bold" }}>closing 2</Text></Text>
      </View>
    </Card.Content>
  </Card>
);

const ConfirmedShift = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleDropdown = () => setIsExpanded(!isExpanded);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Add Leave Button */}
        <TouchableOpacity style={styles.actionsContainer}>
          <Icon name="plus-circle-outline" size={20} color="#14A2E2" />
          <Text style={styles.addLeaveText}>Add Leave</Text>
        </TouchableOpacity>

        {/* THIS WEEK + Toggle */}
        <View style={styles.weekHeader}>
          <Text style={styles.weekText}>THIS WEEK</Text>
          <TouchableOpacity onPress={toggleDropdown}>
            <Icon name={isExpanded ? "chevron-up" : "chevron-down"} size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* List of Shifts */}
        {isExpanded && [...Array(5)].map((_, index) => <ShiftCard key={index} />)}
      </ScrollView>

      {/* Acknowledge Button */}
      <View style={styles.acknowledgeContainer}>
              <TouchableOpacity style={[styles.acknowledgeButton, styles.grabButton]} onPress={() => {}}>
                <Text style={styles.grabButtonText}>Acknowledge Shift</Text>
              </TouchableOpacity>
            </View>
    </View>
  );
};

export default ConfirmedShift;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    gap: 6,
  },
  addLeaveText: {
    color: "#14A2E2",
    fontWeight: "600",
  },
  weekHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  weekText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1E1E1E",
  },
  card: {
    borderRadius: 12,
    elevation: 2,
    marginBottom: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#E98024",
    marginRight: 12,
    fontSize: 12,
    fontWeight: "bold",
  },
  info: {
    flex: 1,
  },
  title: {
    fontWeight: "bold",
    fontSize: 15,
  },
  subtitle: {
    color: "gray",
  },
  orgCode: {
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
    fontSize: 12,
    fontWeight: "bold",
  },
  divider: {
    marginVertical: 12,
  },
  details: {
    gap: 4,
  },
  shiftTime: {
    fontWeight: "bold",
    fontSize: 14,
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
    backgroundColor: "#14A2E2",
    paddingVertical: 12,
    alignItems: "center",
  },
  grabButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

});
