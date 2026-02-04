import { AuthProvider } from "@/Context/authContext";
import { CartProvider } from "@/Context/cartContext";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RootNavigator from "./RootNavigator";

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <CartProvider>
          <RootNavigator />
        </CartProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
