import { authContext } from "@/Context/authContext";
import { cartContext } from "@/Context/cartContext";
import { IMAGES } from "@/DATA/images";
import React, { useContext } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  const cart = useContext(cartContext);
  const auth = useContext(authContext);
  const orders = cart.orders;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        <Text style={styles.title}>Profile</Text>
        <View style={styles.profileImageContainer}>
          <Image
            source={
              auth.currentUser
                ? IMAGES[auth.currentUser.profile_photo]
                : IMAGES["default"]
            }
            style={styles.profileImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>: {auth.currentUser?.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Phone Number</Text>
            <Text style={styles.value}>: {auth.currentUser?.phoneNumber}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>: {auth.currentUser?.email}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Address</Text>
            <Text style={styles.value}>: {auth.currentUser?.address}</Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
          }}
        >
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => auth.logout()}
          >
            <Text style={styles.editText}>Logout</Text>
          </TouchableOpacity>
        </View>

        {orders.length > 0 && <Text style={styles.orderTitle}>Order list</Text>}

        {orders.map((order) => {
          const date = new Date(order.date);
          const format = date.toLocaleString();

          return (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderRow}>
                <Text style={styles.orderLabel}>Order No :</Text>
                <Text style={styles.orderValue}>{order.id}</Text>
              </View>
              <View style={styles.orderRow}>
                <Text style={styles.orderLabel}>Total :</Text>
                <Text style={styles.orderValue}>{order.totalAmount}</Text>
              </View>
              <View style={styles.orderRow}>
                <Text style={styles.orderLabel}>Status</Text>
                <Text
                  style={[
                    styles.orderStatus,
                    order.status === "confirmed" && { color: "green" },
                    order.status === "processing" && { color: "blue" },
                    order.status === "canceled" && { color: "red" },
                  ]}
                >
                  {order.status}
                </Text>
              </View>
              <Text style={styles.orderDate}>{format}</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

// styling for this screen
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
    width: 90,
    textAlign: "center",
    marginHorizontal: 20,
  },
  editText: { color: "white", fontWeight: "bold" },
  infoContainer: { paddingHorizontal: 20 },
  infoRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    flex: 1,
    fontWeight: "600",
  },
  value: { flex: 1 },
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
