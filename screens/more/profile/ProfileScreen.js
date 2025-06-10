import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, ActivityIndicator, TextInput, Button } from "react-native";
import { Appbar, Text, Divider } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { useAuth } from "../../auth/AuthContext";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth(); // user.uid assumed available
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchUserData = async () => {
    if (!user?.uid) return;
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        setFormData(data); // Initialize form for editing
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const userRef = doc(db, "users", user.uid);
      await updateDoc(userRef, formData);
      setUserData(formData); // update displayed data
      setIsEditing(false); // exit edit mode
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6200ee" />
      </View>
    );
  }

  const renderField = (label, key) => (
    <View style={styles.item}>
      <Text style={styles.label}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={formData[key] || ""}
          onChangeText={(text) => setFormData({ ...formData, [key]: text })}
        />
      ) : (
        <Text style={styles.value}>{userData?.[key] || "-"}</Text>
      )}
      <Divider />
    </View>
  );

  return (
    <>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content title="My Profile" />
        <Appbar.Action
          icon={isEditing ? "close" : "pencil"}
          onPress={() => setIsEditing(!isEditing)}
        />
      </Appbar.Header>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.sectionTitle}>Personal Details</Text>

        {renderField("Name", "name")}
        {renderField("Phone Number", "phoneNumber")}
        {renderField("Email", "email")}
        {renderField("Address", "address")}

        <Text style={[styles.sectionTitle, { marginTop: 30 }]}>Organisation Details</Text>
          <View style={styles.item}>
            <Text style={styles.label}>Roles</Text>
            <Text style={styles.value}>Staff Kitchen</Text>
            <Divider />
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Contract Type</Text>
            <Text style={styles.value}>Part-Time</Text>
            <Divider />
          </View>
          <View style={styles.item}>
            <Text style={styles.label}>Sections</Text>
            <Text style={styles.value}>UKI Matcha PURI</Text>
            <Divider />
          </View>

        {isEditing && (
          <Button title="Save" onPress={handleSave} />
        )}
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
  input: {
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 8,
    marginBottom: 4,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProfileScreen;
