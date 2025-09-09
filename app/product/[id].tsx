import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';

export default function ProductDetails() {
  const params = useLocalSearchParams();
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);
  const { translations, language, getProductName, getProductDescription } = useLanguage();
  const { addToCart } = useCart();

  // Parse the price as a number and provide a fallback
  const price = typeof params.price === 'string' ? parseFloat(params.price) : 0;
  const rating = typeof params.rating === 'string' ? parseFloat(params.rating) : 0;
  
  // Create a list of fallback images that should work
  const fallbackImages = [
    'https://via.placeholder.com/300x300/4CAF50/white?text=Fresh+Produce',
    'https://picsum.photos/300/300?random=1',
    'https://via.placeholder.com/300x300/FF9800/white?text=Agricultural+Product',
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iIzRDQUY1MCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjE4IiBmaWxsPSJ3aGl0ZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkZyZXNoIFByb2R1Y2U8L3RleHQ+PC9zdmc+'
  ];

  // Function to get a working image URL
  const getWorkingImageUrl = (originalImage: string) => {
    // First try the original image
    if (originalImage && originalImage !== 'https://via.placeholder.com/300x300?text=No+Image') {
      return originalImage;
    }
    // If original fails, use the current fallback
    return fallbackImages[currentImageIndex] || fallbackImages[0];
  };

  // Function to try next fallback image
  const tryNextImage = () => {
    if (currentImageIndex < fallbackImages.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
      setImageError(false);
    }
  };

  // Provide default values for missing parameters
  const originalProductName = (typeof params.name === 'string' ? params.name : 'Product Name');
  const productData = {
    id: (typeof params.id === 'string' ? params.id : 'unknown'),
    name: getProductName(originalProductName),
    originalName: originalProductName, // Keep original for translation lookup
    price: price,
    image: getWorkingImageUrl(typeof params.image === 'string' ? params.image : ''),
    category: (typeof params.category === 'string' ? params.category : 'General'),
    farmer: (typeof params.farmer === 'string' ? params.farmer : 'Local Farmer'),
    rating: rating,
    description: getProductDescription(originalProductName),
    unit: (typeof params.unit === 'string' ? params.unit : 'per item'),
    location: (typeof params.location === 'string' ? params.location : 'Local Farm'),
    badge: (typeof params.badge === 'string' ? params.badge : '')
  };

  // Debug: Log the final product data
  console.log('Product Details - Image URL:', productData.image);

  const handleAddToCart = async () => {
    try {
      setIsAddingToCart(true);
      // Add product to cart using the cart context
      addToCart({
        id: productData.id,
        name: productData.name,
        price: productData.price,
        image: productData.image,
        category: productData.category,
        farmer: productData.farmer,
        rating: productData.rating,
        description: productData.description,
        unit: productData.unit,
        location: productData.location,
        badge: productData.badge,
      });
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>{translations.productDetails}</ThemedText>
        <View style={styles.placeholder} />
      </View>
      
      <ScrollView>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: productData.image }}
            style={styles.image}
            contentFit="cover"
            placeholder="https://via.placeholder.com/300x300?text=Loading..."
            onError={(error) => {
              console.log('Image loading error:', error);
              setImageLoading(false);
              tryNextImage();
              if (currentImageIndex >= fallbackImages.length - 1) {
                setImageError(true);
              }
            }}
            onLoad={() => {
              console.log('Image loaded successfully');
              setImageLoading(false);
              setImageError(false);
            }}
            onLoadStart={() => {
              console.log('Image loading started');
              setImageLoading(true);
            }}
          />
          {imageError && (
            <View style={styles.imagePlaceholder}>
              <Ionicons name="image-outline" size={60} color={colors.icon} />
              <ThemedText style={styles.imagePlaceholderText}>{translations.imageNotAvailable}</ThemedText>
              <TouchableOpacity 
                style={styles.retryButton} 
                onPress={() => {
                  setImageError(false);
                  setCurrentImageIndex(0);
                }}
              >
                <ThemedText style={styles.retryButtonText}>{translations.tryAgain}</ThemedText>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        <View style={styles.content}>
          <View style={styles.productHeader}>
            <ThemedText style={styles.title}>{productData.name}</ThemedText>
            <View style={styles.priceContainer}>
              <ThemedText style={styles.price}>{translations.currency}{productData.price.toLocaleString()}</ThemedText>
              <ThemedText style={styles.unit}>{productData.unit}</ThemedText>
            </View>
          </View>

          {productData.badge && (
            <View style={styles.badgeContainer}>
              <ThemedText style={styles.badgeText}>{productData.badge}</ThemedText>
            </View>
          )}

          <View style={styles.farmerInfo}>
            <Ionicons name="person-outline" size={20} color={colors.text} />
            <ThemedText style={styles.farmerName}>{productData.farmer} • {productData.location}</ThemedText>
          </View>

          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={18} color="#FFD700" />
            <ThemedText style={styles.rating}>{productData.rating.toFixed(1)} (Reviews)</ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>{translations.description}</ThemedText>
            <ThemedText style={styles.description}>{productData.description}</ThemedText>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>{translations.productDetails}</ThemedText>
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>{translations.category}:</ThemedText>
                <ThemedText style={styles.detailValue}>{productData.category}</ThemedText>
              </View>
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>{translations.farmer}:</ThemedText>
                <ThemedText style={styles.detailValue}>{productData.farmer}</ThemedText>
              </View>
              <View style={styles.detailRow}>
                <ThemedText style={styles.detailLabel}>{translations.location}:</ThemedText>
                <ThemedText style={styles.detailValue}>{productData.location}</ThemedText>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Shipping & Storage</ThemedText>
            <ThemedText style={styles.description}>
              Ships within 2-3 business days. Refrigerated shipping available.
              Store at room temperature until ripe, then refrigerate for up to 1 week.
            </ThemedText>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.footerPriceContainer}>
          <ThemedText style={styles.footerPrice}>{translations.currency}{productData.price.toLocaleString()}</ThemedText>
          <ThemedText style={styles.footerUnit}>{productData.unit}</ThemedText>
        </View>
        <TouchableOpacity 
          style={[styles.addToCartButton, isAddingToCart && styles.addToCartButtonDisabled]}
          onPress={handleAddToCart}
          disabled={isAddingToCart}
        >
          <Ionicons name="cart-outline" size={20} color="white" />
          <ThemedText style={styles.addToCartText}>
            {isAddingToCart ? (language === 'en' ? 'Adding...' : 'যোগ করা হচ্ছে...') : translations.addToCart}
          </ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: 'white',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  placeholder: {
    width: 40,
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: 'transparent',
  },
  imageContainer: {
    position: 'relative',
    backgroundColor: 'white',
  },
  imagePlaceholder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 245, 245, 0.9)',
    zIndex: 1,
  },
  imagePlaceholderText: {
    marginTop: 8,
    fontSize: 14,
    opacity: 0.6,
  },
  imageDebugText: {
    marginTop: 4,
    fontSize: 10,
    opacity: 0.4,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  retryButton: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  content: {
    padding: 16,
  },
  productHeader: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4CAF50',
  },
  unit: {
    marginLeft: 4,
    fontSize: 14,
    color: '#666',
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 12,
    color: 'white',
    fontWeight: '600',
  },
  farmerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  farmerName: {
    marginLeft: 8,
    fontSize: 14,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  rating: {
    marginLeft: 4,
    fontSize: 14,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
  detailsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: 'white',
  },
  footerPriceContainer: {
    flex: 1,
    marginRight: 16,
  },
  footerPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  footerUnit: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    minWidth: 140,
  },
  addToCartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  addToCartButtonDisabled: {
    opacity: 0.7,
  },
});