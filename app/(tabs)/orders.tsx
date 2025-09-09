import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLanguage } from '@/contexts/LanguageContext';

const { width } = Dimensions.get('window');

interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  farmer: string;
  estimatedDelivery?: string;
}

const mockOrders: OrderItem[] = [
  {
    id: '1',
    orderNumber: '#ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 1425,
    items: [
      { name: 'Fresh Organic Tomatoes', quantity: 2, price: 550 },
      { name: 'Sweet Corn', quantity: 1, price: 385 },
    ],
    farmer: 'সবুজ উপত্যকা খামার',
  },
  {
    id: '2',
    orderNumber: '#ORD-2024-002',
    date: '2024-01-18',
    status: 'shipped',
    total: 990,
    items: [
      { name: 'Fresh Strawberries', quantity: 1, price: 990 },
    ],
    farmer: 'বেরি আনন্দ খামার',
    estimatedDelivery: '2024-01-20',
  },
  {
    id: '3',
    orderNumber: '#ORD-2024-003',
    date: '2024-01-20',
    status: 'pending',
    total: 605,
    items: [
      { name: 'Organic Bell Peppers', quantity: 1, price: 605 },
    ],
    farmer: 'রঙিন ফসল খামার',
    estimatedDelivery: '2024-01-25',
  },
  {
    id: '4',
    orderNumber: '#ORD-2024-004',
    date: '2024-01-22',
    status: 'confirmed',
    total: 1540,
    items: [
      { name: 'Mixed Leafy Greens', quantity: 2, price: 770 },
    ],
    farmer: 'জৈব ফসল কোম্পানি',
    estimatedDelivery: '2024-01-27',
  },
];

export default function OrdersScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { translations, language } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'delivered'>('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return '#4CAF50';
      case 'shipped':
        return '#2196F3';
      case 'confirmed':
        return '#FF9800';
      case 'pending':
        return '#FFC107';
      case 'cancelled':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    if (language === 'bn') {
      switch (status) {
        case 'delivered':
          return 'সরবরাহ করা হয়েছে';
        case 'shipped':
          return 'পাঠানো হয়েছে';
        case 'confirmed':
          return 'নিশ্চিত';
        case 'pending':
          return 'অপেক্ষমান';
        case 'cancelled':
          return 'বাতিল';
        default:
          return status;
      }
    }
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  const filteredOrders = selectedFilter === 'all' 
    ? mockOrders 
    : mockOrders.filter(order => {
        if (selectedFilter === 'delivered') return order.status === 'delivered';
        if (selectedFilter === 'pending') return ['pending', 'confirmed', 'shipped'].includes(order.status);
        return true;
      });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (language === 'bn') {
      return date.toLocaleDateString('bn-BD');
    }
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const renderFilterButton = (filter: 'all' | 'pending' | 'delivered', title: string) => (
    <TouchableOpacity
      style={[
        styles.filterButton,
        selectedFilter === filter && styles.activeFilterButton,
        { borderColor: selectedFilter === filter ? '#4CAF50' : '#ddd' }
      ]}
      onPress={() => setSelectedFilter(filter)}
    >
      <ThemedText style={[
        styles.filterButtonText,
        selectedFilter === filter && styles.activeFilterButtonText
      ]}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );

  const renderOrderCard = (order: OrderItem) => (
    <TouchableOpacity 
      key={order.id}
      style={[styles.orderCard, { backgroundColor: colors.background }]}
    >
      <View style={styles.orderHeader}>
        <View>
          <ThemedText style={styles.orderNumber}>{order.orderNumber}</ThemedText>
          <ThemedText style={styles.orderDate}>{formatDate(order.date)}</ThemedText>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(order.status) }]}>
          <ThemedText style={styles.statusText}>
            {getStatusText(order.status)}
          </ThemedText>
        </View>
      </View>

      <View style={styles.orderItems}>
        {order.items.map((item, index) => (
          <View key={index} style={styles.orderItem}>
            <ThemedText style={styles.itemName}>
              {item.name} × {item.quantity}
            </ThemedText>
            <ThemedText style={styles.itemPrice}>
              ৳{item.price.toLocaleString()}
            </ThemedText>
          </View>
        ))}
      </View>

      <View style={styles.orderFooter}>
        <View style={styles.farmerInfo}>
          <Ionicons name="person-outline" size={16} color={colors.text} />
          <ThemedText style={styles.farmerName}>{order.farmer}</ThemedText>
        </View>
        <ThemedText style={styles.orderTotal}>
          {language === 'en' ? 'Total: ' : 'মোট: '}৳{order.total.toLocaleString()}
        </ThemedText>
      </View>

      {order.estimatedDelivery && order.status !== 'delivered' && (
        <View style={styles.deliveryInfo}>
          <Ionicons name="time-outline" size={16} color="#4CAF50" />
          <ThemedText style={styles.deliveryText}>
            {language === 'en' ? 'Est. delivery: ' : 'আনুমানিক ডেলিভারি: '}
            {formatDate(order.estimatedDelivery)}
          </ThemedText>
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>
          {language === 'en' ? 'My Orders' : 'আমার অর্ডার'}
        </ThemedText>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {renderFilterButton('all', language === 'en' ? 'All Orders' : 'সব অর্ডার')}
        {renderFilterButton('pending', language === 'en' ? 'Active' : 'সক্রিয়')}
        {renderFilterButton('delivered', language === 'en' ? 'Delivered' : 'সরবরাহ করা হয়েছে')}
      </View>

      {/* Orders List */}
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {filteredOrders.length > 0 ? (
          <View style={styles.ordersContainer}>
            {filteredOrders.map(renderOrderCard)}
          </View>
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={64} color="#ccc" />
            <ThemedText style={styles.emptyStateTitle}>
              {language === 'en' ? 'No Orders Found' : 'কোন অর্ডার পাওয়া যায়নি'}
            </ThemedText>
            <ThemedText style={styles.emptyStateDescription}>
              {language === 'en' 
                ? 'You haven\'t placed any orders yet. Start shopping to see your orders here!' 
                : 'আপনি এখনো কোন অর্ডার দেননি। কেনাকাটা শুরু করুন আপনার অর্ডার এখানে দেখতে!'
              }
            </ThemedText>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    gap: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  activeFilterButton: {
    backgroundColor: '#E8F5E8',
    borderColor: '#4CAF50',
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  activeFilterButtonText: {
    color: '#4CAF50',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  ordersContainer: {
    padding: 16,
    gap: 16,
  },
  orderCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: 'white',
  },
  orderItems: {
    marginBottom: 12,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  itemName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4CAF50',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  farmerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  farmerName: {
    fontSize: 14,
    color: '#666',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  deliveryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  deliveryText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
});