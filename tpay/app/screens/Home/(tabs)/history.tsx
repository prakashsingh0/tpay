import React from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

type Transaction = {
  id: string;
  type: "credit" | "debit";
  amount: string;   // "+₹500" or "-₹500"
  date: string;     // "YYYY-MM-DD"
  time: string;     // "hh:mm:ss am/pm"
  status: string;
  senderName?: string;
  receiverName?: string;
};

const History = () => {
  const { balance = 0, transactions = [] } = useSelector(
    (state: RootState) => state.wallet
  );

  const formattedTransactions: Transaction[] = transactions.map((t) => ({
    id: t.id.toString(),
    type: t.type,
    amount: t.amount,
    date: t.date,
    time: t.time,
    status: t.status,
    senderName: t?.otherParty?.name,
    receiverName: t?.otherParty?.name,
  }));

  return (
    <SafeAreaView style={styles.container}>
      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceValue}>₹{balance}</Text>
      </View>

      <Text style={styles.header}>Recent Transactions</Text>

      {/* Transactions List */}
      <FlatList
        data={formattedTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <View>
              <Text style={styles.transactionTitle}>
                {item.type === "credit"
                  ? `Received from ${item.senderName || "Unknown"}`
                  : `Sent to ${item.receiverName || "Unknown"}`}
              </Text>
              <Text style={styles.transactionDate}>
                {item.date} • {item.time}
              </Text>
              <Text style={styles.transactionStatus}>
                Status: {item.status}
              </Text>
            </View>
            <Text
              style={[
                styles.transactionAmount,
                item.type === "credit" ? styles.credit : styles.debit,
              ]}
            >
              {item.amount}
            </Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingHorizontal: 20,
    backgroundColor: "#1e293b",
  },
  balanceCard: {
    backgroundColor: "#334155",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: "center",
  },
  balanceLabel: {
    color: "#94a3b8",
    fontSize: 16,
    marginBottom: 6,
  },
  balanceValue: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#38bdf8",
  },
  header: {
    fontWeight: "600",
    fontSize: 22,
    color: "#fff",
    marginBottom: 18,
    textAlign: "center",
    backgroundColor: "#334155",
    borderRadius: 12,
    padding: 16,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#334155",
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  transactionTitle: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
  },
  transactionDate: {
    color: "#94a3b8",
    fontSize: 13,
    marginTop: 2,
  },
  transactionStatus: {
    color: "#94a3b8",
    fontSize: 12,
    marginTop: 2,
    fontStyle: "italic",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  credit: {
    color: "#22c55e",
  },
  debit: {
    color: "#ef4444",
  },
});
