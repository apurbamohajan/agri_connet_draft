import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import { productService } from '@/services/firebase';

const { width } = Dimensions.get('window');

const categories = [
  'Vegetables',
  'Fruits', 
  'Grains',
  'Herbs',
  'Dairy',
  'Organic'
];

const badges = [
  'Fresh',
  'Organic', 
  'Premium',
  'Local',
  'Seasonal'
];

export default function AddProductScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { user } = useAuth();
  const { translations, language } = useLanguage();
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Vegetables',
    unit: 'per kg',
    location: '',
    badge: 'Fresh',
    image: '',
    quantity: '1'
  });
  
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name.trim()) {
      Alert.alert('Error', 'Product name is required');
      return;
    }
    
    if (!formData.price.trim() || isNaN(Number(formData.price))) {
      Alert.alert('Error', 'Valid price is required');
      return;
    }

    if (!user) {
      Alert.alert('Error', 'You must be logged in to add products');
      return;
    }

    try {
      setLoading(true);
      
      const productData = {
        name: formData.name.trim(),
        price: Number(formData.price),
        description: formData.description.trim() || 'Fresh agricultural product',
        category: formData.category,
        farmer: user.name || 'Unknown Farmer',
        rating: 5.0, // Default rating for new products
        unit: formData.unit,
        location: formData.location.trim() || 'Bangladesh',
        badge: formData.badge,
        image: formData.image.trim() || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        quantity: Number(formData.quantity) || 1,
      };

      await productService.addProduct(productData, user.uid);
      
      Alert.alert(
        'Success!', 
        'Your product has been listed successfully',
        [
          {
            text: 'Add Another',
            onPress: () => {
              setFormData({
                name: '',
                price: '',
                description: '',
                category: 'Vegetables',
                unit: 'per kg',
                location: '',
                badge: 'Fresh',
                image: '',
                quantity: '1'
              });
            }
          },
          {
            text: 'Go Home',
            onPress: () => router.push('/(tabs)/')
          }
        ]
      );
      
    } catch (error: any) {
      console.error('Error adding product:', error);
      Alert.alert('Error', `Failed to add product: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const renderCategorySelector = () => (
    <View style={styles.selectorContainer}>
      <ThemedText style={styles.label}>Category *</ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.selectorItem,
              formData.category === category && styles.selectorItemActive
            ]}
            onPress={() => handleInputChange('category', category)}
          >
            <ThemedText style={[
              styles.selectorText,
              formData.category === category && styles.selectorTextActive
            ]}>
              {category}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderBadgeSelector = () => (
    <View style={styles.selectorContainer}>
      <ThemedText style={styles.label}>Badge</ThemedText>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {badges.map((badge) => (
          <TouchableOpacity
            key={badge}
            style={[
              styles.selectorItem,
              formData.badge === badge && styles.selectorItemActive
            ]}
            onPress={() => handleInputChange('badge', badge)}
          >
            <ThemedText style={[
              styles.selectorText,
              formData.badge === badge && styles.selectorTextActive
            ]}>
              {badge}
            </ThemedText>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <ThemedText style={styles.headerTitle}>Add New Product</ThemedText>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          {/* Product Name */}
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Product Name *</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background }]}
              value={formData.name}
              onChangeText={(text) => handleInputChange('name', text)}
              placeholder="e.g., Fresh Organic Tomatoes"
              placeholderTextColor="#999"
            />
          </View>

          {/* Price and Unit */}
          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <ThemedText style={styles.label}>Price (৳) *</ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: colors.background }]}
                value={formData.price}
                onChangeText={(text) => handleInputChange('price', text)}
                placeholder="550"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <ThemedText style={styles.label}>Unit</ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: colors.background }]}
                value={formData.unit}
                onChangeText={(text) => handleInputChange('unit', text)}
                placeholder="per kg"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Category Selector */}
          {renderCategorySelector()}

          {/* Description */}
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Description</ThemedText>
            <TextInput
              style={[styles.textArea, { backgroundColor: colors.background }]}
              value={formData.description}
              onChangeText={(text) => handleInputChange('description', text)}
              placeholder="Describe your product..."
              placeholderTextColor="#999"
              multiline
              numberOfLines={4}
            />
          </View>

          {/* Location and Quantity */}
          <View style={styles.row}>
            <View style={[styles.inputContainer, { flex: 1, marginRight: 8 }]}>
              <ThemedText style={styles.label}>Location</ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: colors.background }]}
                value={formData.location}
                onChangeText={(text) => handleInputChange('location', text)}
                placeholder="সিলেট"
                placeholderTextColor="#999"
              />
            </View>
            <View style={[styles.inputContainer, { flex: 1, marginLeft: 8 }]}>
              <ThemedText style={styles.label}>Quantity</ThemedText>
              <TextInput
                style={[styles.input, { backgroundColor: colors.background }]}
                value={formData.quantity}
                onChangeText={(text) => handleInputChange('quantity', text)}
                placeholder="1"
                placeholderTextColor="#999"
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Badge Selector */}
          {renderBadgeSelector()}

          {/* Image URL */}
          <View style={styles.inputContainer}>
            <ThemedText style={styles.label}>Image URL (Optional)</ThemedText>
            <TextInput
              style={[styles.input, { backgroundColor: colors.background }]}
              value={formData.image}
              onChangeText={(text) => handleInputChange('image', text)}
              placeholder="https://images.unsplash.com/..."
              placeholderTextColor="#999"
            />
            {formData.image ? (
              <Image source={{ uri: formData.image }} style={styles.imagePreview} />
            ) : null}
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Ionicons name="add-circle" size={20} color="white" />
            <ThemedText style={styles.submitButtonText}>
              {loading ? 'Adding Product...' : 'List Product'}
            </ThemedText>
          </TouchableOpacity>
        </View>
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
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
  },
  selectorContainer: {
    marginBottom: 20,
  },
  horizontalScroll: {
    marginTop: 8,
  },
  selectorItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 8,
    backgroundColor: 'white',
  },
  selectorItemActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  selectorText: {
    fontSize: 14,
    color: '#666',
  },
  selectorTextActive: {
    color: 'white',
    fontWeight: '600',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 20,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});