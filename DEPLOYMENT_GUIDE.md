# Deployment Guide - AgriConnect

## 🚀 Environment Setup & Deployment Instructions

### Prerequisites for All Team Members

#### Required Software
```bash
# Node.js (v18 or higher)
node --version  # Should be v18+
npm --version   # Should be 9+

# Expo CLI
npm install -g @expo/cli

# Git
git --version

# Code Editor (VS Code recommended)
# Android Studio (for Android development)
# Xcode (for iOS development - macOS only)
```

#### Account Requirements
- **GitHub Account**: For code repository access
- **Firebase Account**: For backend services
- **Expo Account**: For building and deployment
- **Google Play Console**: For Android deployment (optional)
- **Apple Developer Account**: For iOS deployment (optional)

---

## 🔧 Local Development Setup

### Step 1: Repository Setup
```bash
# Clone the repository
git clone https://github.com/your-username/agri-connect-app.git
cd agri-connect-app

# Install dependencies
npm install

# Set up Git hooks (optional but recommended)
npx husky install
```

### Step 2: Environment Configuration

#### Create Environment Files
```bash
# Development environment
touch .env.development

# Production environment  
touch .env.production

# Local environment (for testing)
touch .env.local
```

#### Environment Variables Template
Create `.env.development`:
```bash
# Firebase Configuration (Development)
EXPO_PUBLIC_FIREBASE_API_KEY=your_dev_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-dev-project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-dev-project
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-dev-project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
EXPO_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abcdef123456

# App Configuration
EXPO_PUBLIC_APP_ENV=development
EXPO_PUBLIC_API_BASE_URL=https://api-dev.agriconnect.com
EXPO_PUBLIC_APP_VERSION=1.0.0-dev

# Feature Flags
EXPO_PUBLIC_ENABLE_DEBUG_MODE=true
EXPO_PUBLIC_ENABLE_ANALYTICS=false
EXPO_PUBLIC_ENABLE_CRASH_REPORTING=false
```

#### Update app.json for Environment
```json
{
  "expo": {
    "name": "AgriConnect",
    "slug": "agri-connect-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "agriconnect",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourteam.agriconnect"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.yourteam.agriconnect"
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": [
      "expo-router"
    ],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

### Step 3: Firebase Setup (Team Member 2 Lead)

#### Firebase Project Creation
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create new project: `agri-connect-dev`
3. Enable Authentication, Firestore, and Storage
4. Set up authentication methods (Email/Password)
5. Configure Firestore security rules
6. Set up Storage rules for image uploads

#### Firestore Security Rules
```javascript
// Firestore Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Products are readable by all authenticated users
    match /products/{productId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        resource.data.sellerId == request.auth.uid;
    }
    
    // Orders can be read/written by the user who created them
    match /orders/{orderId} {
      allow read, write: if request.auth != null && 
        (resource.data.buyerId == request.auth.uid || 
         resource.data.sellerId == request.auth.uid);
    }
    
    // Categories are readable by all
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if false; // Only admin can write
    }
  }
}
```

#### Storage Security Rules
```javascript
// Storage Rules
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // User profile images
    match /users/{userId}/profile/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.uid == userId
        && request.resource.size < 5 * 1024 * 1024; // 5MB limit
    }
    
    // Product images
    match /products/{productId}/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null
        && request.resource.size < 10 * 1024 * 1024; // 10MB limit
    }
  }
}
```

### Step 4: Individual Developer Setup

#### For Member 1 (Frontend Developer)
```bash
# Additional tools for UI development
npm install -g react-devtools

# VS Code extensions
# - ES7+ React/Redux/React-Native snippets
# - Prettier
# - ESLint
# - Auto Rename Tag
# - Bracket Pair Colorizer

# Start development server
npm start
```

#### For Member 2 (Backend Developer)
```bash
# Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in project (if not already done)
firebase init

# Additional VS Code extensions
# - Firebase Explorer
# - Thunder Client (for API testing)
```

#### For Member 3 (Features Developer)
```bash
# Testing tools
npm install -g detox-cli

