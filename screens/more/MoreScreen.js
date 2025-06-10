import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Avatar, Text, Divider, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { db, auth } from "../../firebase/config";
import { useAuth } from "../auth/AuthContext";
import useOrgStore from "../../stores/useOrgStore";
import OrganisationModal from "./component/OrganisationModal";

const MenuItem = ({ icon, label, onPress }) => (
  <>
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <Icon name={icon} size={22} color="#333" style={styles.menuIcon} />
      <Text style={styles.menuLabel}>{label}</Text>
    </TouchableOpacity>
    <Divider />
  </>
);

const MoreScreen = () => {
  const navigation = useNavigation();
  const { user } = useAuth(); // contains uid
  const { selectedOrg } = useOrgStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [userData, setUserData] = useState(null);

  const fetchUserData = async () => {
    if (!user?.uid) return;
    try {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await signOut(auth);
            } catch (error) {
              console.error("Logout failed:", error);
            }
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <View style={styles.userInfo}>
          <Avatar.Image
            size={72}
            source={{
              uri: userData?.profilePic || "https://i.pravatar.cc/300",
            }}
          />
          <Text style={styles.userName}>{userData?.name || "Guest"}</Text>
          <IconButton
            icon="bell-outline"
            size={22}
            onPress={() => navigation.navigate("Notification")}
          />
        </View>

        <MenuItem icon="account" label="Profile" onPress={() => navigation.navigate("Profile")} />
        <MenuItem icon="leaf" label="My Leaves" />
        <MenuItem icon="file-document" label="My Payslip" />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Your Organisation</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orgInfo}>
          <Icon name="office-building" size={30} color="#333" style={styles.menuIcon} />
          <View style={styles.orgTextContainer}>
            <View style={styles.orgNameRow}>
              <Text style={styles.orgName}>{selectedOrg}</Text>
              <Icon name="chevron-right" size={22} color="#333" />
            </View>
            <Text style={styles.role}>Employee</Text>
          </View>
        </View>
        <Divider />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Others</Text>
        </View>

        <MenuItem icon="heart-pulse" label="Get Location" onPress={() => navigation.navigate("Location")} />
        <MenuItem icon="logout" label="Logout" onPress={handleLogout} />

        <Text style={styles.version}>Version 1.138.0</Text>
      </ScrollView>

      <OrganisationModal visible={modalVisible} onDismiss={() => setModalVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  userName: {
    flex: 1,
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F5F5F5",
    alignItems: "center",
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold" },
  changeText: { color: "#14A2E2", fontSize: 14 },
  orgInfo: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  orgTextContainer: { flex: 1 },
  orgNameRow: { flexDirection: "row", alignItems: "center" },
  orgName: { fontSize: 22, fontWeight: "bold", marginRight: 4 },
  role: { fontSize: 13, color: "gray" },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  menuIcon: { marginRight: 16 },
  menuLabel: { fontSize: 15 },
  version: {
    textAlign: "center",
    color: "gray",
    fontSize: 12,
    marginVertical: 20,
  },
});

export default MoreScreen;
