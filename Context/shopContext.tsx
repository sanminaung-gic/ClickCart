import { Category, Product } from "@/DATA/types";
import { createContext } from "react";
import CATEGORIES from "../DATA/categories.json";
import PRODUCTS from "../DATA/products.json";

type ShopContextType = {
  categories: Array<Category>;
  products: Array<Product>;
};

export const shopContext = createContext<ShopContextType>({
  categories: [],
  products: [],
});

export const ShopProvider = ({ children }: { children: React.ReactNode }) => {
  const categories = CATEGORIES as Category[];

  const products = PRODUCTS as Product[];
  return (
    <shopContext.Provider value={{ products, categories }}>
      {children}
    </shopContext.Provider>
  );
};
