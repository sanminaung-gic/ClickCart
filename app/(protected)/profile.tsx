import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const orders = [
  { id: "0002", total: "200000 ks", status: "Confirmed", date: "2025-01-29" },
  { id: "0003", total: "150000 ks", status: "Confirmed", date: "2025-01-30" },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.title}>Profile</Text>

        <View style={styles.profileImageContainer}>
          <Image
            source={{
              uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
            }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>: Mee Mee</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>: 09996539588</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>: meemee@gmail.com</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>: Myanmar, Yangon, Insein Township</Text>
          </View>
        </View>

        <Text style={styles.orderTitle}>Order list</Text>
        {orders.map((order) => (
          <View key={order.id} style={styles.orderCard}>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Order No :</Text>
              <Text style={styles.orderValue}>{order.id}</Text>
            </View>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Total :</Text>
              <Text style={styles.orderValue}>{order.total}</Text>
            </View>
            <View style={styles.orderRow}>
              <Text style={styles.orderLabel}>Status</Text>
              <Text
                style={[
                  styles.orderStatus,
                  order.status === "Confirmed" && { color: "green" },
                ]}
              >
                {order.status}
              </Text>
            </View>
            <Text style={styles.orderDate}>{order.date}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "bold", marginTop: 20, marginLeft: 20 },
  profileImageContainer: { alignItems: "center", marginVertical: 20 },
  profileImage: { width: 120, height: 120, borderRadius: 60 },
  editButton: {
    marginTop: 10,
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 6,
    borderRadius: 20,
  },
  editText: { color: "white", fontWeight: "bold" },
  infoContainer: { paddingHorizontal: 20 },
  infoRow: { flexDirection: "row", marginBottom: 10 },
  label: { flex: 1, fontWeight: "600" },
  value: { flex: 2 },
  orderTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginTop: 20,
    marginLeft: 20,
  },
  orderCard: {
    backgroundColor: "#f2f2f2",
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 15,
    borderRadius: 12,
  },
  orderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  orderLabel: { fontWeight: "500" },
  orderValue: {},
  orderStatus: { fontWeight: "bold" },
  orderDate: { textAlign: "right", fontSize: 12, color: "#666" },
  tabBar: {
    position: "absolute",
    bottom: 0,
    height: 60,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#ccc",
    backgroundColor: "#fff",
  },
});
