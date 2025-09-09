# Frontend UI/UX Developer Guidelines (Member 1)

## 🎨 Your Responsibilities

You are responsible for creating beautiful, responsive, and user-friendly interfaces for the AgriConnect application.

### 🎯 Primary Focus Areas
- **User Interface Design**: Creating visually appealing and intuitive UI components
- **User Experience**: Ensuring smooth user interactions and navigation
- **Responsive Design**: Making the app work seamlessly across different screen sizes
- **Theme Management**: Implementing and maintaining light/dark theme support
- **Component Library**: Building reusable UI components

## 📁 Your Key Files

### Components (`components/`)
These are the core UI components you'll be working on:

```
components/
├── ProductCard.tsx         # Product display component
├── CategoryCard.tsx        # Category display component  
├── SearchBar.tsx          # Search functionality UI
├── ThemedText.tsx         # Themed text component
├── ThemedView.tsx         # Themed view component
└── ui/                    # UI utilities and base components
    ├── IconSymbol.tsx
    ├── TabBarBackground.tsx
    └── [additional UI components]
```

### Styling & Constants (`constants/`)
```
constants/
├── Colors.ts              # Color schemes for light/dark themes
└── index.ts              # Exported constants
```

### Screen Layouts (`app/(tabs)/`)
```
app/(tabs)/
├── index.tsx              # Home screen layout
├── profile.tsx            # Profile screen UI
├── orders.tsx             # Orders screen UI
└── _layout.tsx           # Tab navigation layout
```

## 🎨 Design Guidelines

### Color Scheme
- Follow the existing color scheme in `constants/Colors.ts`
- Ensure proper contrast for accessibility
- Support both light and dark themes

### Typography
- Use `ThemedText` component for all text elements
- Maintain consistent font sizes and weights
- Ensure readability across different screen sizes

### Spacing & Layout
- Follow consistent spacing patterns
- Use flexbox for layouts
- Ensure responsive design principles

### Component Design Principles
- **Reusability**: Create components that can be used across multiple screens
- **Consistency**: Maintain visual consistency throughout the app
- **Performance**: Optimize components for smooth scrolling and interactions
- **Accessibility**: Include proper accessibility labels and support

## 🛠️ Development Workflow

### 1. Setup Your Environment
```bash
# Switch to your branch
git checkout feature/ui-components

# Ensure you have latest changes
git pull origin feature/ui-components

# Start development server
npm start
```

### 2. Component Development Process
1. **Design Review**: Review the design requirements
2. **Component Creation**: Create the component in appropriate directory
3. **Styling**: Apply styles using the theme system
4. **Testing**: Test on different screen sizes and themes
5. **Integration**: Integrate with existing screens
6. **Review**: Self-review before committing

### 3. Commit Guidelines
Use this commit message format:
```bash
# Examples for your work:
git commit -m "feat(ui): add ProductCard component with image placeholder"
git commit -m "style(theme): improve dark mode color contrast"
git commit -m "fix(components): resolve SearchBar focus state issue"
git commit -m "refactor(ui): optimize CategoryCard performance"
```

## 🎯 Current Sprint Goals

### Phase 1: Core Components (Week 1-2)
- [ ] Enhance `ProductCard` component with better styling
- [ ] Improve `CategoryCard` visual design
- [ ] Refine `SearchBar` with proper animations
- [ ] Optimize `ThemedText` and `ThemedView` components

### Phase 2: Screen Layouts (Week 3-4)
- [ ] Polish home screen (`index.tsx`) layout
- [ ] Design profile screen (`profile.tsx`) UI
- [ ] Create orders screen (`orders.tsx`) interface
- [ ] Implement responsive navigation

### Phase 3: Advanced Features (Week 5-6)
- [ ] Add loading states and animations
- [ ] Implement error state designs
- [ ] Create image galleries and carousels
- [ ] Add micro-interactions and feedback

## 🧪 Testing Your Components

### Visual Testing
- Test on different screen sizes (phone, tablet)
- Verify both light and dark themes
- Check component states (loading, error, empty)
- Ensure smooth animations and transitions

### Device Testing
```bash
# Test on Android
npm run android

# Test on iOS
npm run ios

# Test on Web
npm run web
```

## 🔄 Integration Points

### Dependencies with Other Team Members
- **Backend Developer (Member 2)**: 
  - Use `AuthContext` for user state
  - Use `CartContext` for cart-related UI updates
  - Work with loading/error states from Firebase operations

- **Feature Developer (Member 3)**:
  - Collaborate on cart UI functionality
  - Coordinate on search and filter interfaces
  - Share navigation component requirements

### Communication Protocol
- Daily updates on component progress
- Share design mockups before implementation
- Coordinate with team on shared components
- Request feedback on visual designs

## 📱 UI Component Checklist

Before marking any component as complete, ensure:
- [ ] Component is responsive (works on different screen sizes)
- [ ] Supports both light and dark themes
- [ ] Includes proper TypeScript interfaces
- [ ] Has loading and error states where applicable
- [ ] Includes accessibility labels
- [ ] Follows the established design system
- [ ] Is properly documented with comments
- [ ] Handles edge cases gracefully

## 🎨 Design Resources

### Figma Files
[Add links to design files if available]

### Color Palette
Refer to `constants/Colors.ts` for the complete color system

### Icon Library
- Use `@expo/vector-icons` for icons
- Maintain consistent icon sizing
- Follow platform-specific icon guidelines

## 🚀 Performance Tips

- Use `React.memo` for components that render frequently
- Optimize image loading with proper placeholders
- Implement lazy loading for large lists
- Use `useMemo` for expensive calculations
- Minimize re-renders with proper state management

## 🆘 Common Issues & Solutions

### Styling Issues
- **Problem**: Styles not applying correctly
- **Solution**: Check theme context and ensure proper theme provider wrapping

### Navigation Issues
- **Problem**: Tab navigation styling conflicts
- **Solution**: Use `TabBarBackground` component for consistent styling

### Performance Issues
- **Problem**: Slow scrolling in product lists
- **Solution**: Implement `FlatList` with proper `keyExtractor` and `getItemLayout`

## 📞 Getting Help

1. **Design Questions**: Discuss with team during daily standups
2. **Technical Issues**: Ask Feature Developer (Member 3) for navigation help
3. **Integration Issues**: Coordinate with Backend Developer (Member 2)
4. **Code Review**: Request peer review before merging

---

## 🎯 Success Metrics

Your success will be measured by:
- **Visual Quality**: Beautiful, professional-looking interfaces
- **User Experience**: Smooth, intuitive user interactions
- **Performance**: Fast, responsive components
- **Consistency**: Cohesive design across the application
- **Accessibility**: Inclusive design for all users

Remember: Great UI/UX is about creating delightful experiences that users love! 🌟