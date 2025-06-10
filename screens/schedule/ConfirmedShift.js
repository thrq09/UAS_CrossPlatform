import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const confirmedShifts = [
  {
    id: '1',
    date: 'Thu',
    day: '12',
    orgName: 'UKI Matcha PURI',
    orgDesc: 'Uki Matcha Puri',
    location: 'PURI',
    time: '08:00 - 16:00',
    duration: '8h',
    department: 'Kitchen',
    shift: 'open kitchen',
  },
  {
    id: '2',
    date: 'Sat',
    day: '14',
    orgName: 'UKI Matcha PURI',
    orgDesc: 'Uki Matcha Puri',
    location: 'PURI',
    time: '12:00 - 20:00',
    duration: '8h',
    department: 'Kitchen',
    shift: 'middle kitchen',
  },
];

const ConfirmedShiftScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>THIS WEEK</Text>
      {confirmedShifts.map((shift) => (
        <View key={shift.id} style={styles.card}>
          <View style={styles.left}>
            <Text style={styles.date}>{shift.date}</Text>
            <Text style={styles.day}>{shift.day}</Text>
          </View>
          <View style={styles.right}>
            <View style={styles.headerRow}>
              <Text style={styles.orgName}>{shift.orgName}</Text>
              <View style={styles.locationTag}>
                <Text style={styles.locationText}>{shift.location}</Text>
              </View>
            </View>
            <Text style={styles.orgDesc}>{shift.orgDesc}</Text>
            <Text style={styles.time}>
              {shift.time} | {shift.duration}
            </Text>
            <Text style={styles.detail}>Shift: {shift.shift}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2d3d',
    marginBottom: 12,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  left: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    marginRight: 12,
  },
  date: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2d3d',
  },
  day: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1f2d3d',
  },
  right: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orgName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2d3d',
  },
  orgDesc: {
    color: '#6c757d',
    fontSize: 14,
    marginBottom: 8,
  },
  locationTag: {
    backgroundColor: '#f1f3f5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  locationText: {
    fontSize: 12,
    color: '#1f2d3d',
  },
  time: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#1f2d3d',
  },
  detail: {
    color: '#4b4b4b',
    fontSize: 14,
  },
});

export default ConfirmedShiftScreen;
