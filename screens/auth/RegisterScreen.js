import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import useAuthStore from "../../stores/useAuthStore";

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const register = useAuthStore((state) => state.register);

  const handleRegister = () => {
    if (!username || !password) {
      Alert.alert("Peringatan", "Email dan password tidak boleh kosong.");
      return;
    }

    register(username, password);
    Alert.alert("Sukses", "Registrasi berhasil! Silakan login.");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo-shiftease.jpeg")} // Pastikan path ini sesuai lokasi gambar logo
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Create your new account</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Already have an account?</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  logo: {
    width: 140,
    height: 140,
    alignSelf: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#004AAD",
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    color: "#666",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#004AAD",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
});
