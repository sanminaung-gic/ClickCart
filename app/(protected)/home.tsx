import Add_to_cart_modal from "@/components/Add_to_cart_modal";
import Header from "@/components/Header";
import Products from "@/components/Products";
import { authContext } from "@/Context/authContext";
import { shopContext } from "@/Context/shopContext";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useContext, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  // auth context call for authentication functions and data
  const auth = useContext(authContext);

  // shop context call for all shop related data and functions
  const shop = useContext(shopContext);
  const CATEGORIES = shop.categories;

  // search variable
  const [searchText, setSearchText] = useState("");

  // to remove the search value when left the screen
  useFocusEffect(
    useCallback(() => {
      return () => {
        setSearchText("");
      };
    }, []),
  );

  // for bootom sheet ( add to cart modal )
  const [bottomSheetVisible, setBottomSheetVisible] = useState<{
    id: number | null;
    visible: boolean;
  }>({
    id: null,
    visible: false,
  });

  // add to cart function to pop up the modal
  const addToCart = (productId: number | null) => {
    return (
      <Add_to_cart_modal
        onClose={() => setBottomSheetVisible({ id: null, visible: false })}
        productId={productId}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header searchText={searchText} setSearchText={setSearchText} />
      <FlatList
        data={[]}
        keyExtractor={() => "dummy"}
        showsVerticalScrollIndicator={false}
        renderItem={null}
        style={styles.scrollView}
        ListHeaderComponent={
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Categories</Text>
              <TouchableOpacity
                onPress={() => router.navigate("/(protected)/categories")}
              >
                <Text style={styles.seeAll}>See all categories</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              horizontal
              data={CATEGORIES}
              keyExtractor={(item) => item.id.toString()}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryChip}
                  onPress={() =>
                    router.navigate({
                      pathname: "/(protected)/shop",
                      params: { categoryId: item.id },
                    })
                  }
                >
                  <Text style={styles.categoryText}>{item.title}</Text>
                </TouchableOpacity>
              )}
            />

            <Products
              searchText={searchText}
              categoryId="popular"
              setBottomSheetVisible={setBottomSheetVisible}
            />
          </>
        }
      />

      {bottomSheetVisible.visible && addToCart(bottomSheetVisible.id)}
    </SafeAreaView>
  );
}

// styling for this screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: -45,
  },
  scrollView: {
    marginTop: 60,
    paddingTop: 20,
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
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#F3F4F6",
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 20,
  },
  categoryText: {
    fontSize: 14,
    color: "#111827",
    fontWeight: "500",
  },
});
