// screens/auth/RegisterScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/config";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!email || !name || !password) {
      Alert.alert("Peringatan", "Semua field harus diisi.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Simpan profil ke Firestore
      await setDoc(doc(db, "users", uid), {
        uid,
        name,
        email,
        phoneNumber,
        address,
        profilePic: "https://i.pravatar.cc/150?u=" + uid,
      });

      Alert.alert("Sukses", "Registrasi berhasil!");
      navigation.navigate("Login");
    } catch (error) {
      Alert.alert("Gagal", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput placeholder="Full Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Phone Number" value={phoneNumber} onChangeText={setPhoneNumber} style={styles.input} />
      <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
    padding: 10,
  },
});
