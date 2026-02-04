import CartModal from "@/components/CartModal";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const shop = () => {
  const [cartVisible, setCartVisible] = React.useState(false);
  const PRODUCTS = [
    {
      id: "1",
      name: "Wireless Headphone",
      price: "50000 Ks",
      image: require("@/assets/images/Earbud01.jpg"),
    },
    {
      id: "2",
      name: "Shirt",
      price: "50000 Ks",
      image: require("@/assets/images/shirt.jpg"),
    },
    {
      id: "3",
      name: "Shoes",
      price: "50000 Ks",
      image: require("@/assets/images/shoe01.jpeg"),
    },
    {
      id: "4",
      name: "Backpack",
      price: "50000 Ks",
      image: require("@/assets/images/Earbud01.jpg"),
    },
    {
      id: "5",
      name: "Wireless Headphone",
      price: "50000 Ks",
      image: require("@/assets/images/Earbud01.jpg"),
    },
    {
      id: "6",
      name: "Shirt",
      price: "50000 Ks",
      image: require("@/assets/images/shirt.jpg"),
    },
    {
      id: "7",
      name: "Shoes",
      price: "50000 Ks",
      image: require("@/assets/images/shoe01.jpeg"),
    },
    {
      id: "8",
      name: "Backpack",
      price: "50000 Ks",
      image: require("@/assets/images/Earbud01.jpg"),
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e",
              }}
              style={styles.headerImage}
            />
          </View>

          <TouchableOpacity
            style={styles.notification}
            onPress={() => setCartVisible(!cartVisible)}
          >
            <Ionicons name="cart-outline" size={22} color="#111827" />
          </TouchableOpacity>
        </View>
        <CartModal
          visible={cartVisible}
          onClose={() => setCartVisible(false)}
        />

        {/* Search */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            placeholder="Search products"
            placeholderTextColor="#9CA3AF"
            style={styles.searchInput}
          />
        </View>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Products</Text>
          <TouchableOpacity>
            <Text style={styles.seeAll}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.productGrid}>
          {PRODUCTS.map((item) => (
            <TouchableOpacity key={item.id} style={styles.productCard}>
              <Image source={item.image} style={styles.productImage} />
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
