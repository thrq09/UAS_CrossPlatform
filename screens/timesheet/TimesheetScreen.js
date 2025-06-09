import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import TimesheetCard from "./TimesheetCard";
import SummaryHeader from "./SummaryHeader";
import { getDataByWeek } from "./timesheetData";

const toMinutes = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  return hours * 60 + minutes;
};

const parseTimeRange = (range) => {
  const [start, end] = range.split(" - ");
  return toMinutes(end) - toMinutes(start);
};

const getTotalDurations = (data) => {
  let actual = 0;
  let scheduled = 0;

  data.forEach((item) => {
    actual += parseTimeRange(`${item.clockIn} - ${item.clockOut}`);
    scheduled += parseTimeRange(item.time);
  });

  return {
    actualHours: Math.floor(actual / 60),
    actualMinutes: actual % 60,
    scheduledHours: Math.floor(scheduled / 60),
    scheduledMinutes: scheduled % 60,
  };
};

const TimesheetScreen = () => {
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date(2025, 2, 31)); // 31 Mar 2025

  const data = getDataByWeek(currentWeekStart);
  const summary = getTotalDurations(data);

  const changeWeek = (days) => {
    const newDate = new Date(currentWeekStart);
    newDate.setDate(currentWeekStart.getDate() + days);
    setCurrentWeekStart(newDate);
  };

  return (
    <View style={styles.container}>
      <SummaryHeader
        currentWeekStart={currentWeekStart}
        onPrev={() => changeWeek(-7)}
        onNext={() => changeWeek(7)}
        totalActual={`${summary.actualHours}h ${summary.actualMinutes}m`}
        totalScheduled={`${summary.scheduledHours}h ${summary.scheduledMinutes}m`}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {data.length > 0 ? (
          data.map((item, index) => (
            <TimesheetCard key={index} item={item} />
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No clock records found for this week.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  emptyText: {
    color: "gray",
    fontSize: 16,
  },
});

export default TimesheetScreen;
