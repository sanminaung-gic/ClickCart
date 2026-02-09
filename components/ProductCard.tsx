import { IMAGES } from "@/DATA/images";
import { Product } from "@/DATA/types";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ProductCard = React.memo(
  ({ item, onPress }: { item: Product; onPress: () => void }) => {
    const getImage = React.useCallback((key: string) => IMAGES[key], []);

    return (
      <TouchableOpacity style={styles.productCard} onPress={onPress}>
        <Image
          source={getImage(item.image)}
          style={styles.productImage}
          contentFit="cover"
        />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price} Ks</Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
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

export default ProductCard;
