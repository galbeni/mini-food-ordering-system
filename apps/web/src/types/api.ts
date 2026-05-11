export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthResponse = {
  accessToken: string;
  user: AuthUser;
};

export type CurrentUser = AuthUser & {
  createdAt: string;
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export type Restaurant = {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string | null;
  createdAt: string;
};

export type RestaurantDetail = Restaurant & {
  menuItems: MenuItem[];
  updatedAt: string;
};

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PREPARING"
  | "READY"
  | "DELIVERED"
  | "CANCELLED";

export type OrderItem = {
  id: string;
  menuItemId: string;
  quantity: number;
  unitPrice: number;
  menuItem: MenuItem;
};

export type Order = {
  id: string;
  userId: string;
  restaurantId: string;
  status: OrderStatus;
  totalPrice: number;
  restaurant: Restaurant;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
};

export type RegisterRequest = {
  name: string;
  email: string;
  password: string;
};

export type LoginRequest = {
  email: string;
  password: string;
};

export type CreateOrderRequest = {
  restaurantId: string;
  items: {
    menuItemId: string;
    quantity: number;
  }[];
};
