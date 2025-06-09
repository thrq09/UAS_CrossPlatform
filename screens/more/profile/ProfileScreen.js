import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Appbar, Text, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="My Profile" />
        <Appbar.Action icon="pencil" onPress={() => {}} />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Personal Details</Text>

        <View style={styles.item}>
          <Text style={styles.label}>First Name</Text>
          <Text style={styles.value}>User01</Text>
        </View>
        <Divider />
        <View style={styles.item}>
          <Text style={styles.label}>Last Name</Text>
          <Text style={styles.value}></Text>
        </View>
        <Divider />
        <View style={styles.item}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}></Text>
        </View>
        <Divider />
        <View style={styles.item}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>ezeekiel08@gmail.com</Text>
        </View>
        <Divider />
        <View style={styles.item}>
          <Text style={styles.label}>Address</Text>
          <Text style={styles.value}></Text>
        </View>
        <Divider />
        <View style={styles.item}>
          <Text style={styles.label}>Language</Text>
          <Text style={styles.value}>English</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Organisation Details</Text>

        <View style={styles.item}>
          <Text style={styles.label}>Roles</Text>
          <Text style={styles.value}>Staff Kitchen</Text>
        </View>
        <Divider />
        <View style={styles.item}>
          <Text style={styles.label}>Contract Type</Text>
          <Text style={styles.value}>Part-Time</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.label}>Sections</Text>
          <Text style={styles.value}>UKI Matcha PURI</Text>
        </View>
        <Divider />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },
  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    color: "#333",
  },
  item: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    color: "#555",
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: "#111",
  },
});

export default ProfileScreen;
