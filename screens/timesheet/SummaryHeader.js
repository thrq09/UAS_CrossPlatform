import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const formatRange = (startDate) => {
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  const format = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = date.toLocaleString("en", { month: "short" });
    return `${day} ${month}`;
  };

  return `${format(startDate)} - ${format(endDate)}`;
};

const SummaryHeader = ({ currentWeekStart, onPrev, onNext, totalActual, totalScheduled }) => {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Timesheet</Text>

      <View style={styles.weekContainer}>
        <TouchableOpacity onPress={onPrev}>
          <Icon name="chevron-left" size={20} color="#333" />
        </TouchableOpacity>
        <Text style={styles.weekText}>{formatRange(currentWeekStart)}</Text>
        <TouchableOpacity onPress={onNext}>
          <Icon name="chevron-right" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <Text style={styles.subText}>
        <Text>Total hrs / Total schd {"\n"}</Text> 
        <Text style={{ fontWeight: "bold", color: "#1A3E78" }}>{totalActual}</Text> / {totalScheduled}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  weekText: {
    marginHorizontal: 8,
    fontSize: 14,
    color: "#333",
  },
  subText: {
    textAlign: "center",
    color: "#888",
    fontSize: 12,
  },
});

export default SummaryHeader;
