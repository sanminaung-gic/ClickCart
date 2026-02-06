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

// app/RootNavigator.tsx
// import { authContext } from "@/Context/authContext";
// import { Slot, useRouter, useSegments } from "expo-router";
// import { useContext, useEffect } from "react";

// export default function RootNavigator() {
//   const { isAuthenticated } = useContext(authContext);
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     const inProtectedGroup = segments[0] === "(protected)";

//     if (!isAuthenticated && inProtectedGroup) {
//       router.replace("/login");
//     }

//     if (isAuthenticated && !inProtectedGroup) {
//       router.replace("/(protected)/shop");
//     }
//   }, [isAuthenticated, segments]);

//   return <Slot />;
// }
