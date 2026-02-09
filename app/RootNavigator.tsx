import { authContext } from "@/Context/authContext";
import { Stack } from "expo-router";
import React, { useContext } from "react";

const RootNavigator = () => {
  const auth = useContext(authContext);
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Protected guard={auth.isAuthenticated}>
        <Stack.Screen name="(protected)" options={{ headerShown: false }} />
        <Stack.Screen name="checkout" options={{ headerShown: false }} />
      </Stack.Protected>
    </Stack>
  );
};

export default RootNavigator;
