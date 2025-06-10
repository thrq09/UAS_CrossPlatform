import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const dummyPayslips = [
  { id: '1', month: 'June 2025', amount: 'Rp 4.000.000' },
  { id: '2', month: 'May 2025', amount: 'Rp 3.500.000' },
];

export default function MyPayslipScreen() {
  return (
    <View style={styles.container}>
      <FlatList
        data={dummyPayslips}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.month}>{item.month}</Text>
            <Text>Total: {item.amount}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: {
    backgroundColor: '#fff', padding: 16, borderRadius: 8, marginBottom: 12, elevation: 2,
  },
  month: { fontWeight: 'bold', fontSize: 16, marginBottom: 4 },
});
