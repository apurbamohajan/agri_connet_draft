# Development Guidelines & Coding Standards

## 📝 Code Style Guide

### TypeScript Standards

#### File Naming Conventions
```typescript
// Component files: PascalCase
ProductCard.tsx
CategoryList.tsx
UserProfile.tsx

// Hook files: camelCase with 'use' prefix
useAuth.ts
useThemeColor.ts
useProductData.ts

// Utility files: camelCase
apiHelpers.ts
dateUtils.ts
validationHelpers.ts

// Type files: camelCase
userTypes.ts
productTypes.ts
apiTypes.ts

// Context files: PascalCase with 'Context' suffix
AuthContext.tsx
CartContext.tsx
ThemeContext.tsx
```

#### Component Structure
```typescript
// Preferred component structure
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

interface ProductCardProps {
  title: string;
  price: number;
  imageUrl?: string;
  onPress?: () => void;
}

export default function ProductCard({ 
  title, 
  price, 
  imageUrl, 
  onPress 
}: ProductCardProps) {
  const backgroundColor = useThemeColor({}, 'background');

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.price}>${price}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 8,
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#666',
  },
});
```

#### Type Definitions
```typescript
// Always use interfaces for object types
interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'buyer';
  createdAt: Date;
}

// Use type aliases for unions or computed types
type UserRole = 'farmer' | 'buyer' | 'admin';
type ApiResponse<T> = {
  data: T;
  status: 'success' | 'error';
  message?: string;
};

// Generic types for reusable components
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  onItemPress?: (item: T) => void;
}
```

### React Native Best Practices

#### State Management
```typescript
// Use Context for global state
const CartContext = createContext<CartContextType | undefined>(undefined);

// Use local state for component-specific data
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState<string | null>(null);

// Use useCallback for functions passed to children
const handleProductPress = useCallback((productId: string) => {
  // Handle press logic
}, []);

// Use useMemo for expensive calculations
const filteredProducts = useMemo(() => {
  return products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
}, [products, searchTerm]);
```

#### Error Handling
```typescript
// Always wrap async operations in try-catch
const fetchProducts = async () => {
  try {
    setIsLoading(true);
    setError(null);
    const products = await productService.getProducts();
    setProducts(products);
  } catch (error) {
    setError(error instanceof Error ? error.message : 'Unknown error');
    console.error('Failed to fetch products:', error);
  } finally {
    setIsLoading(false);
  }
};

// Use error boundaries for catching component errors
class ErrorBoundary extends React.Component {
  // Implementation details...
}
```

#### Performance Optimization
```typescript
// Use React.memo for components that don't need frequent re-renders
export default React.memo(ProductCard);

// Use FlatList for large lists
<FlatList
  data={products}
  renderItem={({ item }) => <ProductCard product={item} />}
  keyExtractor={(item) => item.id}
  removeClippedSubviews={true}
  maxToRenderPerBatch={10}
  windowSize={10}
/>
```

---

## 🔧 Development Workflow

### Git Commit Standards

#### Conventional Commits
```bash
# Format: type(scope): description
# Types: feat, fix, docs, style, refactor, test, chore

feat(auth): add user registration functionality
fix(cart): resolve duplicate item issue in cart
docs(readme): update installation instructions
style(components): improve button component styling
refactor(api): extract common request logic
test(utils): add tests for date utility functions
chore(deps): update React Native to v0.72
```

#### Commit Message Examples
```bash
# Good commits
feat(product): add product image gallery
fix(search): handle empty search results properly
docs(api): document authentication endpoints

# Avoid
git commit -m "fixed stuff"
git commit -m "updates"
git commit -m "working on feature"
```

### Branch Naming Conventions
```bash
# Feature branches
feature/product-catalog
feature/user-authentication
feature/shopping-cart

# Bug fix branches
bugfix/cart-quantity-issue
bugfix/login-validation-error
bugfix/image-loading-problem

# Hotfix branches (for urgent production fixes)
hotfix/security-vulnerability
hotfix/critical-crash-fix

# Release branches
release/v1.0.0
release/v1.1.0
```

### Pull Request Guidelines

#### PR Title Format
```
[Type] Brief description of changes

Examples:
[Feature] Add product search functionality
[Bugfix] Fix cart item duplication issue
[Docs] Update API documentation
[Refactor] Improve authentication error handling
```

#### PR Description Template
```markdown
## 📋 Description
Brief description of what this PR does.

## 🔗 Related Issues
- Closes #123
- Fixes #456

## 🧪 Testing
- [ ] Tested on Android
- [ ] Tested on iOS
- [ ] Tested on Web
- [ ] Added/updated tests

## 📸 Screenshots (if applicable)
Add screenshots for UI changes.

## ✅ Checklist
- [ ] Code follows project style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex logic
- [ ] Documentation updated
- [ ] No console.log statements left
```

---

## 🧪 Testing Standards

### Unit Testing
```typescript
// Test file naming: ComponentName.test.tsx
// utils/validation.test.ts

import { render, fireEvent } from '@testing-library/react-native';
import ProductCard from '../ProductCard';

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    const product = {
      id: '1',
      name: 'Test Product',
      price: 29.99,
    };

    const { getByText } = render(<ProductCard product={product} />);
    
    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('$29.99')).toBeTruthy();
  });

  it('calls onPress when tapped', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <ProductCard product={product} onPress={onPress} />
    );

    fireEvent.press(getByTestId('product-card'));
    expect(onPress).toHaveBeenCalledWith(product);
  });
});
```

