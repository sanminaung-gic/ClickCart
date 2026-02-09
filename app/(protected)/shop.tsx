import Add_to_cart_modal from "@/components/Add_to_cart_modal";
import Header from "@/components/Header";
import Products from "@/components/Products";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const shop = () => {
  const [id, setId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState("");

  const { categoryId } = useLocalSearchParams<{ categoryId?: string }>();

  // remove search value and category select when left the screen
  useFocusEffect(
    useCallback(() => {
      return () => {
        setId(null);
        setSearchText("");
      };
    }, []),
  );

  // to set the selected category
  useEffect(() => {
    if (categoryId) {
      setId(Number(categoryId));
    }
    return () => {
      setId(null);
    };
  }, [categoryId]);

  const [bottomSheetVisible, setBottomSheetVisible] = useState<{
    id: number | null;
    visible: boolean;
  }>({
    id: null,
    visible: false,
  });

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
        data={[]} // products handled inside Products
        keyExtractor={() => "dummy"}
        showsVerticalScrollIndicator={false}
        renderItem={null}
        style={styles.scrollView}
        ListHeaderComponent={
          <>
            {categoryId ? (
              <Products
                searchText={searchText}
                categoryId={Number(id)}
                setBottomSheetVisible={setBottomSheetVisible}
              />
            ) : (
              <Products
                searchText={searchText}
                setBottomSheetVisible={setBottomSheetVisible}
              />
            )}
          </>
        }
      />
      {bottomSheetVisible.visible && addToCart(bottomSheetVisible.id)}
    </SafeAreaView>
  );
};

export default shop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingBottom: -20,
  },
  scrollView: {
    marginTop: 60,
    paddingTop: 20,
  },
});
