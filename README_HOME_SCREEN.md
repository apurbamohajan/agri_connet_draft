# AgriConnect Home Screen

## Overview

The home screen is the main landing page of the AgriConnect app, designed to provide a comprehensive overview for both buyers and farmers. It features a modern, mobile-first design with intuitive navigation and quick access to key features.

## Features

### 🏠 **Header Section**
- Personalized greeting with emoji
- Profile button for quick access to user settings
- Responsive design that adapts to light/dark themes

### 🔍 **Search Functionality**
- Real-time search bar with clear button
- Search suggestions and history (to be implemented)
- Search across products, categories, and farmers

### 📂 **Categories Grid**
- 6 main product categories with colorful icons
- Responsive grid layout (3 columns)
- Touch feedback and smooth animations
- Categories: Vegetables, Grains, Fruits, Dairy, Meat, Herbs

### ⚡ **Quick Actions**
- Add Product (for farmers)
- My Cart (for buyers)
- My Orders (for both)
- Messages (for communication)

### 🛍️ **Featured Products**
- Horizontal scrollable product cards
- Product images, names, prices, and ratings
- Add to cart functionality
- Farmer information display

### 📦 **Recent Orders**
- Order status tracking
- Order details and delivery information
- Quick access to order history

## Components

### ProductCard
**Location**: `components/ProductCard.tsx`

A reusable component for displaying product information with:
- Product image with placeholder
- Product name and farmer
- Price and rating display
- Optional "Add to Cart" button
- Touch feedback and animations

**Props**:
```typescript
interface ProductCardProps extends Product {
  onPress: (product: Product) => void;
  showAddToCart?: boolean;
  onAddToCart?: (product: Product) => void;
}
```

### CategoryCard
**Location**: `components/CategoryCard.tsx`

A reusable component for displaying product categories with:
- Customizable icon and color
- Responsive sizing (small, medium, large)
- Touch feedback and animations
- Grid layout support

**Props**:
```typescript
interface CategoryCardProps extends Category {
  onPress: (category: Category) => void;
  size?: 'small' | 'medium' | 'large';
}
```

### SearchBar
**Location**: `components/SearchBar.tsx`

A reusable search component with:
- Search icon and clear button
- Customizable placeholder text
- Search submission handling
- Theme-aware styling

**Props**:
```typescript
interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  style?: any;
}
```

## Data Models

### Product
```typescript
interface Product {
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
}
```

### Category
```typescript
interface Category {
  id: string;
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
}
```

## Styling

The home screen uses a consistent design system with:
- **Shadows**: Subtle elevation for cards and containers
- **Border Radius**: 12px for cards, 6px for buttons
- **Colors**: Theme-aware colors from the Colors constant
- **Typography**: Consistent font sizes and weights
- **Spacing**: 20px horizontal padding, 16px vertical spacing

## Responsive Design

- **Grid Layout**: Categories use responsive grid (3 columns)
- **Product Cards**: Fixed width (160px) with horizontal scroll
- **Quick Actions**: 2-column layout for better mobile experience
- **Safe Area**: Proper handling of device notches and status bars

## Performance Optimizations

- **Image Loading**: Expo Image with placeholder support
- **Touch Feedback**: Active opacity for better UX
- **Scroll Performance**: Optimized ScrollView with proper indicators
- **Component Reusability**: Modular components for better performance

## Future Enhancements

### Planned Features
- [ ] Pull-to-refresh functionality
- [ ] Infinite scroll for products
- [ ] Search suggestions and filters
- [ ] Offline support for cached data
- [ ] Push notifications for order updates
- [ ] Voice search capability
- [ ] AR product preview (future)

### Technical Improvements
- [ ] Implement proper state management (Redux/Context)
- [ ] Add proper error boundaries
- [ ] Implement proper loading states
- [ ] Add unit tests for components
- [ ] Implement proper caching strategy
- [ ] Add analytics tracking

## Usage Examples

### Basic Usage
```typescript
import { ProductCard } from '@/components/ProductCard';

<ProductCard
  id="1"
  name="Fresh Tomatoes"
  price={2.99}
  image="https://example.com/tomatoes.jpg"
  category="Vegetables"
  farmer="Green Valley Farm"
  rating={4.5}
  onPress={(product) => console.log('Product selected:', product)}
  showAddToCart={true}
  onAddToCart={(product) => console.log('Added to cart:', product)}
/>
```

### Category Usage
```typescript
import { CategoryCard } from '@/components/CategoryCard';

<CategoryCard
  id="1"
  name="Vegetables"
  icon="leaf"
  color="#4CAF50"
  onPress={(category) => console.log('Category selected:', category)}
  size="medium"
/>
```

## Dependencies

- **React Native**: Core framework
- **Expo**: Development platform
- **@expo/vector-icons**: Icon library
- **expo-image**: Optimized image component
- **react-native-safe-area-context**: Safe area handling

## File Structure

```
app/(tabs)/
├── index.tsx              # Main home screen
components/
├── ProductCard.tsx        # Product display component
├── CategoryCard.tsx       # Category display component
├── SearchBar.tsx          # Search functionality
types/
├── index.ts              # TypeScript interfaces
```

This home screen provides a solid foundation for the AgriConnect app, with modular components that can be easily extended and maintained as the app grows. 