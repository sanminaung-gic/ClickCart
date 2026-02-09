import { AuthProvider } from "@/Context/authContext";
import { CartProvider } from "@/Context/cartContext";
import { ShopProvider } from "@/Context/shopContext";
import React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";
import Toast from "react-native-toast-message";
import RootNavigator from "./RootNavigator";

const RootLayout = () => {
  return (
    <KeyboardProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <ShopProvider>
            <CartProvider>
              <RootNavigator />
              <Toast />
            </CartProvider>
          </ShopProvider>
        </AuthProvider>
      </GestureHandlerRootView>
    </KeyboardProvider>
  );
};

export default RootLayout;
