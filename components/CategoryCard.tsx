import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Category } from '@/types';
import { ThemedText } from './ThemedText';

const { width } = Dimensions.get('window');

interface CategoryCardProps extends Category {
  onPress: (category: Category) => void;
  size?: 'small' | 'medium' | 'large';
}

export function CategoryCard({
  id,
  name,
  icon,
  color,
  itemCount,
  onPress,
  size = 'medium',
}: CategoryCardProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const handlePress = () => {
    // Navigate to category page with the category name
    router.push(`/category/${encodeURIComponent(name)}`);
    
    // Still call the original onPress handler if needed
    onPress({ id, name, icon, color, itemCount });
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          iconSize: 20,
          iconContainerSize: 40,
          fontSize: 10,
          padding: 12,
        };
      case 'large':
        return {
          iconSize: 32,
          iconContainerSize: 64,
          fontSize: 16,
          padding: 20,
        };
      default:
        return {
          iconSize: 24,
          iconContainerSize: 48,
          fontSize: 12,
          padding: 16,
        };
    }
  };

  const sizeStyles = getSizeStyles();

  return (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        { backgroundColor: colors.background },
        { paddingVertical: sizeStyles.padding },
        { width: (width - 60) / 3 },
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
    >
      <View
        style={[
          styles.categoryIcon,
          { backgroundColor: color || '#4CAF50' },
          { width: sizeStyles.iconContainerSize, height: sizeStyles.iconContainerSize },
        ]}
      >
        <Ionicons 
          name={icon as any} 
          size={sizeStyles.iconSize} 
          color="white" 
        />
      </View>
      <ThemedText style={[styles.categoryName, { fontSize: sizeStyles.fontSize }]}>
        {name}
      </ThemedText>
      {itemCount && (
        <ThemedText style={[styles.itemCount, { fontSize: sizeStyles.fontSize - 2 }]}>
          {itemCount}
        </ThemedText>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  categoryItem: {
    alignItems: 'center',
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  categoryIcon: {
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  itemCount: {
    fontWeight: '400',
    textAlign: 'center',
    color: '#666',
  },
}); 