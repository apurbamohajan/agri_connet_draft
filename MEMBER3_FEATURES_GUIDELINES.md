# Core Features Developer Guidelines (Member 3)

## ⚙️ Your Responsibilities

You are the feature architect of AgriConnect, responsible for implementing core business logic, user workflows, and ensuring all features work seamlessly together.

### 🎯 Primary Focus Areas
- **Application Logic**: Implementing core business functionality
- **Navigation & Routing**: App navigation flow and screen transitions
- **Shopping Cart**: Complete cart functionality and checkout process
- **Search & Filtering**: Product search and filtering capabilities
- **Order Management**: Order processing and tracking features
- **Integration Testing**: Ensuring all components work together
- **Quality Assurance**: Testing, debugging, and performance optimization

## 📁 Your Key Files

### Core Application Screens (`app/`)
```
app/
├── cart.tsx               # Shopping cart functionality
├── login.tsx              # Authentication screens and logic
├── category/[name].tsx    # Category browsing and filtering
├── product/[id].tsx       # Product details and interaction
├── _layout.tsx            # App-wide layout and navigation
└── +not-found.tsx         # Error handling screens
```

### Custom Hooks (`hooks/`)
```
hooks/
├── useColorScheme.ts      # Theme management logic
├── useThemeColor.ts       # Color utilities
└── [custom hooks]         # Additional business logic hooks
```

### Integration Components (`components/`)
```
components/
├── AuthWrapper.tsx        # Authentication wrapper logic
├── Collapsible.tsx        # Interactive UI components
├── ExternalLink.tsx       # External navigation handling
├── HapticTab.tsx          # Navigation feedback
└── ParallaxScrollView.tsx # Advanced UI interactions
```

## 🎯 Core Features Implementation

### 1. Shopping Cart System

#### Cart Functionality Checklist
- [ ] Add products to cart with quantity selection
- [ ] Remove items from cart
- [ ] Update item quantities
- [ ] Calculate total price and taxes
- [ ] Persist cart data across app sessions
- [ ] Handle inventory limitations
- [ ] Implement cart validation

#### Cart Screen Implementation (`app/cart.tsx`)
```typescript
interface CartScreenProps {
  // Define props interface
}

const CartScreen: React.FC<CartScreenProps> = () => {
  // Implementation guidelines:
  // 1. Use CartContext for state management
  // 2. Implement quantity controls
  // 3. Add remove item functionality
  // 4. Calculate and display totals
  // 5. Implement checkout button
  // 6. Handle empty cart state
  // 7. Add loading and error states
  
  return (
    // Your implementation
  );
};
```

### 2. Authentication Flow

#### Login Screen Enhancement (`app/login.tsx`)
Key features to implement:
- [ ] Email/password login form
- [ ] Registration form
- [ ] Password reset functionality
- [ ] Form validation and error handling
- [ ] Loading states during authentication
- [ ] Navigation after successful login
- [ ] Remember me functionality

#### AuthWrapper Component (`components/AuthWrapper.tsx`)
```typescript
interface AuthWrapperProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, requireAuth = true, redirectTo = '/login' }) => {
  // Implementation guidelines:
  // 1. Check authentication status
  // 2. Redirect unauthenticated users
  // 3. Handle loading states
  // 4. Provide user context to children
  
  return (
    // Your implementation
  );
};
```

### 3. Navigation & Routing

#### App Layout (`app/_layout.tsx`)
Responsibilities:
- [ ] Set up navigation structure
- [ ] Implement tab navigation
- [ ] Handle deep linking
- [ ] Manage navigation state
- [ ] Implement navigation guards
- [ ] Add navigation animations

#### Navigation Best Practices
```typescript
// Example navigation structure
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Your configuration
      }}
    >
      {/* Tab screens */}
    </Tabs>
  );
}
```

### 4. Product & Category Management

#### Category Screen (`app/category/[name].tsx`)
Features to implement:
- [ ] Display products by category
- [ ] Implement filtering options
- [ ] Add sorting functionality
- [ ] Handle loading and error states
- [ ] Implement infinite scroll/pagination
- [ ] Add search within category

