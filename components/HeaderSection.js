import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { useNavigation } from "@react-navigation/native"; 

const HeaderSection = () => {
  const navigation = useNavigation(); 

  const today = new Date();
  const dayName = today.toLocaleDateString("en-US", { weekday: "long" });
  const date = today.toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" });

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.leftSection}>
  //       <Text style={styles.greeting}>Hey, User01</Text>
  //       <Text style={styles.dateText}>{dayName}, {date}</Text>
  //     </View>

  //     <View style={styles.iconContainer}>
  //       <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
  //         <Icon name="headphones" size={22} color="#333" style={styles.icon} />
  //       </TouchableOpacity>
  //       <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
  //         <Icon name="bell" size={22} color="#333" style={styles.icon} />
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
  },
  leftSection: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  dateText: {
    fontSize: 12,
    color: "#777",
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginLeft: 12,
  },
});

export default HeaderSection;
