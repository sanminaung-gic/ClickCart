import { authContext } from "@/Context/authContext";
import { cartContext } from "@/Context/cartContext";
import { IMAGES } from "@/DATA/images";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useContext, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CheckoutScreen() {
  const auth = useContext(authContext);
  const Cart = useContext(cartContext);
  const itemsInCart = Cart.items;
  const [loading, setLoading] = useState(false);

  // checkout function
  const checkout = () => {
    console.log(loading);
    setLoading(true);
    setTimeout(() => {
      Cart.placeOrder();
      setLoading(false);
      router.navigate("/(protected)/home");
    }, 1000);
  };

  // to hide card number and show 4 last digits
  const maskCardNumber = (cardNumber: string | any) => {
    const visibleDigits = 4;
    const maskedLength = cardNumber.length - visibleDigits;
    const masked = "*".repeat(maskedLength).replace(/(.{4})/g, "$1 ");
    const last4 = cardNumber.slice(-4);
    return masked + last4;
  };

  const card = maskCardNumber(auth.currentUser?.card);

  // calculation for items and shipping
  const subTotal = itemsInCart.reduce(
    (total, item) => total + (item.price ?? 0) * (item.quantity ?? 1),
    0,
  );
  const shipping = subTotal > 0 ? 5000 : 0;
  const total = subTotal + shipping;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Row
          label="SHIPPING"
          value={
            auth.currentUser
              ? auth.currentUser.address
              : "plase add address in profile"
          }
        />
        <Row label="PAYMENT" value={card} />
        <Row label="DELIVERY" value="Free Standard | 3 - 4 days" />
        <View style={styles.itemsHeader}>
          <Text style={styles.itemsTitle}>ITEMS</Text>
          <Text style={styles.descTitle}>DESCRIPTION</Text>
          <Text style={styles.priceTitle}>PRICE</Text>
        </View>

        {itemsInCart.map((item) => (
          <Item
            key={item.id}
            image={item.image}
            brand={item.brand}
            name={item.name}
            desc={item.price}
            qty={item.quantity}
            price={(item.price ?? 0) * (item.quantity ?? 1) + " Ks"}
          />
        ))}

        <View style={styles.summary}>
          <SummaryRow
            label={`Subtotal (${itemsInCart.length})`}
            value={subTotal + " Ks"}
          />
          <SummaryRow label="Shipping total" value={shipping + "Ks"} />
          <SummaryRow label="Total" value={total + " Ks"} bold={true} />
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.orderBtn}
          onPress={checkout}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.orderText}>Place order</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// row component for each item
function Row({ label, value }: { label: string; value: string }) {
  return (
    <TouchableOpacity style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <View style={styles.rowRight}>
        <Text style={styles.rowValue}>{value}</Text>
        <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
      </View>
    </TouchableOpacity>
  );
}

// items
function Item({ image, brand, name, desc, qty, price }: any) {
  return (
    <View style={styles.item}>
      <Image source={IMAGES[image]} style={styles.itemImage} />

      <View style={styles.itemDesc}>
        <Text style={styles.brand}>{brand}</Text>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.desc}>{desc}</Text>
        <Text style={styles.qty}>Quantity: {qty}</Text>
      </View>

      <Text style={styles.itemPrice}>{price}</Text>
    </View>
  );
}

// calculation row
function SummaryRow({
  label,
  value,
  bold,
}: {
  label: string;
  value: string;
  bold?: boolean;
}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.summaryValue, bold && styles.bold]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: "600",
  },
  content: {
    paddingHorizontal: 16,
    paddingBottom: 120,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderColor: "#F3F4F6",
  },
  rowLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    width: 90,
  },
  rowRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    justifyContent: "space-between",
  },
  rowValue: {
    fontSize: 14,
    color: "#111827",
    textAlign: "right",
  },
  itemsHeader: {
    flexDirection: "row",
    marginTop: 24,
    marginBottom: 12,
  },
  itemsTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
    width: 90,
  },
  descTitle: {
    flex: 1,
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  priceTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#6B7280",
  },
  item: {
    flexDirection: "row",
    marginBottom: 20,
  },
  itemImage: {
    width: 72,
    height: 72,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    marginRight: 12,
  },
  itemDesc: {
    flex: 1,
  },
  brand: {
    fontSize: 12,
    color: "#9CA3AF",
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
  },
  desc: {
    fontSize: 13,
    color: "#6B7280",
  },
  qty: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: "600",
  },
  summary: {
    marginTop: 24,
    borderTopWidth: 1,
    borderColor: "#F3F4F6",
    paddingTop: 16,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  summaryLabel: {
    fontSize: 14,
    color: "#111827",
  },
  summaryValue: {
    fontSize: 14,
    color: "#111827",
  },
  bold: {
    fontWeight: "700",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderColor: "#F3F4F6",
  },
  orderBtn: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  orderText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
