import { Ionicons } from '@expo/vector-icons';

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
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  itemCount?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'buyer' | 'farmer';
  avatar?: string;
  phone?: string;
  address?: string;
}

export interface Order {
  id: string;
  userId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
  deliveryAddress?: string;
  farmerId?: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
} 