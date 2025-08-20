
export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  farmer: string;
  rating: number;
  description?: string;
  quantity?: number;
  unit?: string;
  location?: string;
  badge?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  itemCount?: string;
  color?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  address?: string;
  profileImage?: string;
}

export type UserRole = 'farmer' | 'buyer';

export interface Order {
  id: string;
  userId: string;
  products: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  deliveryAddress: string;
  paymentMethod: string;
}

export interface CartItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
} 