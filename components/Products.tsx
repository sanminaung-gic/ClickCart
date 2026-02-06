import { shopContext } from "@/Context/shopContext";
import { IMAGES } from "@/DATA/images";
import { router } from "expo-router";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
        <View style={styles.productGrid}>
          {products.length > 0 ? (
            products.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.productCard}
                onPress={() =>
                  setBottomSheetVisible({ id: item.id, visible: true })
                }
              >
                <Image
                  source={IMAGES[item.image]}
                  style={styles.productImage}
                />
                <Text style={styles.productName}>{item.name}</Text>
                <Text style={styles.productPrice}>{item.price} Ks</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.empty}>
              <Text style={styles.emptyText}>No results for {searchText}</Text>
            </View>
          )}
        </View>
      </>
    );
  }
  return (
    <>
      {shop.categories.map((c) => {
        let products;
        if (searchText == "")
          products = shop.products.filter((p) => p.categoryId == c.id);
        else
          products = shop.products.filter(
            (p) =>
              (p.name
                .toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase()) ||
                p.brand
                  .toLocaleLowerCase()
                  .includes(searchText.toLocaleLowerCase())) &&
              p.categoryId == c.id,
          );
        return (
          <View key={c.id}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{c.title}</Text>
            </View>
            <View style={styles.productGrid}>
              {products.length > 0 ? (
                products.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.productCard}
                    onPress={() =>
                      setBottomSheetVisible({ id: item.id, visible: true })
                    }
                  >
                    <Image
                      source={IMAGES[item.image]}
                      style={styles.productImage}
                    />
                    <Text style={styles.productName}>{item.name}</Text>
                    <Text style={styles.productPrice}>{item.price} Ks</Text>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.empty}>
                  <Text style={styles.emptyText}>
                    No results for {searchText} in this category
                  </Text>
                </View>
              )}
            </View>
          </View>
        );
      })}
    </>
  );
};

export default Products;

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
