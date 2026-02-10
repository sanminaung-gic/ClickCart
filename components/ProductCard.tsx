import { IMAGES } from "@/DATA/images";
import { Product } from "@/DATA/types";
import { Image } from "expo-image";
import React, { useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const ProductCard = React.memo(
  ({
    item,
    setBottomSheetVisible,
  }: {
    item: Product;
    setBottomSheetVisible: any;
  }) => {
    const getImage = React.useCallback((key: string) => IMAGES[key], []);
    const blurhash = useMemo(() => "L5H2EC=PM+yV0g-mq.wG9c010J}I", []);
    return (
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => setBottomSheetVisible({ id: item.id, visible: true })}
      >
        <Image
          source={getImage(item.image)}
          style={styles.productImage}
          contentFit="cover"
          transition={150}
          cachePolicy="memory-disk"
          placeholder={blurhash}
        />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price} Ks</Text>
      </TouchableOpacity>
    );
  },
);

const styles = StyleSheet.create({
  productCard: {
    width: "95%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginHorizontal: "auto",
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
