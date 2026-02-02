import { Ionicons } from "@expo/vector-icons";
import React from "react";
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
  id: string;
  name: string;
  qty?: number;
  price?: number;
  image?: string;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  items?: Item[];
  onQtyChange?: (id: string, qty: number) => void;
  onCheckout?: () => void;
};

const CartModal = ({
  visible,
  onClose,
  items = [],
  onQtyChange,
  onCheckout,
}: Props) => {
  const subtotal = items.reduce((s, i) => s + (i.price ?? 0) * (i.qty ?? 1), 0);
  const shipping = subtotal > 0 ? 5000 : 0;
  const total = subtotal + shipping;

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemRow}>
      <View style={styles.itemLeft}>
        {item.image ? (
          <Image source={{ uri: item.image }} style={styles.thumb} />
        ) : (
          <View style={styles.thumbPlaceholder} />
        )}
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
      <View style={styles.itemRight}>
        <View style={styles.qtyRow}>
          <TouchableOpacity
            onPress={() =>
              onQtyChange?.(item.id, Math.max(1, (item.qty ?? 1) - 1))
            }
            style={styles.qtyBtn}
          >
            <Ionicons name="remove" size={14} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.qty ?? 1}</Text>
          <TouchableOpacity
            onPress={() => onQtyChange?.(item.id, (item.qty ?? 1) + 1)}
            style={styles.qtyBtn}
          >
            <Ionicons name="add" size={14} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.priceText}>{formatPrice(item.price ?? 0)}</Text>
      </View>
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
                  <Ionicons name="close" size={20} color="#111827" />
                </TouchableOpacity>
              </View>

              <FlatList
                data={items}
                keyExtractor={(i) => i.id}
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
                style={styles.checkout}
                onPress={() => {
                  onCheckout?.();
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
