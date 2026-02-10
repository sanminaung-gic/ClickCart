import { cartContext } from "@/Context/cartContext";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

const _layout = () => {
  const notificationsCount = useContext(cartContext).notifications.length;
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#111827",
          tabBarInactiveTintColor: "#9CA3AF",
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color="#111827"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="categories"
          options={{
            title: "Categories",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "list" : "list-outline"}
                size={24}
                color="#111827"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="shop"
          options={{
            title: "Shop",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "storefront" : "storefront-outline"}
                size={24}
                color="#111827"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "Notifications",
            tabBarIcon: ({ focused }) => (
              <>
                <Ionicons
                  name={focused ? "notifications" : "notifications-outline"}
                  size={24}
                  color="#111827"
                />
                {notificationsCount > 0 && (
                  <View style={styles.itemsCount}>
                    <Text style={styles.itemsCountText}>
                      {notificationsCount}
                    </Text>
                  </View>
                )}
              </>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color="#111827"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({
  itemsCount: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#EF4444",
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  itemsCountText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },
});
