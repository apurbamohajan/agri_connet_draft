# Backend & Integration Developer Guidelines (Member 2)

## 🔧 Your Responsibilities

You are the backbone of the AgriConnect application, responsible for data management, authentication, and integrating all services that power the app.

### 🎯 Primary Focus Areas
- **Firebase Integration**: Complete setup and configuration of Firebase services
- **Authentication System**: User registration, login, and session management
- **Database Design**: Firestore schema design and data management
- **API Layer**: Creating service functions for data operations
- **State Management**: Context API implementation for global state
- **Security**: Data validation, security rules, and error handling

## 📁 Your Key Files

### Firebase Configuration (`config/`)
```
config/
├── firebase.ts            # Firebase SDK configuration
└── env.ts                # Environment variables management
```

### Services Layer (`services/`)
```
services/
└── firebase.ts            # Firebase service functions (CRUD operations)
```

### State Management (`contexts/`)
```
contexts/
├── AuthContext.tsx        # Authentication state management
├── CartContext.tsx        # Shopping cart state
└── LanguageContext.tsx    # Internationalization context
```

### Type Definitions (`types/`)
```
types/
└── index.ts              # TypeScript interfaces and types
```

## 🔥 Firebase Setup & Configuration

### 1. Firebase Project Setup
Ensure your Firebase project has these services enabled:
- **Authentication**: Email/Password, Google Sign-in
- **Firestore Database**: NoSQL document database
- **Storage**: File uploads (product images, user avatars)
- **Analytics**: User behavior tracking

### 2. Security Rules
Configure Firestore security rules:
```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products are readable by all, writable by authenticated users
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Orders are private to the user
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        request.auth.uid == resource.data.userId;
    }
  }
}
```

### 3. Environment Variables Setup
Create environment configuration in `config/env.ts`:
```typescript
export const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};
```

## 🗄️ Database Schema Design

### User Collection (`/users/{userId}`)
```typescript
interface User {
  id: string;
  email: string;
  displayName: string;
  photoURL?: string;
  userType: 'farmer' | 'buyer';
  profile: {
    phone?: string;
    address?: string;
    bio?: string;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Product Collection (`/products/{productId}`)
```typescript
interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  quantity: number;
  images: string[];
  farmerId: string;
  location: {
    address: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  isAvailable: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Order Collection (`/orders/{orderId}`)
```typescript
interface Order {
  id: string;
  buyerId: string;
  farmerId: string;
  products: Array<{
    productId: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  deliveryAddress: string;
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

## 🛠️ Development Workflow

### 1. Setup Your Environment
```bash
# Switch to your branch
git checkout feature/backend-integration

# Ensure you have latest changes
git pull origin feature/backend-integration

# Install dependencies if needed
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Firebase configuration
```

### 2. Development Process
1. **Service Development**: Create/update service functions
2. **Context Implementation**: Implement state management
3. **Type Definitions**: Define TypeScript interfaces
4. **Testing**: Test with Firebase emulator
5. **Integration**: Ensure compatibility with UI components
6. **Security Review**: Validate security rules and data handling

### 3. Commit Guidelines
```bash
# Examples for your work:
git commit -m "feat(auth): implement user registration with email verification"
git commit -m "feat(firestore): add product CRUD operations"
git commit -m "fix(context): resolve cart state persistence issue"
git commit -m "security(firebase): update Firestore security rules"
git commit -m "refactor(services): optimize Firebase query performance"
```

## 🔐 Authentication Implementation

### Auth Context Structure
```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}
```

### Key Auth Functions to Implement
```typescript
// Authentication functions
export const authService = {
  // User registration
  async signUp(email: string, password: string, userData: Partial<User>) {
    // Implementation
  },
  
  // User login
  async signIn(email: string, password: string) {
    // Implementation
  },
  
  // Password reset
  async resetPassword(email: string) {
    // Implementation
  },
  
  // Profile update
  async updateProfile(userId: string, userData: Partial<User>) {
    // Implementation
  }
};
```

## 🛒 Cart Context Implementation

### Cart State Management
```typescript
interface CartContextType {
  items: CartItem[];
  totalAmount: number;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  checkout: () => Promise<Order>;
}
```

## 📊 Service Layer Functions

### Core Service Functions to Implement

#### Product Services
```typescript
export const productService = {
  // Get all products
  async getProducts(filters?: ProductFilters): Promise<Product[]> {
    // Implementation
  },
  
  // Get products by category
  async getProductsByCategory(category: string): Promise<Product[]> {
    // Implementation
  },
  
  // Search products
  async searchProducts(query: string): Promise<Product[]> {
    // Implementation
  },
  
  // Add new product (for farmers)
  async addProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    // Implementation
  }
};
```

#### Order Services
```typescript
export const orderService = {
  // Create new order
  async createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    // Implementation
  },
  
  // Get user orders
  async getUserOrders(userId: string): Promise<Order[]> {
    // Implementation
  },
  
  // Update order status
  async updateOrderStatus(orderId: string, status: Order['status']): Promise<void> {
    // Implementation
  }
};
```

## 🎯 Current Sprint Goals

### Phase 1: Foundation (Week 1-2)
- [ ] Complete Firebase project setup and configuration
- [ ] Implement authentication system (login, registration, logout)
- [ ] Create Firestore database schema
- [ ] Set up security rules
- [ ] Implement AuthContext with basic functions

### Phase 2: Data Management (Week 3-4)
- [ ] Implement product service functions
- [ ] Create cart state management
- [ ] Add order management system
- [ ] Implement user profile management
- [ ] Add data validation and error handling

### Phase 3: Advanced Features (Week 5-6)
- [ ] Implement real-time data updates
- [ ] Add file upload for product images
- [ ] Create search and filtering functionality
- [ ] Implement push notifications
- [ ] Add analytics tracking

## 🧪 Testing Your Implementation

### Firebase Emulator Setup
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize emulators
firebase init emulators

# Start emulators
firebase emulators:start
```

