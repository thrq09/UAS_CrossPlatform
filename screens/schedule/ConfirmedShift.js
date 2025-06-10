import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Text, Card, Avatar, Divider } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { db } from "../../firebase/config";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const ShiftCard = ({ schedule }) => (
  <Card style={styles.card}>
    <Card.Content>
      <View style={styles.header}>
        <Avatar.Text size={36} label={schedule.organizationCode || "ORG"} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.title}>{schedule.organizationName}</Text>
          <Text style={styles.subtitle}>{schedule.organizationName}</Text>
        </View>
        <Text style={styles.orgCode}>{schedule.organizationCode || "ORG"}</Text>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.details}>
        <Text style={styles.shiftTime}>
          {schedule.startTime} - {schedule.endTime} | {schedule.duration}h
        </Text>
        <Text>
          ☕ {schedule.breakDuration}m <Text style={{ fontWeight: "bold" }}>{schedule.department || "Kitchen"}</Text>
        </Text>
        <Text>
          Shift: <Text style={{ fontWeight: "bold" }}>{schedule.shiftName || "closing 2"}</Text>
        </Text>
      </View>
    </Card.Content>
  </Card>
);

const ConfirmedShift = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleDropdown = () => setIsExpanded(!isExpanded);

  // Function to fetch schedules from Firestore
  const fetchSchedules = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) {
        console.log("User not logged in");
        setLoading(false);
        return;
      }

      const schedulesCol = collection(db, "users", user.uid, "schedules");
      const snapshot = await getDocs(schedulesCol);

      const fetchedSchedules = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSchedules(fetchedSchedules);
    } catch (error) {
      console.error("Failed to fetch schedules:", error);
    } finally {
      setLoading(false);
    }
  };

  const addStaticSchedule = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;
      if (!user) return;

      const schedulesCol = collection(db, "users", user.uid, "schedules");

      await addDoc(schedulesCol, {
        organizationName: "Uki Matcha SCBD",
        organizationCode: "UMS",
        date: "10-06-2025",
        startTime: "17:00",
        endTime: "23:00",
        duration: 6,
        breakDuration: 30,
        department: "Kitchen",
        shiftName: "closing 2",
      });
      console.log("Static schedule added!");
    } catch (error) {
      console.error("Error adding static schedule:", error);
    }
  };

  useEffect(() => {
    fetchSchedules();
    addStaticSchedule();
  }, []);

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

        {/* Loading indicator */}
        {loading && <ActivityIndicator size="large" color="#14A2E2" style={{ marginTop: 20 }} />}

        {/* List of Schedules */}
        {isExpanded &&
          !loading &&
          (schedules.length > 0 ? (
            schedules.map((schedule) => <ShiftCard key={schedule.id} schedule={schedule} />)
          ) : (
            <Text style={{ textAlign: "center", marginTop: 20 }}>No schedules available.</Text>
          ))}
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
