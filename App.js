// App.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as PaperProvider } from "react-native-paper";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import AppNavigator from "./navigations/AppNavigator";
import { useAuth } from "./screens/auth/AuthContext";
import { AuthProvider } from "./screens/auth/AuthContext";

const Stack = createNativeStackNavigator();

const AppContent = () => {
  const { user } = useAuth(); // <- Use context to check auth state

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="MainApp" component={AppNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <AppContent />
      </PaperProvider>
    </AuthProvider>
  );
}
