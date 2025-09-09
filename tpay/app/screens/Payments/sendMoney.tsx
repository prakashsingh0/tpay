import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { addTransaction, setBalance,setTransactions } from "../../redux/walletSlice";
import { axiosInstance } from "../../lib/_axois";
import { router } from "expo-router";

const SendMoney = () => {
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const [receiverIdentifier, setReceiverIdentifier] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const handleSend = async () => {
    if (!receiverIdentifier || !amount) {
      Alert.alert("Error", "Please enter recipient and amount.");
      return;
    }

    try {
      const res = await axiosInstance.post(
        "/transaction/",
        {
          receiverIdentifier,
          amount: parseFloat(amount),
          note,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data?.transaction) {
        //  Update balance from backend
        if (res.data.balance !== undefined) {
          dispatch(setBalance(res.data.balance));
        }

        //  Add the new debit transaction to Redux
        dispatch(addTransaction(res.data.transaction));

        Alert.alert(
          "Success",
          `Sent ₹${amount} to ${receiverIdentifier}${
            note ? `\nNote: ${note}` : ""
          }`
        );
      }

      // Reset inputs
      setReceiverIdentifier("");
      setAmount("");
      setNote("");
      handleHistory(token)
      router.push("/screens/Home/(tabs)");
    } catch (error: any) {
      console.error("Send failed:", error.message);
      Alert.alert("Error", error.response?.data?.message || "Failed to send money");
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
      <Text style={styles.header}>Send Money</Text>
      <TextInput
        style={styles.input}
        placeholder="Recipient (Phone, Email, or UPI)"
        value={receiverIdentifier}
        onChangeText={setReceiverIdentifier}
        placeholderTextColor="#94a3b8"
      />
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
        placeholderTextColor="#94a3b8"
      />
      <TextInput
        style={styles.input}
        placeholder="Note (optional)"
        value={note}
        onChangeText={setNote}
        placeholderTextColor="#94a3b8"
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SendMoney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e293b",
    padding: 24,
    justifyContent: "center",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#334155",
    color: "#fff",
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#f97316",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});
