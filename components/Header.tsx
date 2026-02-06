import { authContext } from "@/Context/authContext";
import { IMAGES } from "@/DATA/images";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CartModal from "./CartModal";
const Header = ({
  searchText,
  setSearchText,
}: {
  searchText: string;
  setSearchText: any;
}) => {
  const [cartVisible, setCartVisible] = useState(false);
  const auth = useContext(authContext);
  return (
    <>
      <View style={styles.header}>
        <Pressable onPress={() => router.navigate("/(protected)/profile")}>
          <View>
            <Image
              source={
                auth.currentUser
                  ? IMAGES[auth.currentUser.profile_photo]
                  : IMAGES["default"]
              }
              style={styles.headerImage}
            />
          </View>
        </Pressable>

        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search products"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>

        <TouchableOpacity
          style={styles.notification}
          onPress={() => setCartVisible(!cartVisible)}
        >
          <Ionicons name="cart-outline" size={22} color="#111827" />
        </TouchableOpacity>
      </View>
      <CartModal visible={cartVisible} onClose={() => setCartVisible(false)} />
    </>
  );
};

export default Header;

const styles = StyleSheet.create({
  searchBox: {
    height: 45,
    width: "70%",
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  notification: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: Constants.statusBarHeight + 10,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 60,
    zIndex: 100,
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
