import { shopContext } from "@/Context/shopContext";
import { Product } from "@/DATA/types";
import { FlashList } from "@shopify/flash-list";
import { router } from "expo-router";
import React, { useCallback, useContext, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ProductCard from "./ProductCard";

const Products = ({
  searchText,
  categoryId,
  setBottomSheetVisible,
}: {
  searchText?: string | any;
  categoryId?: number | string;
  setBottomSheetVisible: any;
}) => {
  const shop = useContext(shopContext);
  const products = useMemo(() => {
    let list = shop.products;
    if (searchText) {
      const q = searchText.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q),
      );
    }

    return list;
  }, [shop.products, searchText]);

  const renderProduct = useCallback(
    ({ item }: { item: Product }) => (
      <ProductCard item={item} setBottomSheetVisible={setBottomSheetVisible} />
    ),
    [],
  );

  if (categoryId) {
    let category, products;
    if (categoryId == "popular") {
      category = "Popular Products";
      if (searchText == "")
        products = shop.products.filter((p) => p.popular == true);
      else
        products = shop.products.filter(
          (p) =>
            (p.name
              .toLocaleLowerCase()
              .includes(searchText.toLocaleLowerCase()) ||
              p.brand
                .toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase())) &&
            p.popular == true,
        );
    } else {
      category = shop.categories.find((c) => c.id == categoryId)?.title;
      if (searchText == "")
        products = shop.products.filter((p) => p.categoryId == categoryId);
      else
        products = shop.products.filter(
          (p) =>
            (p.name
              .toLocaleLowerCase()
              .includes(searchText.toLocaleLowerCase()) ||
              p.brand
                .toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase())) &&
            p.categoryId == categoryId,
        );
    }
    return (
      <>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{category}</Text>
          <TouchableOpacity
            onPress={() => router.navigate("/(protected)/shop")}
          >
            <Text style={styles.seeAll}>See all products</Text>
          </TouchableOpacity>
        </View>
        <FlashList
          {...({
            data: products,
            renderItem: renderProduct,
            keyExtractor: (item: Product) => item.id.toString(),
            numColumns: 2,
            estimatedItemSize: 400,
          } as any)}
        />
      </>
    );
  }
  return (
    <>
      <View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Products</Text>
        </View>
        <FlashList
          {...({
            data: products,
            renderItem: renderProduct,
            keyExtractor: (item: Product) => item.id.toString(),
            numColumns: 2,
            estimatedItemSize: 400,
          } as any)}
        />
      </View>
    </>
  );
};

export default React.memo(Products);

const styles = StyleSheet.create({
  empty: {
    width: "100%",
  },
  emptyText: {
    textAlign: "center",
    color: "gray",
  },
  sectionHeader: {
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
