import { shopContext } from "@/Context/shopContext";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CategoriesScreen() {
  const shop = useContext(shopContext);
  const CATEGORIES = shop.categories;
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Categories</Text>

      <FlatList
        data={CATEGORIES}
        numColumns={2}
        keyExtractor={(item) => String(item.id)}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() =>
              router.navigate({
                pathname: "/(protected)/shop",
                params: {
                  categoryId: item.id,
                },
              })
            }
          >
            <View style={styles.iconBox}>
              <Ionicons name={item.icon as any} size={26} color="#111827" />
            </View>
            <Text style={styles.cardText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
    marginVertical: 20,
  },
  card: {
    width: "48%",
    backgroundColor: "#F9FAFB",
    borderRadius: 20,
    paddingVertical: 24,
    alignItems: "center",
    marginBottom: 16,
  },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  cardText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },
});
