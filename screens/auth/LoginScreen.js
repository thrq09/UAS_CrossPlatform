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

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const registeredUser = useAuthStore((state) => state.registeredUser);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Peringatan", "Email dan password tidak boleh kosong.");
      return;
    }

    if (
      !registeredUser ||
      registeredUser.username !== username ||
      registeredUser.password !== password
    ) {
      Alert.alert("Gagal", "Email atau password salah.");
      return;
    }

    login(username, password);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/logo-shiftease.jpeg")} // Pastikan gambar logo berada di path ini
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Login here</Text>
      <Text style={styles.subtitle}>Welcome back you’ve been missed!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Sign in</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.createAccountText}>Create new account</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

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
  createAccountText: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
});
