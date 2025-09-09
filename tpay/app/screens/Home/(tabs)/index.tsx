// app/screens/Home/DashboardScreen.tsx
import { Ionicons } from "@expo/vector-icons";
import {  router } from "expo-router";
import React, { use, useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store"; // adjust path to your store
import { logout } from "../../../redux/authSlice";
import { clearWallet } from "@/app/redux/walletSlice";

export default function DashboardScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const balance = useSelector((state: RootState) => state.wallet.balance)

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearWallet());
   
   router.push("@app/(auth)/index");  //  navigate back to login after logout
  
  };



  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.user}>Hi, {user ? user.name : "Guest"} 👋</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 15 }}>
          <TouchableOpacity onPress={() => router.push("/screens/components/profile")}>
            <Ionicons name="person-circle-outline" size={34} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Ionicons name="log-out-outline" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Wallet Balance Card */}
      <TouchableOpacity
        onPress={() => router.push("../Wallet/WalletScreen")}
        style={styles.walletCard}
      >
        <Text style={styles.walletBalance}>Wallet Balance</Text>
        <Text style={styles.walletAmount}>₹{balance}</Text>
        <View style={styles.btnView}>
          <TouchableOpacity
            style={styles.actionBtn}
            onPress={() => router.push("/screens/Payments/sendMoney")}
          >
            <Text style={styles.actionBtnText}>Send Money</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionBtnText}>Get Loan</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      {/* Quick Actions */}
      <View style={styles.quickActions}>
        <Text style={styles.quickActionsTitle}>Quick Actions</Text>
        <View style={styles.quickActionItem}>
          <TouchableOpacity style={styles.quickActionBtn}>
            <Ionicons name="phone-portrait-outline" size={30} color="black" />
            <Text style={styles.quickActionBtnText}>Recharge</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionBtn}>
            <Ionicons name="flash-outline" size={30} color="black" />
            <Text style={styles.quickActionBtnText}>Bill Pay</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionBtn}>
            <Ionicons name="flame-outline" size={30} color="black" />
            <Text style={styles.quickActionBtnText}>Gas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickActionBtn}>
            <Ionicons name="cash-outline" size={30} color="black" />
            <Text style={styles.quickActionBtnText}>Loan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  user: { fontWeight: "bold", fontSize: 20 },
  walletCard: {
    backgroundColor: "#4c6ef5",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginTop: 0,
  },
  walletBalance: {
    color: "#fff",
    fontSize: 14,
  },
  walletAmount: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 8,
  },
  btnView: {
    flexDirection: "row",
    marginTop: 16,
    gap: 16,
  },
  actionBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  actionBtnText: {
    color: "#4c6ef5",
    fontWeight: "600",
  },
  quickActions: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  quickActionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
  },
  quickActionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  quickActionBtn: {
    alignItems: "center",
    justifyContent: "center",
  },
  quickActionBtnText: {
    fontSize: 14,
    marginTop: 4,
  },
});
