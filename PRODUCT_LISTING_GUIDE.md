# Product Listing Guide - AgriConnect

This guide explains how to list, view, and manage products in the AgriConnect application.

## 📱 **How to View Product Lists**

### 1. **Home Screen Product Display**
- **Location**: Main tab → Home Screen
- **Features**: 
  - Featured products grid
  - Loading states with spinner
  - Error handling with retry buttons
  - Empty state with "Add Sample Products" button
- **Data Source**: Firebase Firestore [products] collection

### 2. **Category-wise Product Lists**
- **Access**: Home Screen → Shop by Category → Select any category
- **Features**:
  - Filter products by category (Vegetables, Fruits, Grains, etc.)
  - Search within category
  - Product count display
  - Grid layout with ProductCard components

### 3. **Search Products**
- **Access**: Home Screen → Search Bar
- **Features**: 
  - Search by product name
  - Search by farmer name
  - Real-time filtering

## 🚀 **How to Add a New Product (For Farmers)**

### **Method 1: Quick Action Button**
1. Go to Home Screen
2. Find "Quick Actions" section
3. Click "Add Product" button
4. Fill out the product form

### **Method 2: Footer Link**
1. Scroll to bottom of Home Screen
2. Click "Sell Your Products" in footer
3. Opens Add Product form

### **Method 3: Farmer Dashboard**
1. Click "Farmer Dashboard" in footer
2. Click "Add Product" button or "+" icon
3. Fill out the product form

## 📝 **Add Product Form Fields**

### **Required Fields (*)**
- **Product Name**: e.g., "Fresh Organic Tomatoes"
- **Price (৳)**: Numerical value in Bangladeshi Taka
- **Category**: Select from Vegetables, Fruits, Grains, Herbs, Dairy, Organic

### **Optional Fields**
- **Description**: Detailed product description
- **Unit**: e.g., "per kg", "per dozen", "per piece"
- **Location**: Where the product is grown/available
- **Quantity**: How many units available
- **Badge**: Fresh, Organic, Premium, Local, Seasonal
- **Image URL**: Link to product image

### **Form Features**
- **Category Selector**: Horizontal scroll with selectable chips
- **Badge Selector**: Choose product quality indicators
- **Image Preview**: See uploaded image before submitting
- **Validation**: Required field checking and price validation
- **Loading State**: Shows progress during submission

## 🌾 **Farmer Dashboard Features**

### **Stats Overview**
- Total Products listed
- Average Price of products
- Number of Categories
- Total Portfolio Value

### **Quick Actions**
- Add Product
- View Orders (Coming Soon)
- Analytics (Coming Soon)
- Refresh Products

### **My Products Section**
- Grid view of all farmer's products
- Product count display
- Click on products for options (View Details, Edit)
- Empty state with "Add Your First Product" button

## 🔧 **Technical Implementation**

### **Data Storage**
```javascript
// Product data structure in Firestore
{
  name: "Fresh Organic Tomatoes",
  price: 550,
  image: "https://images.unsplash.com/...",
  category: "Vegetables",
  farmer: "সবুজ উপত্যকা খামার",
  rating: 4.5,
  unit: "per kg",
  location: "সিলেট",
  badge: "Organic",
  description: "Fresh and high-quality...",
  farmerId: "user-uid-here",
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

### **Service Methods**
- `productService.getAllProducts()` - Get all products
- `productService.getProductsByCategory(category)` - Filter by category
- `productService.getProductsByFarmer(farmerId)` - Get farmer's products
- `productService.addProduct(productData, farmerId)` - Add new product
- `productService.addSampleProducts()` - Add sample data

### **Navigation Routes**
- `/add-product` - Add Product Form
- `/farmer-dashboard` - Farmer Management Dashboard
- `/category/[name]` - Category-specific Product List
- `/product/[id]` - Individual Product Details

## 📱 **User Experience Features**

### **Loading States**
- Spinner with "Loading products..." message
- Skeleton loading for better UX

### **Error Handling**
- Network error messages
- Retry buttons for failed requests
- Validation messages for form errors

### **Empty States**
- "No products found" with helpful messages
- "Add Sample Products" for development
- "Add Your First Product" for new farmers

### **Responsive Design**
- Grid layout adapts to screen size
- Touch-friendly buttons and forms
- Optimized for mobile and web

## 🎯 **Getting Started**

### **For New Users**
1. Sign up as a "Farmer" role
2. Go to Home Screen
3. Click "Add Sample Products" to populate database
4. Start adding your own products

### **For Farmers**
1. Click "Add Product" from Quick Actions
2. Fill out the product form
3. Submit and view in Farmer Dashboard
4. Products appear in Home Screen and Category pages

### **For Buyers**
1. Browse products on Home Screen
2. Use categories to filter products
3. Search for specific products
4. Add products to cart

## 🔄 **Data Flow**

```
1. Farmer fills Add Product form
2. Form validates required fields
3. Data sent to productService.addProduct()
4. Document created in Firestore [products] collection
5. Success message shown to farmer
6. Product appears in:
   - Home Screen (Featured Products)
   - Relevant Category Page
   - Farmer Dashboard (My Products)
   - Search results
```

## 🚨 **Troubleshooting**

### **No Products Showing**
1. Check if products collection exists in Firebase
2. Click "Add Sample Products" button
3. Check browser console for errors
4. Verify Firebase configuration

### **Can't Add Products**
1. Ensure user is logged in
2. Check Firestore security rules
3. Verify all required fields are filled
4. Check network connection

### **Images Not Loading**
1. Verify image URL is accessible
2. Use HTTPS URLs only
3. Check image format (JPG, PNG, WebP)

## 📈 **Future Enhancements**

- [ ] Product editing functionality
- [ ] Image upload from device
- [ ] Bulk product import
- [ ] Product analytics
- [ ] Order management
- [ ] Product reviews and ratings
- [ ] Inventory management
- [ ] Price history tracking