### Testing Checklist
- [ ] Authentication flow works correctly
- [ ] Data persists properly in Firestore
- [ ] Security rules prevent unauthorized access
- [ ] Error handling works for network issues
- [ ] Context state updates correctly
- [ ] Type safety is maintained throughout

## 🔄 Integration Points

### Dependencies with Other Team Members
- **UI Developer (Member 1)**:
  - Provide loading and error states for UI components
  - Ensure context providers are properly wrapped
  - Share type definitions for props and state

- **Feature Developer (Member 3)**:
  - Coordinate on navigation state management
  - Collaborate on cart functionality implementation
  - Share API contracts and data structures

### Communication Protocol
- Daily updates on Firebase configuration changes
- Share environment variable requirements
- Coordinate database schema changes
- Provide API documentation for team

## 🔒 Security Best Practices

### Data Protection
- Validate all user inputs
- Sanitize data before storing
- Implement proper error handling
- Use environment variables for sensitive data
- Follow Firebase security best practices

### Access Control
- Implement proper authentication checks
- Use Firestore security rules effectively
- Limit data exposure in queries
- Implement role-based access where needed

## 📈 Performance Optimization

### Database Optimization
- Use appropriate indexes for queries
- Implement pagination for large datasets
- Cache frequently accessed data
- Optimize query structures

### Context Optimization
- Use React.memo for context consumers
- Implement proper dependency arrays
- Avoid unnecessary re-renders
- Use callback memoization where appropriate

## 🆘 Common Issues & Solutions

### Authentication Issues
- **Problem**: Users get signed out unexpectedly
- **Solution**: Implement proper token refresh and persistent sessions

### Firestore Issues
- **Problem**: Security rules denying legitimate requests
- **Solution**: Review and test security rules thoroughly

### Context Issues
- **Problem**: Context state not updating across components
- **Solution**: Ensure proper provider wrapping and dependency management

## 📞 Getting Help

1. **Firebase Questions**: Consult Firebase documentation and community
2. **Integration Issues**: Coordinate with UI Developer (Member 1)
3. **Feature Questions**: Collaborate with Feature Developer (Member 3)
4. **Security Concerns**: Review Firebase security documentation

---

## 🎯 Success Metrics

Your success will be measured by:
- **Security**: Robust authentication and data protection
- **Performance**: Fast, efficient data operations
- **Reliability**: Stable, error-free backend services
- **Integration**: Seamless communication with frontend
- **Scalability**: Architecture that can grow with the application

Remember: You're building the foundation that everything else depends on! 🏗️