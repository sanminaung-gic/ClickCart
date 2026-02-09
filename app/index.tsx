import { authContext } from "@/Context/authContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LoginScreen() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(authContext);

  const loginHandler = async () => {
    const user = await auth.login(userName, password);

    if (user) {
      router.replace("/(protected)/home");
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView bottomOffset={130}>
        <View style={styles.header}>
          <Text style={styles.title}>ClickCart</Text>
          <Ionicons
            name="cart-sharp"
            size={70}
            color="#0A0A0A"
            style={{ alignSelf: "center", marginBottom: 30 }}
          />
          <Text style={styles.login}>Login</Text>
          <Text style={styles.subtitle}>Login to continue shopping</Text>
        </View>
        <View style={styles.form}>
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              placeholder="example@email.com"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              onChangeText={setUserName}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              placeholder="••••••••"
              placeholderTextColor="#9CA3AF"
              secureTextEntry
              style={styles.input}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.loginBtn} onPress={loginHandler}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don’t have an account?</Text>
        <TouchableOpacity>
          <Text style={styles.signup}> Sign up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#0A0A0A",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#6B7280",
    textAlign: "center",
  },
  form: {
    gap: 18,
  },
  inputWrapper: {
    gap: 6,
  },
  label: {
    fontSize: 14,
    color: "#374151",
  },
  input: {
    height: 52,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 14,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "#F9FAFB",
  },
  forgot: {
    alignSelf: "flex-end",
    fontSize: 14,
    color: "#2563EB",
  },
  loginBtn: {
    marginTop: 10,
    height: 54,
    borderRadius: 16,
    backgroundColor: "#0A0A0A",
    alignItems: "center",
    justifyContent: "center",
  },
  loginText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "auto",
    marginBottom: 20,
  },
  footerText: {
    fontSize: 14,
    color: "#6B7280",
  },
  signup: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2563EB",
  },
  login: {
    fontSize: 20,
    fontWeight: "400",
    color: "#111827",
    textAlign: "center",
  },
});
