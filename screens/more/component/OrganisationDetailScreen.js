import React from "react";
import { View, Text, StyleSheet, Linking, TouchableOpacity } from "react-native";

const OrganisationDetailScreen = ({ route, navigation }) => {
  const { organisation } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>

      <Text style={styles.name}>{organisation.name}</Text>
      <Text style={styles.desc}>{organisation.description}</Text>

      <Text onPress={() => Linking.openURL(`tel:${organisation.phone}`)} style={styles.link}>
        {organisation.phone}
      </Text>

      <Text style={styles.text}>{organisation.location}</Text>

      <Text onPress={() => Linking.openURL(organisation.instagram)} style={styles.link}>
        {organisation.instagram}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#fff", flex: 1 },
  back: { marginBottom: 10 },
  backText: { fontSize: 22 },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 5 },
  desc: { color: "gray", marginBottom: 10 },
  text: { marginBottom: 8 },
  link: { color: "#00bfa5", marginBottom: 8 }
});

export default OrganisationDetailScreen;
