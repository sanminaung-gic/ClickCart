import Add_to_cart_modal from "@/components/Add_to_cart_modal";
import Header from "@/components/Header";
import Products from "@/components/Products";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const shop = () => {
  const [id, setId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");

  const { categoryId } = useLocalSearchParams<{ categoryId?: string }>();

  useFocusEffect(
    useCallback(() => {
      return () => {
        setId(null);
        setSearchText("");
      };
    }, []),
  );
  useEffect(() => {
    if (categoryId) {
      setId(Number(categoryId));
    }

    return () => {
      setId(null);
    };
  }, [categoryId]);

  console.log;
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
        {categoryId ? (
          <Products
            searchText={searchText}
            categoryId={Number(id)}
            setBottomSheetVisible={setBottomSheetVisible}
          />
        ) : (
          <Products
            searchText={searchText}
            setBottomSheetVisible={setBottomSheetVisible}
          />
        )}
      </ScrollView>
      {bottomSheetVisible.visible && addToCart(bottomSheetVisible.id)}
    </SafeAreaView>
  );
};

export default shop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
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
  headerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  notification: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
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
