import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

export default function CartScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { translations, language, getProductName } = useLanguage();
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity, 
    getCartSubtotal, 
    getCartTotal,
    getCartItemCount 
  } = useCart();

  const removeItem = (id: string) => {
    Alert.alert(
      language === 'en' ? 'Remove Item' : 'আইটেম সরান',
      language === 'en' ? 'Are you sure you want to remove this item from cart?' : 'আপনি কি নিশ্চিত যে আপনি এই আইটেমটি কার্ট থেকে সরাতে চান?',
      [
        {
          text: language === 'en' ? 'Cancel' : 'বাতিল',
          style: 'cancel',
        },
        {
          text: language === 'en' ? 'Remove' : 'সরান',
          style: 'destructive',
          onPress: () => {
            removeFromCart(id);
          },
        },
      ]
    );
  };

  const calculateSubtotal = () => {
    return getCartSubtotal();
  };

  const calculateTotal = () => {
    return getCartTotal();
  };

  const handleCheckout = () => {
    Alert.alert(
      language === 'en' ? 'Proceed to Checkout' : 'চেকআউটে এগিয়ে যান',
      language === 'en' ? 'This feature will be available soon!' : 'এই বৈশিষ্ট্যটি শীঘ্রই উপলব্ধ হবে!',
      [{ text: language === 'en' ? 'OK' : 'ঠিক আছে' }]
    );
  };

  const handleContinueShopping = () => {
    router.back();
  };

  const renderCartItem = (item: CartItem) => (
    <View key={item.id} style={[styles.cartItem, { backgroundColor: colors.background }]}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      
      <View style={styles.itemDetails}>
        <ThemedText style={styles.itemName}>
          {getProductName(item.name)}
        </ThemedText>
        <ThemedText style={styles.itemFarmer}>
          {language === 'en' ? 'by' : 'দ্বারা'} {item.farmer} • {item.location}
        </ThemedText>
        <View style={styles.categoryBadge}>
          <ThemedText style={styles.categoryText}>{item.category}</ThemedText>
        </View>
        
        <View style={styles.itemFooter}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Ionicons name="remove" size={16} color="#666" />
            </TouchableOpacity>
            <ThemedText style={styles.quantityText}>{item.quantity}</ThemedText>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Ionicons name="add" size={16} color="#666" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.priceContainer}>
            <ThemedText style={styles.itemPrice}>
              ৳{(item.price * item.quantity).toLocaleString()}
            </ThemedText>
            <ThemedText style={styles.itemUnit}>
              ৳{item.price.toLocaleString()} {item.unit}
            </ThemedText>
          </View>
        </View>
      </View>
      
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => removeItem(item.id)}
      >
        <Ionicons name="trash-outline" size={20} color="#F44336" />
      </TouchableOpacity>
    </View>
  );

  const renderOrderSummary = () => (
    <View style={[styles.orderSummary, { backgroundColor: '#E8F5E8' }]}>
      <ThemedText style={styles.orderSummaryTitle}>
        {translations.orderSummary}
      </ThemedText>
      
      <View style={styles.summaryRow}>
        <ThemedText style={styles.summaryLabel}>
          {translations.subtotal}
        </ThemedText>
        <ThemedText style={styles.summaryValue}>
          ৳{calculateSubtotal().toLocaleString()}
        </ThemedText>
      </View>
      
      <View style={styles.summaryRow}>
        <ThemedText style={styles.summaryLabel}>
          {translations.deliveryFee}
        </ThemedText>
        <ThemedText style={styles.summaryValue}>৳55</ThemedText>
      </View>
      
      <View style={[styles.summaryRow, styles.totalRow]}>
        <ThemedText style={styles.totalLabel}>
          {translations.total}
        </ThemedText>
        <ThemedText style={styles.totalValue}>
          ৳{calculateTotal().toLocaleString()}
        </ThemedText>
      </View>
    </View>
  );

  const renderDeliveryInfo = () => (
    <View style={[styles.deliveryInfo, { backgroundColor: '#E8F5E8' }]}>
      <View style={styles.deliveryHeader}>
        <Ionicons name="car" size={20} color="#4CAF50" />
        <ThemedText style={styles.deliveryTitle}>
          {translations.deliveryInformation}
        </ThemedText>
      </View>
      <ThemedText style={styles.deliveryText}>
        {translations.estimatedDelivery}
      </ThemedText>
    </View>
  );

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color="#333" />
          </TouchableOpacity>
          <ThemedText style={styles.headerTitle}>
            {translations.myCart}
          </ThemedText>
          <View style={styles.placeholder} />
        </View>
        
        <View style={styles.emptyCart}>
          <Ionicons name="cart-outline" size={80} color="#ccc" />
          <ThemedText style={styles.emptyCartTitle}>
            {translations.cartEmpty}
          </ThemedText>
          <ThemedText style={styles.emptyCartDescription}>
            {language === 'en' 
              ? 'Add some fresh products from local farms to get started!'
              : 'শুরু করতে স্থানীয় খামার থেকে কিছু তাজা পণ্য যোগ করুন!'
            }
          </ThemedText>
          <TouchableOpacity style={styles.continueShoppingButton} onPress={handleContinueShopping}>
            <ThemedText style={styles.continueShoppingText}>
              {translations.continueShopping}
            </ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>
          {translations.myCart} ({getCartItemCount()} {translations.items})
        </ThemedText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Cart Items */}
        <View style={styles.cartItemsContainer}>
          {cartItems.map(renderCartItem)}
        </View>

        {/* Order Summary */}
        {renderOrderSummary()}

        {/* Delivery Information */}
        {renderDeliveryInfo()}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <ThemedText style={styles.checkoutButtonText}>
            {translations.proceedToCheckout}
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.continueShoppingButton} onPress={handleContinueShopping}>
          <ThemedText style={styles.continueShoppingText}>
            {translations.continueShopping}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  cartItemsContainer: {
    padding: 16,
    gap: 16,
  },
  cartItem: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  itemFarmer: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
    marginBottom: 12,
  },
  categoryText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 20,
    textAlign: 'center',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  itemUnit: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  removeButton: {
    padding: 8,
    marginLeft: 8,
  },
  orderSummary: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
  },
  orderSummaryTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#333',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  totalRow: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#4CAF50',
    marginTop: 8,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  deliveryInfo: {
    margin: 16,
    marginTop: 0,
    padding: 20,
    borderRadius: 12,
  },
  deliveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliveryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginLeft: 8,
  },
  deliveryText: {
    fontSize: 14,
    color: '#4CAF50',
    lineHeight: 20,
  },
  footer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    gap: 12,
  },
  checkoutButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  continueShoppingButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  continueShoppingText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyCartTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyCartDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
});