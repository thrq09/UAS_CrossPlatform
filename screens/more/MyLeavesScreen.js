import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const dummyLeaves = [
  { id: '1', day: 'Monday', date: '2025-06-09', time: '09:00 - 17:00', reason: 'Sakit' },
  { id: '2', day: 'Wednesday', date: '2025-06-11', time: '09:00 - 12:00', reason: 'Keperluan pribadi' },
];

export default function MyLeavesScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyLeaves}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.title}>{item.day}, {item.date}</Text>
            <Text>{item.time}</Text>
            <Text>Reason: {item.reason}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#fff', marginBottom: 12, padding: 16, borderRadius: 8, elevation: 2,
  },
  title: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
});