#### Product Detail Screen (`app/product/[id].tsx`)
Features to implement:
- [ ] Display product information
- [ ] Image gallery implementation
- [ ] Add to cart functionality
- [ ] Related products section
- [ ] User reviews and ratings
- [ ] Share product functionality

### 5. Search & Filtering System

#### Search Implementation
```typescript
interface SearchFilters {
  category?: string;
  priceRange?: {
    min: number;
    max: number;
  };
  location?: string;
  availability?: boolean;
}

interface SearchHook {
  searchProducts: (query: string, filters?: SearchFilters) => Promise<Product[]>;
  searchHistory: string[];
  searchSuggestions: string[];
  isSearching: boolean;
}

// Custom hook for search functionality
export const useProductSearch = (): SearchHook => {
  // Implementation
};
```

## 🛠️ Development Workflow

### 1. Setup Your Environment
```bash
# Switch to your branch
git checkout feature/core-functionality

# Ensure you have latest changes
git pull origin feature/core-functionality

# Start development server
npm start

# Run on specific platform for testing
npm run android  # or ios, web
```

### 2. Feature Development Process
1. **Requirements Analysis**: Understand the feature requirements
2. **Component Planning**: Plan component structure and data flow
3. **Implementation**: Write the feature code
4. **Integration**: Connect with backend services and UI components
5. **Testing**: Test the feature thoroughly
6. **Optimization**: Optimize performance and user experience
7. **Documentation**: Document the implementation

### 3. Commit Guidelines
```bash
# Examples for your work:
git commit -m "feat(cart): implement add to cart functionality"
git commit -m "feat(search): add product search with filters"
git commit -m "feat(navigation): implement deep linking for products"
git commit -m "fix(auth): resolve login persistence issue"
git commit -m "perf(cart): optimize cart state management"
git commit -m "test(orders): add unit tests for order creation"
```

## 🧪 Testing Strategy

### Unit Testing
- Test individual components and functions
- Mock external dependencies (Firebase, navigation)
- Test error handling and edge cases
- Ensure proper state management

### Integration Testing
- Test feature workflows end-to-end
- Verify data flow between components
- Test navigation flows
- Validate cart and order processes

### Performance Testing
- Monitor app performance with React DevTools
- Test on different devices and screen sizes
- Optimize bundle size and loading times
- Test offline scenarios

### Testing Checklist
- [ ] All features work with authentication
- [ ] Cart persists across app restarts
- [ ] Navigation works correctly
- [ ] Search returns accurate results
- [ ] Error states display properly
- [ ] Loading states provide good UX
- [ ] App works offline (cached data)

## 🎯 Current Sprint Goals

### Phase 1: Core Infrastructure (Week 1-2)
- [ ] Complete authentication flow implementation
- [ ] Set up navigation structure with deep linking
- [ ] Implement basic cart functionality
- [ ] Create error handling system
- [ ] Set up custom hooks for common logic

### Phase 2: Feature Implementation (Week 3-4)
- [ ] Implement shopping cart with persistence
- [ ] Create product detail screen with full functionality
- [ ] Add category browsing with filtering
- [ ] Implement search functionality
- [ ] Create order management system

### Phase 3: Enhancement & Optimization (Week 5-6)
- [ ] Add advanced search and filtering
- [ ] Implement product recommendations
- [ ] Add social features (reviews, sharing)
- [ ] Optimize performance and user experience
- [ ] Complete integration testing

## 🔄 Integration Points

### Dependencies with Other Team Members

#### UI Developer (Member 1) Dependencies
- **Component Props**: Ensure UI components receive correct data
- **Loading States**: Coordinate loading and error state handling
- **Navigation**: Work together on navigation UX
- **Theme Integration**: Ensure features work with theme system

#### Backend Developer (Member 2) Dependencies
- **Context Usage**: Properly implement and use auth/cart contexts
- **API Integration**: Use service functions correctly
- **Error Handling**: Handle backend errors gracefully
- **Type Safety**: Use shared TypeScript interfaces

### Communication Protocol
- Daily updates on feature progress
- Coordinate API changes with backend developer
- Share navigation requirements with UI developer
- Document feature specifications for team