### Manual Testing Checklist
```markdown
## Before Each PR
- [ ] Test on both Android and iOS
- [ ] Test in both light and dark themes
- [ ] Test with different screen sizes
- [ ] Test error states and edge cases
- [ ] Verify navigation flows
- [ ] Check performance (no stuttering/lag)
- [ ] Test offline behavior (if applicable)
```

---

## 📱 Platform-Specific Guidelines

### React Native Performance
```typescript
// Use getItemLayout for FlatList when possible
const getItemLayout = (data: any, index: number) => ({
  length: ITEM_HEIGHT,
  offset: ITEM_HEIGHT * index,
  index,
});

// Optimize images
<Image
  source={{ uri: imageUrl }}
  style={styles.image}
  resizeMode="cover"
  loadingIndicatorSource={require('../assets/placeholder.png')}
/>

// Use native driver for animations
Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 300,
  useNativeDriver: true,
}).start();
```

### Navigation Best Practices
```typescript
// Use typed navigation
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  Product: { productId: string };
  Category: { categoryName: string };
};

type ProductScreenProps = NativeStackScreenProps<RootStackParamList, 'Product'>;

// Navigation with proper typing
navigation.navigate('Product', { productId: '123' });
```

---

## 🔒 Security Guidelines

### Data Validation
```typescript
// Always validate user input
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Sanitize data before sending to API
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};
```

### Firebase Security
```typescript
// Never expose sensitive keys in client code
// Use environment variables
const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  // ... other config
};

// Always validate Firebase operations
const createUser = async (userData: UserData) => {
  try {
    // Validate input
    if (!userData.email || !validateEmail(userData.email)) {
      throw new Error('Invalid email address');
    }
    
    const result = await auth().createUserWithEmailAndPassword(
      userData.email,
      userData.password
    );
    return result;
  } catch (error) {
    // Handle and log errors appropriately
    console.error('User creation failed:', error);
    throw error;
  }
};
```

---

## 📝 Documentation Standards

### Code Comments
```typescript
// Use JSDoc for functions
/**
 * Calculates the total price including tax
 * @param basePrice - The base price before tax
 * @param taxRate - Tax rate as decimal (e.g., 0.08 for 8%)
 * @returns The total price including tax
 */
const calculateTotalPrice = (basePrice: number, taxRate: number): number => {
  return basePrice * (1 + taxRate);
};

// Use inline comments for complex logic
const processOrderItems = (items: CartItem[]) => {
  // Group items by vendor to optimize shipping
  const groupedItems = items.reduce((acc, item) => {
    const vendorId = item.vendorId;
    if (!acc[vendorId]) {
      acc[vendorId] = [];
    }
    acc[vendorId].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  return groupedItems;
};
```

### README Updates
- Keep README current with any major changes
- Update setup instructions when dependencies change
- Add new team members to the team section
- Document any new environment variables

---

## 🚀 Deployment Guidelines

### Pre-deployment Checklist
```markdown
## Before Releasing
- [ ] All tests pass
- [ ] Code reviewed and approved
- [ ] Performance tested
- [ ] Security review completed
- [ ] Documentation updated
- [ ] Changelog updated
- [ ] Version number incremented
- [ ] Production config verified
```

### Version Management
```bash
# Semantic versioning: MAJOR.MINOR.PATCH
# MAJOR: Breaking changes
# MINOR: New features (backward compatible)
# PATCH: Bug fixes

# Examples:
v1.0.0 - Initial release
v1.1.0 - Added product search feature
v1.1.1 - Fixed cart calculation bug
v2.0.0 - Major API changes
```

---

## ⚡ Performance Guidelines

### Code Optimization
```typescript
// Avoid inline objects and functions in render
// Bad
<FlatList
  data={products}
  renderItem={(item) => <ProductCard product={item} />}
  style={{ flex: 1 }}
/>

// Good
const renderItem = useCallback(({ item }) => (
  <ProductCard product={item} />
), []);

const listStyle = { flex: 1 };

<FlatList
  data={products}
  renderItem={renderItem}
  style={listStyle}
/>
```

### Image Optimization
```typescript
// Use appropriate image formats and sizes
// Implement lazy loading for images
// Use cached network images
import { CachedImage } from 'react-native-cached-image';

<CachedImage
  source={{ uri: imageUrl }}
  style={styles.image}
  fallbackSource={require('../assets/placeholder.png')}
/>
```

---

## 🔧 IDE Configuration

### Recommended VS Code Extensions
```json
{
  "recommendations": [
    "ms-vscode.vscode-typescript-next",
    "esbenp.prettier-vscode",
    "ms-vscode.vscode-eslint",
    "ms-vscode.vscode-json",
    "bradlc.vscode-tailwindcss",
    "expo.vscode-expo-tools"
  ]
}
```

### ESLint Configuration
The project already includes ESLint configuration. Ensure your IDE is configured to:
- Show ESLint errors and warnings
- Auto-fix on save (where possible)
- Format code with Prettier on save

---

Remember: Consistent code style and good practices make collaboration easier and code more maintainable! 🚀