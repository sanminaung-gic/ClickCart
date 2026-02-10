import { cartContext } from "@/Context/cartContext";
import { IMAGES } from "@/DATA/images";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import PRODUCTS from "../DATA/products.json";
type Props = {
  onClose?: () => void;
  productId?: number | null;
};

export default function AddToCartSheet({ onClose, productId }: Props) {
  const sheetRef = useRef<BottomSheet>(null);
  const [quantity, setQuantity] = useState(1);

  const cart = useContext(cartContext);

  const snapPoints = useMemo(() => ["50%", "100%"], []);

  const renderBackdrop = useCallback(
    (props: React.ComponentProps<typeof BottomSheetBackdrop>) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        pressBehavior="close"
      />
    ),
    [],
  );

  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) return null;

  return (
    <BottomSheet
      ref={sheetRef}
      index={0}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      onChange={(index) => {
        if (index === -1) onClose && onClose();
      }}
    >
      <BottomSheetScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 20,
          }}
        >
          {/* Product Image */}
          <Image
            source={IMAGES[product.image as keyof typeof IMAGES]}
            style={styles.image}
          />
          <View>
            <Text style={{ fontWeight: 500, fontSize: 16, marginBottom: 10 }}>
              Amount(Ks)
            </Text>
            <Text>{product.price * quantity}</Text>
          </View>
          {/* Quantity */}
          <View>
            <Text style={{ fontWeight: 500, fontSize: 16, marginBottom: 10 }}>
              Quantity
            </Text>
            <View style={styles.qtyRow}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => {
                  if (quantity > 0) {
                    setQuantity(quantity - 1);
                  }
                }}
              >
                <Text style={styles.qtyText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qty}>{quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => {
                  setQuantity(quantity + 1);
                }}
              >
                <Text style={styles.qtyText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.header}>
          <View>
            {/* Product Info */}
            <Text style={styles.name}>{product.name}</Text>
            <Text style={styles.price}>{product.price} Ks</Text>
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={() => {
              cart.addItem({
                id: product.id,
                name: product.name,
                brand: product.brand,
                image: product.image,
                price: product.price,
                quantity,
              });
              if (onClose) onClose();
            }}
          >
            <Text style={styles.addText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.desc}>{product.desc}</Text>
      </BottomSheetScrollView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  indicator: {
    alignSelf: "center",
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D1D5DB",
    marginBottom: 14,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
  },
  name: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
  },
  price: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2563EB",
    marginVertical: 6,
  },
  desc: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
    marginBottom: 20,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 22,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    fontSize: 22,
  },
  qty: {
    fontSize: 13,
  },
  addBtn: {
    marginRight: 0,
    height: 40,
    width: 100,
    borderRadius: 20,
    backgroundColor: "#111827",
    alignItems: "center",
    justifyContent: "center",
  },
  addText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "400",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
});
