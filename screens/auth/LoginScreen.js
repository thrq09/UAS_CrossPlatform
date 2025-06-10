// screens/auth/LoginScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from "react-native";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";
import { useAuth } from "../../screens/auth/AuthContext";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Peringatan", "Email dan password tidak boleh kosong.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Ambil data user dari Firestore
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        login(docSnap.data()); // set ke context
      } else {
        Alert.alert("Gagal", "Data profil tidak ditemukan.");
      }
    } catch (error) {
      Alert.alert("Login Gagal", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} style={styles.input} />
      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.registerText}>
          Belum punya akun? <Text style={styles.link}>Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    padding: 10,
  },
  registerText: {
    marginTop: 20,
    textAlign: "center",
    color: "#333",
  },
  link: {
    color: "#007bff",
    fontWeight: "bold",
  },
});
