import { shopContext } from "@/Context/shopContext";
import { IMAGES } from "@/DATA/images";
import React, { useContext } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Products = ({
  categoryId,
  setBottomSheetVisible,
}: {
  categoryId?: number;
  setBottomSheetVisible: any;
}) => {
  const shop = useContext(shopContext);
  if (categoryId) {
    const category = shop.categories.find((c) => c.id == categoryId)?.title;
    const products = shop.products.filter((p) => p.categoryId == categoryId);
    return (
      <>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>{category}</Text>
          {/* <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity> */}
        </View>
        <View style={styles.productGrid}>
          {products.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.productCard}
              onPress={() =>
                setBottomSheetVisible({ id: item.id, visible: true })
              }
            >
              <Image source={IMAGES[item.image]} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price} Ks</Text>
            </TouchableOpacity>
          ))}
        </View>
      </>
    );
  }
  return (
    <>
      {shop.categories.map((c) => {
        const products = shop.products.filter((p) => p.categoryId == c.id);
        return (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{c.title}</Text>
            </View>
            <View style={styles.productGrid}>
              {products.map((item) => (
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
              ))}
            </View>
          </>
        );
      })}
    </>
  );
};

export default Products;

const styles = StyleSheet.create({
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
