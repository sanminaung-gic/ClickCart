import Button_full_size from "@/components/Button_full_size";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const login = () => {
  return (
    <View>
      <Text>login</Text>
      <Button_full_size text="Login" variant="primary" />
    </View>
  );
};

export default login;

const styles = StyleSheet.create({});
