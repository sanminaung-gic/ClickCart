import { CartItem, Notifiaction, Order } from "@/DATA/types";
import { createContext, useContext, useState } from "react";
import Toast from "react-native-toast-message";
import { authContext } from "./authContext";
export const cartContext = createContext<{
  orders: Array<Order>;
  items: Array<CartItem>;
  notifications: Array<Notifiaction>;
  addItem: (item: CartItem) => void;
  removeItem: (id: number) => void;
  clearCart: () => void;
  placeOrder: () => void;
  increase: (itemId: number) => void;
  decrease: (itemId: number) => void;
}>({
  orders: [],
  items: [],
  notifications: [],
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
  placeOrder: () => {},
  increase: (_itemId: number) => {},
  decrease: (_itemId: number) => {},
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<Array<CartItem>>([]);
  const [orders, setOrders] = useState<Array<Order>>([]);
  const [notifications, setNotifications] = useState<Array<Notifiaction>>([]);

  const auth = useContext(authContext);

  // Function to add item to cart, if item already exists, increase quantity
  const addItem = (item: CartItem) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id);
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i,
        );
      } else {
        return [...prevItems, { ...item }];
      }
    });
    Toast.show({
      type: "success",
      text1: "Added to cart",
      text2: item.name,
      topOffset: 30,
    });
  };

  // Function to increase quantity of an item in the cart
  const increase = (itemId: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  // Function to decrease quantity of an item in the cart, if quantity becomes 0, remove item
  const decrease = (itemId: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((i) => i.id !== id));
  };
  const clearCart = () => {
    setItems([]);
  };

  // Function to place order, creates a new order with current cart items, adds notifications for order processing and confirmation
  const placeOrder = () => {
    const newOrder = {
      id: orders.length > 0 ? orders[orders.length - 1].id + 1 : 1,
      userId: auth.currentUser ? auth.currentUser.id : 0,
      items,
      status: "pending" as const,
      totalAmount: items.reduce(
        (total, item) => total + (item.price ?? 0) * item.quantity,
        0,
      ),
      date: new Date().toISOString(),
    };
    setOrders((prevOrders) => [...prevOrders, newOrder]);
    setItems([]);
    Toast.show({
      type: "success",
      text1: "Order Placed",
      text2: `Your order #${newOrder.id} has been placed successfully!`,
      topOffset: 30,
    });
    setTimeout(() => {
      setNotifications((prevNotifications) => {
        const lastId =
          prevNotifications.length > 0
            ? prevNotifications[prevNotifications.length - 1].id
            : 0;

        return [
          ...prevNotifications,
          {
            id: lastId + 1,
            userId: auth.currentUser ? auth.currentUser.id : 0,
            title: "Order Processing",
            description: `Your order #${newOrder.id} is being processed. Please wait for confirmation`,
            date: newOrder.date,
            isRead: false,
          },
        ];
      });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === newOrder.id ? { ...order, status: "processing" } : order,
        ),
      );
    }, 3000);
    setTimeout(() => {
      setNotifications((prevNotifications) => {
        const lastId =
          prevNotifications.length > 0
            ? prevNotifications[prevNotifications.length - 1].id
            : 0;

        return [
          ...prevNotifications,
          {
            id: lastId + 1,
            userId: auth.currentUser ? auth.currentUser.id : 0,
            title: "Order Confirmed",
            description: `Your order #${newOrder.id} has been confirmed. Check for details`,
            date: newOrder.date,
            isRead: false,
          },
        ];
      });
      setOrders((prev) =>
        prev.map((order) =>
          order.id === newOrder.id ? { ...order, status: "confirmed" } : order,
        ),
      );
    }, 6000);
  };
  return (
    <cartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        orders,
        placeOrder,
        notifications,
        increase,
        decrease,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};