## 📱 Custom Hooks Development

### Common Custom Hooks to Implement

#### Cart Management Hook
```typescript
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  
  const addToCart = useCallback((product: Product, quantity: number) => {
    // Implementation
  }, [context]);
  
  const removeFromCart = useCallback((productId: string) => {
    // Implementation
  }, [context]);
  
  return {
    items: context.items,
    totalAmount: context.totalAmount,
    addToCart,
    removeFromCart,
    // ... other cart functions
  };
};
```

#### Navigation Hook
```typescript
export const useAppNavigation = () => {
  const router = useRouter();
  
  const navigateToProduct = useCallback((productId: string) => {
    router.push(`/product/${productId}`);
  }, [router]);
  
  const navigateToCategory = useCallback((categoryName: string) => {
    router.push(`/category/${categoryName}`);
  }, [router]);
  
  return {
    navigateToProduct,
    navigateToCategory,
    // ... other navigation functions
  };
};
```

## 🎨 User Experience Enhancements

### Loading States
- Implement skeleton screens for better perceived performance
- Add smooth transitions between screens
- Show progress indicators for long operations

### Error Handling
- Create user-friendly error messages
- Implement retry mechanisms
- Add offline support with cached data

### Performance Optimization
- Implement lazy loading for screens
- Use React.memo for expensive components
- Optimize list rendering with FlatList
- Implement proper image caching

## 🔍 Search & Filtering Implementation

### Search Features
```typescript
interface SearchState {
  query: string;
  results: Product[];
  filters: SearchFilters;
  isLoading: boolean;
  error: string | null;
}

// Search functionality
export const useProductSearch = () => {
  const [searchState, setSearchState] = useState<SearchState>({
    query: '',
    results: [],
    filters: {},
    isLoading: false,
    error: null,
  });
  
  const searchProducts = useCallback(async (query: string, filters?: SearchFilters) => {
    // Implementation
  }, []);
  
  return {
    ...searchState,
    searchProducts,
    clearSearch: () => setSearchState(prev => ({ ...prev, query: '', results: [] })),
  };
};
```

## 🆘 Common Issues & Solutions

### State Management Issues
- **Problem**: Context not updating across components
- **Solution**: Ensure proper provider hierarchy and avoid state mutations

### Navigation Issues
- **Problem**: Deep linking not working correctly
- **Solution**: Check route parameters and navigation configuration

### Performance Issues
- **Problem**: App becoming slow with large product lists
- **Solution**: Implement virtualization and proper list optimization

### Cart Issues
- **Problem**: Cart data not persisting
- **Solution**: Implement proper async storage and state hydration

## 📋 Feature Development Checklist

### Before Starting a Feature
- [ ] Understand requirements and user flow
- [ ] Plan component structure and data flow
- [ ] Identify dependencies with other team members
- [ ] Set up proper TypeScript interfaces

### During Development
- [ ] Write clean, maintainable code
- [ ] Add proper error handling
- [ ] Implement loading states
- [ ] Follow established patterns
- [ ] Add comments for complex logic

### Before Committing
- [ ] Test the feature thoroughly
- [ ] Check integration with existing features
- [ ] Verify type safety
- [ ] Update documentation if needed
- [ ] Run linting and formatting

### After Feature Completion
- [ ] Create comprehensive tests
- [ ] Update team on new functionality
- [ ] Document any new patterns or utilities
- [ ] Performance check and optimization

## 📞 Getting Help

1. **Feature Questions**: Review existing codebase patterns
2. **Navigation Issues**: Consult Expo Router documentation
3. **Performance Questions**: Use React DevTools for profiling
4. **Integration Issues**: Coordinate with team members
5. **Complex Logic**: Break down into smaller, testable functions

---

## 🎯 Success Metrics

Your success will be measured by:
- **Feature Completeness**: All planned features work as expected
- **User Experience**: Smooth, intuitive user interactions
- **Performance**: Fast, responsive application behavior
- **Code Quality**: Clean, maintainable, and well-tested code
- **Integration**: Seamless integration with UI and backend components

Remember: You're the conductor orchestrating all features to create a harmonious user experience! 🎼