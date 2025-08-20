import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { useAuth } from '@/contexts/AuthContext';
import { UserRole } from '@/types';

export default function LoginScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('buyer');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const { signIn, signUp } = useAuth();

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!isLogin && (!name.trim() || password !== confirmPassword)) {
      Alert.alert('Error', 'Please fill in all fields and ensure passwords match');
      return;
    }

    if (!isLogin && password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      if (isLogin) {
        console.log('Attempting sign in...');
        await signIn(email, password);
        console.log('Sign in successful');
        setSuccessMessage('Welcome back!');
        setShowSuccessModal(true);
        setTimeout(() => {
          console.log('Navigating to home after login...');
          setShowSuccessModal(false);
          // Use push instead of replace to ensure navigation works
          router.push('/(tabs)');
        }, 2000);
      } else {
        console.log('Attempting sign up...');
        await signUp(email, password, {
          name: name.trim(),
          email: email,
          role: selectedRole,
        });
        console.log('Sign up successful');
        setSuccessMessage(`Account created successfully!\n\nWelcome to AgriConnect, ${name}!\n\nYou can now start exploring fresh produce from local farmers.`);
        setShowSuccessModal(true);
        setTimeout(() => {
          console.log('Navigating to home after signup...');
          setShowSuccessModal(false);
          // Use push instead of replace to ensure navigation works
          router.push('/(tabs)');
        }, 3000);
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Show validation errors only when user has interacted with the field
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [nameTouched, setNameTouched] = useState(false);

  const isEmailValid = !emailTouched || email === '' || validateEmail(email);
  const isPasswordValid = !passwordTouched || password === '' || password.length >= 6;
  const isConfirmPasswordValid = !isLogin ? (!confirmPasswordTouched || confirmPassword === '' || confirmPassword === password) : true;
  const isNameValid = isLogin || (!nameTouched || name === '' || name.trim().length >= 2);

  // Check if form is valid for submission
  const isFormValid = email !== '' && 
                     validateEmail(email) && 
                     password !== '' && 
                     password.length >= 6 &&
                     (isLogin || (name.trim().length >= 2 && confirmPassword === password));

  const renderRoleSelector = () => (
    <View style={styles.roleContainer}>
      <ThemedText style={styles.roleLabel}>I am a:</ThemedText>
      <View style={styles.roleButtons}>
        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === 'buyer' && styles.roleButtonActive
          ]}
          onPress={() => setSelectedRole('buyer')}
        >
          <Ionicons 
            name="cart-outline" 
            size={24} 
            color={selectedRole === 'buyer' ? '#4CAF50' : '#666'} 
          />
          <ThemedText style={[
            styles.roleButtonText,
            selectedRole === 'buyer' && styles.roleButtonTextActive
          ]}>
            Buyer
          </ThemedText>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[
            styles.roleButton,
            selectedRole === 'farmer' && styles.roleButtonActive
          ]}
          onPress={() => setSelectedRole('farmer')}
        >
          <Ionicons 
            name="leaf-outline" 
            size={24} 
            color={selectedRole === 'farmer' ? '#4CAF50' : '#666'} 
          />
          <ThemedText style={[
            styles.roleButtonText,
            selectedRole === 'farmer' && styles.roleButtonTextActive
          ]}>
            Farmer
          </ThemedText>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoContainer}>
              <Ionicons name="leaf" size={40} color="#4CAF50" />
              <ThemedText style={styles.logoText}>AgriConnect</ThemedText>
            </View>
            <ThemedText style={styles.subtitle}>
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </ThemedText>
            <ThemedText style={styles.description}>
              {isLogin 
                ? 'Sign in to access your fresh produce marketplace'
                : 'Join us to connect with local farmers and get fresh produce'
              }
            </ThemedText>
          </View>

          {/* Role Selector */}
          {renderRoleSelector()}

          {/* Form */}
          <View style={styles.form}>
            {/* Name Input (Sign Up only) */}
            {!isLogin && (
              <>
                <View style={[
                  styles.inputContainer, 
                  !isNameValid && styles.inputContainerError,
                  isNameValid && nameTouched && styles.inputContainerSuccess
                ]}>
                  <Ionicons 
                    name="person-outline" 
                    size={20} 
                    color={!isNameValid ? "#E91E63" : (isNameValid && nameTouched ? "#4CAF50" : "#666")} 
                    style={styles.inputIcon} 
                  />
                  <TextInput
                    style={[styles.input, !isNameValid && styles.inputError]}
                    placeholder="Full Name"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                    onBlur={() => setNameTouched(true)}
                    autoCapitalize="words"
                    autoCorrect={false}
                  />
                  {isNameValid && nameTouched && (
                    <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={styles.successIcon} />
                  )}
                </View>
                {!isNameValid && nameTouched && (
                  <ThemedText style={styles.errorText}>Name must be at least 2 characters</ThemedText>
                )}
              </>
            )}

            {/* Email Input */}
            <View style={[
              styles.inputContainer, 
              !isEmailValid && styles.inputContainerError,
              isEmailValid && emailTouched && styles.inputContainerSuccess
            ]}>
              <Ionicons 
                name="mail-outline" 
                size={20} 
                color={!isEmailValid ? "#E91E63" : (isEmailValid && emailTouched ? "#4CAF50" : "#666")} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={[styles.input, !isEmailValid && styles.inputError]}
                placeholder="Email address"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                onBlur={() => setEmailTouched(true)}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {isEmailValid && emailTouched && (
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={styles.successIcon} />
              )}
            </View>
            {!isEmailValid && emailTouched && (
              <ThemedText style={styles.errorText}>Please enter a valid email address</ThemedText>
            )}

            {/* Password Input */}
            <View style={[
              styles.inputContainer, 
              !isPasswordValid && styles.inputContainerError,
              isPasswordValid && passwordTouched && styles.inputContainerSuccess
            ]}>
              <Ionicons 
                name="lock-closed-outline" 
                size={20} 
                color={!isPasswordValid ? "#E91E63" : (isPasswordValid && passwordTouched ? "#4CAF50" : "#666")} 
                style={styles.inputIcon} 
              />
              <TextInput
                style={[styles.input, !isPasswordValid && styles.inputError]}
                placeholder="Password"
                placeholderTextColor="#999"
                value={password}
                onChangeText={setPassword}
                onBlur={() => setPasswordTouched(true)}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeIcon}
              >
                <Ionicons
                  name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                  size={20}
                  color={!isPasswordValid ? "#E91E63" : (isPasswordValid && passwordTouched ? "#4CAF50" : "#666")}
                />
              </TouchableOpacity>
              {isPasswordValid && passwordTouched && (
                <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={styles.successIcon} />
              )}
            </View>
            {!isPasswordValid && passwordTouched && (
              <ThemedText style={styles.errorText}>Password must be at least 6 characters</ThemedText>
            )}

            {/* Confirm Password Input (Sign Up only) */}
            {!isLogin && (
              <>
                <View style={[
                  styles.inputContainer, 
                  !isConfirmPasswordValid && styles.inputContainerError,
                  isConfirmPasswordValid && confirmPasswordTouched && styles.inputContainerSuccess
                ]}>
                  <Ionicons 
                    name="lock-closed-outline" 
                    size={20} 
                    color={!isConfirmPasswordValid ? "#E91E63" : (isConfirmPasswordValid && confirmPasswordTouched ? "#4CAF50" : "#666")} 
                    style={styles.inputIcon} 
                  />
                  <TextInput
                    style={[styles.input, !isConfirmPasswordValid && styles.inputError]}
                    placeholder="Confirm password"
                    placeholderTextColor="#999"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    onBlur={() => setConfirmPasswordTouched(true)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                  />
                  <TouchableOpacity
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                    style={styles.eyeIcon}
                  >
                    <Ionicons
                      name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={!isConfirmPasswordValid ? "#E91E63" : (isConfirmPasswordValid && confirmPasswordTouched ? "#4CAF50" : "#666")}
                    />
                  </TouchableOpacity>
                  {isConfirmPasswordValid && confirmPasswordTouched && (
                    <Ionicons name="checkmark-circle" size={20} color="#4CAF50" style={styles.successIcon} />
                  )}
                </View>
                {!isConfirmPasswordValid && confirmPasswordTouched && (
                  <ThemedText style={styles.errorText}>Passwords do not match</ThemedText>
                )}
              </>
            )}

            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton, 
                (loading || !isFormValid) && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={loading || !isFormValid}
            >
              <ThemedText style={styles.submitButtonText}>
                {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
              </ThemedText>
            </TouchableOpacity>

            {/* Toggle Login/Sign Up */}
            <View style={styles.toggleContainer}>
              <ThemedText style={styles.toggleText}>
                {isLogin ? "Don't have an account? " : "Already have an account? "}
              </ThemedText>
              <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                <ThemedText style={styles.toggleLink}>
                  {isLogin ? 'Sign Up' : 'Sign In'}
                </ThemedText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <ThemedText style={styles.footerText}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </ThemedText>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Success Modal */}
      <Modal
        visible={showSuccessModal}
        transparent={true}
        animationType="fade"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={60} color="#4CAF50" />
            </View>
            <ThemedText style={styles.successTitle}>Success!</ThemedText>
            <ThemedText style={styles.successMessage}>{successMessage}</ThemedText>
            <View style={styles.successLoadingContainer}>
              <ThemedText style={styles.successLoadingText}>Redirecting...</ThemedText>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginLeft: 12,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  roleContainer: {
    marginBottom: 30,
  },
  roleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roleButtonActive: {
    borderColor: '#4CAF50',
    backgroundColor: '#F1F8E9',
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginLeft: 8,
  },
  roleButtonTextActive: {
    color: '#4CAF50',
  },
  form: {
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  inputContainerError: {
    borderColor: '#E91E63',
    shadowColor: '#E91E63',
    shadowOpacity: 0.2,
  },
  inputContainerSuccess: {
    borderColor: '#4CAF50',
    shadowColor: '#4CAF50',
    shadowOpacity: 0.2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 16,
  },
  inputError: {
    borderColor: '#E91E63',
  },
  eyeIcon: {
    padding: 8,
  },
  successIcon: {
    marginLeft: 8,
  },
  errorText: {
    fontSize: 12,
    color: '#E91E63',
    marginBottom: 8,
    marginLeft: 4,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#9E9E9E',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  toggleText: {
    fontSize: 14,
    color: '#666',
  },
  toggleLink: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  successModal: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginHorizontal: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  successIconContainer: {
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 20,
  },
  successLoadingContainer: {
    alignItems: 'center',
  },
  successLoadingText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
});        