import Add_to_cart_modal from "@/components/Add_to_cart_modal";
import Header from "@/components/Header";
import Products from "@/components/Products";
import { authContext } from "@/Context/authContext";
import { shopContext } from "@/Context/shopContext";
import { Ionicons } from "@expo/vector-icons";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useContext, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Product = {
  id: number;
  categoryId: number;
  brand: string;
  name: string;
  price: number;
  image: string;
};

export default function HomeScreen() {
  const auth = useContext(authContext);
  const shop = useContext(shopContext);
  const [searchText, setSearchText] = useState("");
  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearchText("");
      };
    }, []),
  );

  const CATEGORIES = shop.categories;
  const [bottomSheetVisible, setBottomSheetVisible] = useState<{
    id: number | null;
    visible: boolean;
  }>({
    id: null,
    visible: false,
  });

  const addToCart = (productId: number | null) => {
    return (
      <Add_to_cart_modal
        onClose={() => setBottomSheetVisible({ id: null, visible: false })}
        productId={productId}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            value={searchText}
            onChangeText={setSearchText}
            placeholder="Search products"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity
            onPress={() => router.navigate("/(protected)/categories")}
          >
            <Text style={styles.seeAll}>See all categories</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {CATEGORIES.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryChip}
              onPress={() => {
                router.navigate({
                  pathname: "/(protected)/shop",
                  params: {
                    categoryId: item.id,
                  },
                });
              }}
            >
              <Text style={styles.categoryText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <Products
          searchText={searchText}
          categoryId="popular"
          setBottomSheetVisible={setBottomSheetVisible}
        />
      </ScrollView>
      {bottomSheetVisible.visible && addToCart(bottomSheetVisible.id)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  locationLabel: {
    fontSize: 13,
    color: "#6B7280",
  },
  location: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  searchBox: {
    marginTop: 20,
    height: 52,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: "#111827",
  },
  sectionHeader: {
    marginTop: 26,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  seeAll: {
    fontSize: 14,
    color: "#2563EB",
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 14,
    marginBottom: 10,
    backgroundColor: "#F3F4F6",
  },
  productName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#111827",
  },
  productPrice: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "700",
    color: "#2563EB",
  },
});
