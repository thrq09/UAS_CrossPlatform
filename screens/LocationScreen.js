import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from "react-native";
import * as Location from "expo-location";
import Constants from "expo-constants";
import MapView, { Marker } from "react-native-maps";
import { Platform } from "react-native";
import NetInfo from "@react-native-community/netinfo";

const LocationScreen = () => {
  const [lokasi, setLokasi] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [internetInfo, setInternetInfo] = useState({
    type: "Unknown",
    isConnected: false,
    ssid: null,
    name: null,
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let loc = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
      setLokasi(loc);
    })();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener((state) => {
      setInternetInfo({
        type: state.type,
        isConnected: state.isConnected,
        ssid: state.details?.ssid || null,
        name: state.details?.ssid || null, // For Wi-Fi networks, name and ssid can be same
      });
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Get Location</Text>

      {/* Simulasi status layanan */}
      <View style={styles.section}>
        <Text style={styles.item}>
          Google Play Services: <Text style={styles.check}>✓</Text>
        </Text>
        <Text style={styles.item}>
          Huawei Services: <Text style={styles.cross}>✕</Text>
        </Text>
      </View>

      {/* Informasi Lokasi */}
      <Text style={styles.subheader}>Internet Information</Text>
      <Text style={styles.subsubheader}>Check your coordinates</Text>
      {lokasi ? (
        <View style={styles.box}>
          <Text style={styles.item}>Latitude: {lokasi.coords.latitude.toFixed(6)}</Text>
          <Text style={styles.item}>Longitude: {lokasi.coords.longitude.toFixed(6)}</Text>
          <Text style={styles.item}>Accuracy: {lokasi.coords.accuracy?.toFixed(2)}</Text>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: lokasi.coords.latitude,
              longitude: lokasi.coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            showsUserLocation={true}
          >
            <Marker
              coordinate={{
                latitude: lokasi.coords.latitude,
                longitude: lokasi.coords.longitude,
              }}
              title="You are here"
            />
          </MapView>
        </View>
      ) : errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : (
        <ActivityIndicator size="large" color="#0000ff" />
      )}

      {/* Simulasi koneksi internet */}
      <Text style={styles.item}>Internet Connection: {internetInfo.isConnected ? internetInfo.type.toUpperCase() : "No Connection"}</Text>
      <Text style={styles.item}>Wi-Fi Name: {internetInfo.ssid || "-"}</Text>

      {/* Informasi perangkat */}
      <Text style={styles.subheader}>Device Information</Text>
      <Text style={styles.item}>App Version: 1.143.0</Text>
      <Text style={styles.item}>OS Version: {Constants.systemVersion}</Text>
      <Text style={styles.item}>Device Model: {Platform.constants?.Model || "Unknown"}</Text>

      <Text style={styles.item}>
        Device Time: {currentTime.toLocaleString("en-GB", { timeZone: "Asia/Jakarta" })}
      </Text>
      <Text style={styles.item}>Device Timezone: Asia/Jakarta</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 10,
  },
  subheader: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 5,
  },
  subsubheader: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  item: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  check: {
    color: "green",
    fontWeight: "bold",
  },
  cross: {
    color: "red",
    fontWeight: "bold",
  },
  box: {
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  error: {
    color: "red",
    fontSize: 16,
  },
  map: {
    height: 200,
    width: "100%",
    borderRadius: 8,
    marginTop: 10,
  },
});

export default LocationScreen;
