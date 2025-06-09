import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Alert, Text, TouchableOpacity } from "react-native";
import useAuthStore from "../../stores/useAuthStore";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const login = useAuthStore((state) => state.login);
  const registeredUser = useAuthStore((state) => state.registeredUser);

  const handleLogin = () => {
    if (!username || !password) {
      Alert.alert("Peringatan", "Username dan password tidak boleh kosong.");
      return;
    }

    if (
      !registeredUser ||
      registeredUser.username !== username ||
      registeredUser.password !== password
    ) {
      Alert.alert("Gagal", "Username atau password salah.");
      return;
    }

    login(username, password);
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
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
