import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { Product } from '@/types';
import { ThemedText } from './ThemedText';

const { width } = Dimensions.get('window');

interface ProductCardProps extends Product {
  onPress: (product: Product) => void;
  showAddToCart?: boolean;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({
  id,
  name,
  price,
  image,
  category,
  farmer,
  rating,
  description,
  quantity,
  unit,
  location,
  badge,
  onPress,
  showAddToCart = false,
  onAddToCart,
}: ProductCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { translations, getProductName } = useLanguage();

  const handlePress = () => {
    // Pass all product data as URL parameters for the product details page
    const params = {
      id,
      name,
      price: price.toString(),
      image,
      category,
      farmer,
      rating: rating.toString(),
      description: description || 'Fresh and high-quality agricultural product sourced directly from local farmers.',
      unit: unit || 'per item',
      location: location || 'Local Farm',
      badge: badge || ''
    };
    
    router.push({
      pathname: `/product/${id}`,
      params
    });
    onPress({ id, name, price, image, category, farmer, rating, description, quantity, unit, location, badge });
  };

  const handleAddToCart = (e: any) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({ id, name, price, image, category, farmer, rating, description, quantity, unit, location, badge });
    }
  };

  return (
    <TouchableOpacity
      style={[styles.productCard, { backgroundColor: colors.background }]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: image }}
          style={styles.productImage}
          contentFit="cover"
          placeholder="https://via.placeholder.com/180x140?text=Loading..."
        />
        {badge && (
          <View style={styles.badgeContainer}>
            <ThemedText style={styles.badgeText}>{badge}</ThemedText>
          </View>
        )}
      </View>
      <View style={styles.productInfo}>
        <ThemedText style={styles.productName} numberOfLines={1}>
          {getProductName(name)}
        </ThemedText>
        <ThemedText style={styles.productFarmer} numberOfLines={1}>
          {farmer}
        </ThemedText>
        {location && (
          <ThemedText style={styles.productLocation} numberOfLines={1}>
            {location}
          </ThemedText>
        )}
        <View style={styles.productFooter}>
          <View style={styles.priceContainer}>
            <ThemedText style={styles.productPrice}>{translations.currency}{price.toLocaleString()}</ThemedText>
            {unit && <ThemedText style={styles.productUnit}> {unit}</ThemedText>}
          </View>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={12} color="#FFD700" />
            <ThemedText style={styles.rating}>{rating}</ThemedText>
          </View>
        </View>
        {showAddToCart && (
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleAddToCart}
          >
            <Ionicons name="add" size={16} color="white" />
            <ThemedText style={styles.addToCartText}>{translations.addToCart}</ThemedText>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  productCard: {
    width: (width - 56) / 2, // Two cards per row with margins
    marginHorizontal: 8,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 140,
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    color: 'white',
    fontWeight: '600',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  productFarmer: {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 2,
  },
  productLocation: {
    fontSize: 11,
    opacity: 0.6,
    marginBottom: 8,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  productUnit: {
    fontSize: 12,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    marginLeft: 4,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 8,
    backgroundColor: '#4CAF50',
  },
  addToCartText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
    marginLeft: 4,
  },
});