# 🔥 Firebase Setup Guide for AgriConnect

## 📋 Prerequisites
- Firebase account (free tier is sufficient)
- Your AgriConnect app project

## 🚀 Step-by-Step Setup

### 1. Create Firebase Project

1. **Go to Firebase Console**: Visit [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. **Create New Project**: 
   - Click "Create a project"
   - Enter project name: `agri-connect-app` (or your preferred name)
   - Choose whether to enable Google Analytics (optional)
   - Click "Create project"

### 2. Enable Authentication

1. **Navigate to Authentication**: In your Firebase project, click "Authentication" in the left sidebar
2. **Get Started**: Click "Get started"
3. **Enable Email/Password**:
   - Go to "Sign-in method" tab
   - Click "Email/Password"
   - Toggle "Enable" to ON
   - Click "Save"

### 3. Enable Firestore Database

1. **Navigate to Firestore**: Click "Firestore Database" in the left sidebar
2. **Create Database**:
   - Click "Create database"
   - Choose "Start in test mode" (for development)
   - Select a location close to your users
   - Click "Done"

### 4. Get Firebase Configuration

1. **Project Settings**: Click the gear icon (⚙️) next to "Project Overview"
2. **Add Web App**:
   - Scroll to "Your apps" section
   - Click "Add app" (</> icon)
   - Choose "Web"
   - Register app with nickname: "AgriConnect Web"
   - Click "Register app"
3. **Copy Configuration**: Copy the Firebase config object

### 5. Update Your App Configuration

#### Option A: Direct Configuration (Quick Setup)
Update `config/firebase.ts` with your actual Firebase credentials:

```typescript
const firebaseConfig = {
  apiKey: "your-actual-api-key",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id"
};
```

#### Option B: Environment Variables (Recommended for Production)
Create a `.env` file in your project root:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your-actual-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### 6. Test Your Setup

1. **Start your app**: `npm run web` or `npm start`
2. **Try Registration**: Create a new account
3. **Try Login**: Sign in with your credentials
4. **Check Firestore**: Verify user data appears in Firebase Console

## 🔧 Firebase Security Rules

### Firestore Security Rules
Update your Firestore rules in Firebase Console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products can be read by anyone, written by farmers
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'farmer';
    }
    
    // Cart items belong to specific users
    match /carts/{cartId} {
      allow read, write: if request.auth != null && 
        resource.data.userId == request.auth.uid;
    }
  }
}
```

## 📱 Features Available

### ✅ Authentication
- Email/Password registration and login
- User role management (Farmer/Buyer)
- Automatic session persistence
- Secure logout

### ✅ User Management
- User profiles stored in Firestore
- Role-based access control
- Profile updates

### ✅ Product Management
- Add products (Farmers only)
- Browse products by category
- Featured products
- Product search

### ✅ Shopping Cart
- Add items to cart
- View cart contents
- Cart persistence

## 🚨 Important Security Notes

1. **Never commit real credentials** to version control
2. **Use environment variables** for production
3. **Enable proper security rules** in Firestore
4. **Validate user inputs** on both client and server
5. **Implement proper error handling**

## 🔍 Troubleshooting

### Common Issues

1. **"Firebase App not initialized"**
   - Check your Firebase configuration
   - Ensure all required fields are filled

2. **"Permission denied"**
   - Check Firestore security rules
   - Verify user authentication status

3. **"Network error"**
   - Check internet connection
   - Verify Firebase project is active

4. **"Invalid API key"**
   - Double-check your Firebase configuration
   - Ensure you're using the correct project

### Debug Mode
Enable debug logging by adding this to your app:

```typescript
import { getApp } from 'firebase/app';
console.log('Firebase initialized:', getApp());
```

## 📞 Support

If you encounter issues:
1. Check Firebase Console for error logs
2. Verify your configuration matches the Firebase Console
3. Test with a simple Firebase app first
4. Check Firebase documentation for updates

## 🎉 Next Steps

After successful setup:
1. **Customize UI** to match your brand
2. **Add more features** like image uploads
3. **Implement push notifications**
4. **Add analytics** for user insights
5. **Deploy to production** with proper security

Your AgriConnect app is now connected to Firebase! 🚀 