# Additional VS Code extensions
# - Jest
# - Test Explorer UI
# - GitLens
```

---

## 🏗️ Build Process

### Development Builds

#### Local Development
```bash
# Start Expo development server
npm start

# For specific platforms
npm run android    # Android emulator
npm run ios        # iOS simulator  
npm run web        # Web browser

# Clear cache if needed
npx expo start --clear
```

#### Development Build (EAS)
```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure EAS
eas build:configure

# Create development build
eas build --platform android --profile development
eas build --platform ios --profile development
```

### Production Builds

#### EAS Build Configuration
Create `eas.json`:
```json
{
  "cli": {
    "version": ">= 5.9.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "env": {
        "NODE_ENV": "development"
      }
    },
    "preview": {
      "distribution": "internal",
      "env": {
        "NODE_ENV": "production"
      }
    },
    "production": {
      "env": {
        "NODE_ENV": "production"
      }
    }
  },
  "submit": {
    "production": {}
  }
}
```

#### Production Build Commands
```bash
# Android production build
eas build --platform android --profile production

# iOS production build  
eas build --platform ios --profile production

# Submit to stores
eas submit --platform android
eas submit --platform ios
```

---

## 🚀 Deployment Strategies

### Deployment Environments

#### 1. Development Environment
- **Purpose**: Individual developer testing
- **Firebase Project**: `agri-connect-dev`
- **Deployment**: Local Expo development server
- **Updates**: Real-time with hot reload

#### 2. Staging Environment
- **Purpose**: Team integration testing
- **Firebase Project**: `agri-connect-staging`
- **Deployment**: EAS Preview builds
- **Updates**: Weekly integration builds

#### 3. Production Environment
- **Purpose**: End users
- **Firebase Project**: `agri-connect-prod`
- **Deployment**: App stores + EAS Updates
- **Updates**: Planned releases with versioning

### Continuous Integration/Deployment

#### GitHub Actions Workflow
Create `.github/workflows/build.yml`:
```yaml
name: Build and Deploy

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint
      - run: npm test

  build-preview:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/develop'
    needs: test
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: npm ci
      - run: eas build --platform all --profile preview --non-interactive

  build-production:
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    needs: test
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - uses: expo/expo-github-action@v8
        with:
          expo-version: latest
          token: ${{ secrets.EXPO_TOKEN }}
      - run: npm ci
      - run: eas build --platform all --profile production --non-interactive
```

### Release Process

#### Version Management
```bash
# Update version in package.json and app.json
npm version patch   # For bug fixes (1.0.0 -> 1.0.1)
npm version minor   # For new features (1.0.0 -> 1.1.0)
npm version major   # For breaking changes (1.0.0 -> 2.0.0)

# Create release tag
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

#### Release Checklist
```markdown
## Pre-Release Checklist
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Version number updated
- [ ] Release notes prepared
- [ ] Firebase production environment tested
- [ ] Performance testing completed
- [ ] Security review completed

## Release Process
- [ ] Create release branch from main
- [ ] Build production app
- [ ] Test production build thoroughly
- [ ] Submit to app stores
- [ ] Deploy EAS update
- [ ] Update documentation
- [ ] Announce release to team

## Post-Release
- [ ] Monitor crash reports
- [ ] Check analytics and performance metrics
- [ ] Gather user feedback
- [ ] Plan next release cycle
```

---

## 📱 Platform-Specific Deployment

### Android Deployment

#### Google Play Console Setup
1. Create Google Play Console account
2. Create new application
3. Upload app bundle (.aab file)
4. Configure store listing
5. Set up app signing
6. Release to internal testing first

#### Android Build Configuration
```json
// app.json - Android specific
{
  "android": {
    "compileSdkVersion": 34,
    "targetSdkVersion": 34,
    "buildToolsVersion": "34.0.0",
    "permissions": [
      "android.permission.INTERNET",
      "android.permission.CAMERA",
      "android.permission.READ_EXTERNAL_STORAGE",
      "android.permission.WRITE_EXTERNAL_STORAGE"
    ],
    "package": "com.yourteam.agriconnect",
    "versionCode": 1
  }
}
```

