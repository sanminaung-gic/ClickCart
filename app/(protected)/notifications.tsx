import { cartContext } from "@/Context/cartContext";
import { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationsScreen() {
  // call cart context for cart related information
  const cart = useContext(cartContext);
  const NOTIFICATIONS = cart.notifications;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const date = new Date(item.date);
          const format = date.toLocaleString();
          return (
            <View style={[styles.item, !item.isRead && styles.unreadItem]}>
              <View style={{ flex: 1 }}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemDesc}>{item.description}</Text>
                <Text style={styles.time}>{format}</Text>
              </View>
            </View>
          );
        }}
        ListEmptyComponent={
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "gray", textAlign: "center" }}>
              No notifications to be shown!
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

// styling for this screen
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
    textAlign: "right",
  },
});
