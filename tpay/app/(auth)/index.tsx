import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { setCredentials } from "../redux/authSlice"; // authSlice
import { setBalance, setTransactions } from "../redux/walletSlice"; //  corrected import
import { router } from "expo-router";
import { axiosInstance } from "../lib/_axois";

export default function LoginScreen() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        alert("Please fill in all fields");
        return;
      }

      const res = await axiosInstance.post("/login", { email, password });

      //  store auth user + token
      dispatch(
        setCredentials({ user: res?.data?.user, token: res?.data?.token })
      );

      const token = res?.data?.token;

      //  fetch history and wallet details
      await handleHistory(token);

      //  redirect to tabs after data is ready
      router.replace("/screens/Home/(tabs)");
    } catch (err: any) {
      console.error("Login failed:", err.message);
      alert("Login failed: " + err.message);
    }
  };

   const handleHistory = async (token: string) => {
    try {
      const res = await axiosInstance.get("/transaction/history", {
        headers: { Authorization: `Bearer ${token}` },
      });

      //  Update balance
      if (res?.data?.balance !== undefined) {
        dispatch(setBalance(res.data.balance));
      }

      //  Update sent & received transactions
      if (res?.data) {
        const payload = res?.data;
        dispatch(setTransactions(payload));
      }

      // console.log("History & Balance loaded ✅" + res.data.history);
    } catch (error) {
      console.log("Fetch history failed:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Welcome to Tpay</Text>
      </View>

      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#94a3b8"
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholder="Enter your password"
        placeholderTextColor="#94a3b8"
      />

      <Button title="Login" onPress={handleLogin} />

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.link}>Don’t have an account? Register</Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e293b",
    justifyContent: "center",
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  label: {
    fontWeight: "bold",
    marginBottom: 6,
    fontSize: 16,
    color: "#fff",
  },
  input: {
    backgroundColor: "#334155",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    color: "#fff",
  },
  link: {
    marginTop: 20,
    color: "#38bdf8",
    textAlign: "center",
  },
});
