import { cartContext } from "@/Context/cartContext";
import { IMAGES } from "@/DATA/images";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useContext } from "react";
import {
  FlatList,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

type Item = {
  id: number;
  name: string;
  image?: any;
  price?: number;
  quantity: number;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  items?: Item[];
  onQtyChange?: (id: number, qty: number) => void;
  onCheckout?: () => void;
};

const CartModal = ({ visible, onClose, items = [], onQtyChange }: Props) => {
  const cart = useContext(cartContext);
  const itemsInCart = cart.items;

  const subtotal = itemsInCart.reduce(
    (s, i) => s + (i.price ?? 0) * (i.quantity ?? 1),
    0,
  );
  const shipping = subtotal > 0 ? 5000 : 0;
  const total = subtotal + shipping;

  const onCheckout = () => {
    router.push("/checkout");
  };
  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemRow}>
      <View>
        {item.image ? (
          <Image
            source={IMAGES[item.image as keyof typeof IMAGES]}
            style={styles.thumb}
          />
        ) : (
          <View style={styles.thumbPlaceholder} />
        )}
      </View>

      <View style={styles.qtyRow}>
        <TouchableOpacity
          onPress={() => cart.decrease(item.id)}
          style={styles.qtyBtn}
        >
          <Ionicons name="remove" size={14} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.qtyText}>{item.quantity ?? 1}</Text>
        <TouchableOpacity
          onPress={() => cart.increase(item.id)}
          style={styles.qtyBtn}
        >
          <Ionicons name="add" size={14} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text style={styles.priceText}>
        {formatPrice((item.price ?? 0) * (item.quantity ?? 1))}
      </Text>
    </View>
  );

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop}>
          <TouchableWithoutFeedback>
            <View style={styles.card}>
              <View style={styles.header}>
                <Text style={styles.title}>Cart</Text>
                <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                  <Ionicons name="close" size={20} color="#ffffff" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={itemsInCart}
                keyExtractor={(i) => i.id.toString()}
                ItemSeparatorComponent={() => <View style={styles.sep} />}
                renderItem={renderItem}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>Your cart is empty</Text>
                }
                style={styles.list}
              />

              <View style={styles.totals}>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Subtotal</Text>
                  <Text style={styles.totalValue}>{formatPrice(subtotal)}</Text>
                </View>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Shipping</Text>
                  <Text style={styles.totalValue}>{formatPrice(shipping)}</Text>
                </View>
                <View style={[styles.totalRow, { marginTop: 6 }]}>
                  <Text style={[styles.totalLabel, { fontWeight: "700" }]}>
                    Total
                  </Text>
                  <Text style={[styles.totalValue, { fontWeight: "700" }]}>
                    {formatPrice(total)}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                disabled={itemsInCart.length === 0}
                style={styles.checkout}
                onPress={() => {
                  onCheckout();
                  onClose();
                }}
              >
                <Text style={styles.checkoutText}>Checkout</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

function formatPrice(n: number) {
  // keep the same formatting style as screenshot (no decimals)
  return `${n}`;
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "transparent",
    alignItems: "flex-end",
  },
  card: {
    width: "78%",
    backgroundColor: "#6B7280",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
    marginTop: 50,
    marginRight: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 6,
  },
  title: { fontSize: 18, color: "#fff", fontWeight: "600" },
  closeBtn: { padding: 6 },
  list: { maxHeight: 260, marginTop: 8 },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 6,
  },
  itemLeft: { flexDirection: "row", alignItems: "center" },
  thumb: { width: 52, height: 52, borderRadius: 6, marginRight: 12 },
  thumbPlaceholder: {
    width: 52,
    height: 52,
    borderRadius: 6,
    backgroundColor: "#cbd5e1",
    marginRight: 12,
  },
  itemName: { color: "#fff", fontSize: 15 },
  itemRight: { alignItems: "flex-end" },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#374151",
    borderRadius: 14,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  qtyBtn: { padding: 6 },
  qtyText: {
    color: "#fff",
    marginHorizontal: 6,
    minWidth: 18,
    textAlign: "center",
  },
  priceText: { color: "#fff", marginTop: 6, fontWeight: "600" },
  sep: {
    height: 1,
    backgroundColor: "#9CA3AF",
    marginHorizontal: 6,
    opacity: 0.35,
  },
  emptyText: { color: "#E5E7EB", padding: 16, textAlign: "center" },
  totals: { marginTop: 10, paddingHorizontal: 6 },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  totalLabel: { color: "#fff" },
  totalValue: { color: "#fff" },
  checkout: {
    marginTop: 12,
    backgroundColor: "#111827",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  checkoutText: { color: "#fff", fontWeight: "700" },
});

export default CartModal;
