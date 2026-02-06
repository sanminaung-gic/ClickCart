type Notifiaction = {
  id: number;
  userId: number;
  title: string;
  description: string;
  date: string;
  isRead: boolean;
};

type User = {
  id: number;
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
  card: string;
  profile_photo: string;
};

type Product = {
  id: number;
  categoryId: number;
  brand: string;
  name: string;
  price: number;
  image: string;
  desc: string;
  popular?: boolean;
};

type Order = {
  id: number;
  userId: number;
  items: Array<{
    id: number;
    quantity: number;
    name: string;
    brand?: string;
    image?: any;
    price?: number;
  }>;
  status: "pending" | "processing" | "confirmed" | "canceled";
  totalAmount: number;
  date: string;
};

type CartItem = {
  id: number;
  name: string;
  brand?: string;
  image?: any;
  price?: number;
  quantity: number;
};

type Category = {
  id: number;
  title: string;
  icon: string;
};
export { CartItem, Category, Notifiaction, Order, Product, User };