### iOS Deployment

#### App Store Connect Setup
1. Apple Developer account required
2. Create App ID in developer portal
3. Create app in App Store Connect
4. Upload app archive (.ipa file)
5. Configure app metadata
6. Submit for review

#### iOS Build Configuration
```json
// app.json - iOS specific
{
  "ios": {
    "bundleIdentifier": "com.yourteam.agriconnect",
    "buildNumber": "1",
    "supportsTablet": true,
    "infoPlist": {
      "NSCameraUsageDescription": "This app uses camera to take product photos.",
      "NSPhotoLibraryUsageDescription": "This app accesses photo library to select product images."
    }
  }
}
```

### Web Deployment

#### Static Site Hosting
```bash
# Build for web
npx expo export:web

# Deploy to Netlify, Vercel, or Firebase Hosting
# Firebase Hosting example:
firebase init hosting
firebase deploy
```

---

## 🔍 Monitoring & Analytics

### Error Tracking
```bash
# Install Sentry for error tracking
npx expo install @sentry/react-native

# Configure in App.js
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'your-sentry-dsn',
});
```

### Analytics Setup
```bash
# Firebase Analytics
npx expo install @react-native-firebase/analytics

# Configure analytics tracking
import analytics from '@react-native-firebase/analytics';

await analytics().logEvent('screen_view', {
  screen_name: 'Home',
  screen_class: 'HomeScreen',
});
```

### Performance Monitoring
```javascript
// Performance monitoring
import perf from '@react-native-firebase/perf';

const trace = await perf().startTrace('custom_trace');
// ... your code
await trace.stop();
```

---

## 🛠️ Troubleshooting Common Issues

### Build Issues
```bash
# Clear all caches
npx expo start --clear
rm -rf node_modules
npm install

# Reset Metro cache
npx react-native start --reset-cache

# Clean Android build
cd android && ./gradlew clean && cd ..

# Clean iOS build (macOS only)
cd ios && xcodebuild clean && cd ..
```

### Environment Issues
```bash
# Check Node.js version
node --version  # Should be 18+

# Check Expo CLI version
expo --version

# Update Expo CLI
npm install -g @expo/cli@latest

# Check Firebase CLI
firebase --version
```

### Common Error Solutions

#### Metro Bundle Error
```bash
# Clear Metro cache
npx expo start --clear
npx react-native start --reset-cache
```

#### Firebase Configuration Error
```bash
# Verify Firebase config in config/firebase.ts
# Ensure all environment variables are set
# Check Firebase project permissions
```

#### Build Failures
```bash
# Check EAS build logs
eas build:list

# View specific build log
eas build:view [build-id]
```

---

## 📋 Team Deployment Responsibilities

### Member 1 (Frontend Developer)
- Ensure UI components are production-ready
- Test responsive design across devices
- Optimize images and assets for production
- Verify theme consistency in builds

### Member 2 (Backend Developer)
- Manage Firebase production configuration
- Set up monitoring and analytics
- Configure security rules for production
- Handle database migrations if needed

### Member 3 (Features Developer)
- Conduct end-to-end testing
- Verify all features work in production builds
- Test app store submission builds
- Coordinate release testing with team

---

## 🎯 Success Metrics

### Deployment Success Criteria
- ✅ App builds successfully on all platforms
- ✅ All features work in production environment
- ✅ Performance meets targets (< 3s startup time)
- ✅ No critical crashes in production
- ✅ App store guidelines compliance
- ✅ Team can deploy independently

### Post-Deployment Monitoring
- Daily crash rate monitoring
- Performance metrics tracking
- User feedback collection
- App store review monitoring
- Usage analytics review

---

This deployment guide provides comprehensive instructions for setting up, building, and deploying your AgriConnect application. Each team member has clear responsibilities, and the process is designed to scale from individual development to production deployment.

**Remember**: Always test thoroughly before deploying to production, and maintain separate environments for development, staging, and production! 🚀