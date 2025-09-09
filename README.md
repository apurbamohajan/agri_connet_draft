# AgriConnect - Agricultural Supply Chain Platform 🌾

AgriConnect is a mobile application designed to connect farmers and buyers in the agricultural supply chain, facilitating direct trade and communication.

## 🚀 Project Overview

This React Native application built with Expo enables farmers to showcase their products and buyers to discover agricultural suppliers, creating an efficient marketplace for the agricultural industry.

### Key Features
- **Product Catalog**: Browse agricultural products by categories (Vegetables, Grains, Fruits, Dairy, Meat, Herbs)
- **User Authentication**: Secure login and profile management
- **Shopping Cart**: Add products and manage orders
- **Real-time Communication**: Messaging system between farmers and buyers
- **Responsive Design**: Support for both light and dark themes
- **Search Functionality**: Find products and suppliers easily

## 🛠️ Technology Stack

- **Frontend**: React Native with Expo SDK 53
- **Navigation**: Expo Router with file-based routing
- **State Management**: Context API with custom hooks
- **Backend**: Firebase (Authentication, Firestore, Storage)
- **UI Components**: Custom components with @expo/vector-icons
- **Animation**: React Native Reanimated & Gesture Handler

## 📋 Prerequisites

Before running this project, ensure you have:
- Node.js (v18 or higher)
- npm or yarn
- Expo CLI
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)
- Physical device or emulator/simulator

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd agri-connect-app
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Firebase
1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Configure authentication, Firestore, and Storage
3. Follow the setup guide in `FIREBASE_SETUP.md`

### 4. Start Development Server
```bash
npm start
# or for specific platforms
npm run android  # Android
npm run ios      # iOS
npm run web      # Web
```

## 👥 Team Collaboration

### 🌳 Multi-Branch Development Strategy
This project uses a specialized multi-branch strategy designed for efficient 3-member team collaboration.

**📖 Complete Setup Guide**: See [`MULTI_BRANCH_STRATEGY.md`](./MULTI_BRANCH_STRATEGY.md) for detailed instructions.

#### Team Structure & Branches
- **🎨 Member 1 (UI/UX)**: `feature/ui-components` - Frontend development
- **🔧 Member 2 (Backend)**: `feature/backend-integration` - Firebase & API integration  
- **⚙️ Member 3 (Features)**: `feature/core-functionality` - Application logic

#### Quick Start for Team Members
```bash
# Clone and setup
git clone https://github.com/apurbamohajan/agri_connet_draft.git
cd agri_connet_draft
npm install

# Switch to your assigned branch
git checkout feature/ui-components        # Member 1
git checkout feature/backend-integration  # Member 2  
git checkout feature/core-functionality   # Member 3

# Read your guidelines
# Member 1: MEMBER1_UI_GUIDELINES.md
# Member 2: MEMBER2_BACKEND_GUIDELINES.md
# Member 3: MEMBER3_FEATURES_GUIDELINES.md
```

### Git Workflow

#### Branch Structure
- `main` - Production-ready code
- `develop` - Integration branch for all features
- `feature/ui-components` - Frontend UI/UX development
- `feature/backend-integration` - Backend & Firebase integration
- `feature/core-functionality` - Core application features

#### Development Process
1. Work on your assigned feature branch
2. Regularly pull from `develop` to stay updated
3. Create pull requests from your feature branch to `develop`
4. Code review and team approval
5. Merge to `develop` for integration testing
6. Periodic releases from `develop` to `main`

## 📁 Project Structure

```
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based navigation screens
│   ├── category/          # Category-specific screens
│   ├── product/           # Product detail screens
│   ├── cart.tsx           # Shopping cart screen
│   └── login.tsx          # Authentication screen
├── components/            # Reusable UI components
├── contexts/              # State management contexts
├── services/              # Firebase and API services
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── constants/             # App constants and themes
└── config/                # Configuration files
```

## 🔧 Development Guidelines

### Coding Standards
- Use TypeScript for type safety
- Follow React Native best practices
- Implement responsive design patterns
- Use consistent naming conventions
- Add proper error handling
- Write meaningful commit messages

### Code Style
- Use ESLint configuration provided
- Format code before committing
- Use functional components with hooks
- Implement proper error boundaries
- Follow component composition patterns

## 🧪 Testing

Run linting:
```bash
npm run lint
```

## 📱 Build & Deployment

### Development Build
```bash
npx expo build:android
npx expo build:ios
```

### Production Build
```bash
expo build:android --type app-bundle
expo build:ios --type archive
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Pull Request Guidelines
- Provide clear description of changes
- Include screenshots for UI changes
- Ensure all tests pass
- Follow the code review process

## 📋 Available Scripts

- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web
- `npm run lint` - Run ESLint

## 🐛 Troubleshooting

### Common Issues
1. **Metro bundler issues**: Clear cache with `npx expo start --clear`
2. **Dependencies issues**: Delete `node_modules` and run `npm install`
3. **Firebase connection**: Check configuration in `config/firebase.ts`

## 📚 Additional Documentation

- [Firebase Setup Guide](FIREBASE_SETUP.md)
- [Firebase Setup Documentation](FIREBASE_SETUP_GUIDE.md)
- [Home Screen Documentation](README_HOME_SCREEN.md)

## 📄 License

This project is private and intended for educational/development purposes.

## 📞 Support

For questions and support, please contact the development team or create an issue in the repository.

---

**Happy Coding! 🚀**