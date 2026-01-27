import React from "react";
import {
  ActivityIndicator,
  GestureResponderEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

type Variant = "primary" | "secondary" | "ghost";

interface Props {
  text: string;
  onPress?: (e: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;
  variant?: Variant;
  icon?: React.ReactNode;
  accessibilityLabel?: string;
  testID?: string;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle | TextStyle[];
}

const Button_full_size: React.FC<Props> = ({
  text,
  onPress,
  disabled = false,
  loading = false,
  variant = "primary",
  icon,
  accessibilityLabel,
  testID,
  style,
  textStyle,
}) => {
  const isDisabled = disabled || loading;

  const backgroundStyle =
    variant === "primary"
      ? styles.primary
      : variant === "secondary"
        ? styles.secondary
        : styles.ghost;

  const textColorStyle = variant === "ghost" ? styles.ghostText : styles.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? text}
      testID={testID}
      style={({ pressed }) => [
        styles.container,
        backgroundStyle,
        isDisabled && styles.disabled,
        pressed && !isDisabled && styles.pressed,
        style,
      ]}
    >
      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === "ghost" ? "#1F2937" : "#fff"}
            style={styles.indicator}
          />
        ) : (
          icon && <View style={styles.iconWrapper}>{icon}</View>
        )}

        <Text
          style={[styles.label, textColorStyle, textStyle]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {text}
        </Text>
      </View>
    </Pressable>
  );
};

export default Button_full_size;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
  },
  text: {
    color: "#fff",
  },
  primary: {
    backgroundColor: "#2563EB",
  },
  secondary: {
    backgroundColor: "#10B981",
  },
  ghost: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },
  ghostText: {
    color: "#111827",
  },
  disabled: {
    opacity: 0.6,
  },
  pressed: Platform.select({
    ios: { opacity: 0.85 },
    android: { opacity: 0.9 },
    default: { opacity: 0.9 },
  }),
  indicator: {
    marginRight: 8,
  },
  iconWrapper: {
    marginRight: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
