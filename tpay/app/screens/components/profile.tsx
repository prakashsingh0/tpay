import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import QRCodeSvg from "react-native-qrcode-svg";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const balance = useSelector((state:RootState)=>state.wallet.balance)

  // ✅ Generate dynamic UPI QR string using logged-in user
  const upiString = `upi://pay?pa=${user?.upi}&pn=${encodeURIComponent(
    user?.name || ""
  )}&am=100&cu=INR&tn=Payment%20for%20Tpay`;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.userProfile}>
        <View style={styles.profileCard}>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Ionicons name="person-circle-outline" size={150} color="black" />
          </View>

          <Text style={{ fontWeight: "500", marginTop: 10 }}>
            ACCOUNT DETAILS
          </Text>
          <View
            style={{
              borderBottomColor: "black",
              borderBottomWidth: 2,
              marginVertical: 5,
            }}
          />
          <View style={{ gap: 5 }}>
            <Text>Customer ID : {user?.id}</Text>
            <Text>Name : {user?.name}</Text>
            <Text>Phone No. : {user?.phone}</Text>
            <Text>UPI ID : {user?.upi}</Text>
            <Text>Account Number : {user?.accountNumber}</Text>
            <Text>Email : {user?.email}</Text>
            <Text style={{fontWeight:"400"}}>Balance : ₹{balance}</Text>
          </View>
        </View>

        {/* ✅ QR Code properly inside container */}
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <QRCodeSvg
            value={upiString}
            size={200}
            color="black"
            backgroundColor="white"
          />
          <Text style={{ marginTop: 10, fontWeight: "600" }}>Scan to Pay</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingTop: 20,
  },
  userProfile: {
    flex: 1,
    
    alignItems: "center",
    backgroundColor: "#4c6ef5",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  profileCard: {
    width: "100%",
    height: 400,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
