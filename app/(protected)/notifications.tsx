import { Ionicons } from "@expo/vector-icons";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const NOTIFICATIONS = [
  {
    id: "1",
    title: "Order Confirmed",
    description: "Your order #12345 has been confirmed.",
    time: "2h ago",
    unread: true,
  },
  {
    id: "2",
    title: "Payment Successful",
    description: "Payment for your order was successful.",
    time: "1 day ago",
    unread: false,
  },
  {
    id: "3",
    title: "New Offer 🎉",
    description: "Get 20% off on electronics today!",
    time: "2 days ago",
    unread: false,
  },
];

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={[styles.item, item.unread && styles.unreadItem]}>
            <View style={styles.icon}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#2563EB"
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemDesc}>{item.description}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginVertical: 20,
  },
  item: {
    flexDirection: "row",
    gap: 14,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F9FAFB",
    marginBottom: 12,
  },
  unreadItem: {
    backgroundColor: "#EEF2FF",
  },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#E0E7FF",
    alignItems: "center",
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
  },
  itemDesc: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 2,
  },
  time: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 6,
  },
});
