import { AuthProvider } from "@/Context/authContext";
import React from "react";
import RootNavigator from "./RootNavigator";

const RootLayout = () => {
  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
};

export default RootLayout;
