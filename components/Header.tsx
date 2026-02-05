import { authContext } from "@/Context/authContext";
import { IMAGES } from "@/DATA/images";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useContext, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import CartModal from "./CartModal";
const Header = () => {
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
  notification: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});
