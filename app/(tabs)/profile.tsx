import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface FavoriteFarmer {
  id: string;
  name: string;
  location: string;
  specialty: string;
  rating: number;
  products: number;
}

const mockFavoriteFarmers: FavoriteFarmer[] = [
  {
    id: '1',
    name: 'সবুজ উপত্যকা খামার',
    location: 'সিলেট',
    specialty: 'জৈব সবজি',
    rating: 4.8,
    products: 12,
  },
  {
    id: '2',
    name: 'খুশি হাঁস খামার',
    location: 'দিনাজপুর',
    specialty: 'মুক্ত পরিসরে ডিম',
    rating: 4.9,
    products: 8,
  },
  {
    id: '3',
    name: 'গুঞ্জন তৃণভূমি',
    location: 'রংপুর',
    specialty: 'কাঁচা মধু',
    rating: 4.7,
    products: 5,
  },
];

export default function ProfileScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const { translations, language, toggleLanguage } = useLanguage();
  const { user, logout } = useAuth();

  const handleEditProfile = () => {
    Alert.alert(
      language === 'en' ? 'Edit Profile' : 'প্রোফাইল সম্পাদনা',
      language === 'en' ? 'This feature will be available soon!' : 'এই বৈশিষ্ট্যটি শীঘ্রই উপলব্ধ হবে!',
      [{ text: language === 'en' ? 'OK' : 'ঠিক আছে' }]
    );
  };

  const handleSettingsPress = (setting: string) => {
    Alert.alert(
      setting,
      language === 'en' ? 'This feature will be available soon!' : 'এই বৈশিষ্ট্যটি শীঘ্রই উপলব্ধ হবে!',
      [{ text: language === 'en' ? 'OK' : 'ঠিক আছে' }]
    );
  };

  const handleViewProducts = (farmer: FavoriteFarmer) => {
    Alert.alert(
      farmer.name,
      language === 'en' ? `View products from ${farmer.name}` : `${farmer.name} থেকে পণ্য দেখুন`,
      [{ text: language === 'en' ? 'OK' : 'ঠিক আছে' }]
    );
  };

  const handleLogout = () => {
    Alert.alert(
      language === 'en' ? 'Sign Out' : 'সাইন আউট',
      language === 'en' ? 'Are you sure you want to sign out?' : 'আপনি কি নিশ্চিত যে আপনি সাইন আউট করতে চান?',
      [
        { text: language === 'en' ? 'Cancel' : 'বাতিল', style: 'cancel' },
        { 
          text: language === 'en' ? 'Sign Out' : 'সাইন আউট', 
          style: 'destructive',
          onPress: logout
        }
      ]
    );
  };

  const renderProfileInfo = () => (
    <View style={[styles.profileCard, { backgroundColor: colors.background }]}>
      <View style={styles.profileHeader}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color="#666" />
          </View>
        </View>
        <View style={styles.profileInfo}>
          <ThemedText style={styles.userName}>
            {user?.name || (language === 'en' ? 'John Doe' : 'জন ডো')}
          </ThemedText>
          <ThemedText style={styles.userSince}>
            {language === 'en' 
              ? 'Customer since January 2024' 
              : 'জানুয়ারী ২০২৪ থেকে গ্রাহক'
            }
          </ThemedText>
          <View style={styles.verifiedBadge}>
            <ThemedText style={styles.verifiedText}>
              {language === 'en' ? 'Verified Buyer' : 'যাচাইকৃত ক্রেতা'}
            </ThemedText>
          </View>
        </View>
      </View>

      <View style={styles.contactInfo}>
        <View style={styles.contactItem}>
          <Ionicons name="mail-outline" size={20} color={colors.text} />
          <ThemedText style={styles.contactText}>
            {user?.email || 'john.doe@email.com'}
          </ThemedText>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="call-outline" size={20} color={colors.text} />
          <ThemedText style={styles.contactText}>
            +৮৮০ ১৭১২-৩৪৫৬৭৮
          </ThemedText>
        </View>
        <View style={styles.contactItem}>
          <Ionicons name="location-outline" size={20} color={colors.text} />
          <ThemedText style={styles.contactText}>
            ঢাকা, বাংলাদেশ
          </ThemedText>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
        <ThemedText style={styles.editButtonText}>
          {language === 'en' ? 'Edit Profile' : 'প্রোফাইল সম্পাদনা'}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );

  const renderSettingsSection = () => (
    <View style={[styles.settingsCard, { backgroundColor: colors.background }]}>
      <ThemedText style={styles.sectionTitle}>
        {language === 'en' ? 'Settings' : 'সেটিংস'}
      </ThemedText>
      
      <TouchableOpacity 
        style={styles.settingItem}
        onPress={() => handleSettingsPress(language === 'en' ? 'Delivery Preferences' : 'ডেলিভারি পছন্দ')}
      >
        <View style={styles.settingLeft}>
          <Ionicons name="car-outline" size={24} color={colors.text} />
          <ThemedText style={styles.settingText}>
            {language === 'en' ? 'Delivery Preferences' : 'ডেলিভারি পছন্দ'}
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.settingItem}
        onPress={() => handleSettingsPress(language === 'en' ? 'Payment Methods' : 'পেমেন্ট পদ্ধতি')}
      >
        <View style={styles.settingLeft}>
          <Ionicons name="card-outline" size={24} color={colors.text} />
          <ThemedText style={styles.settingText}>
            {language === 'en' ? 'Payment Methods' : 'পেমেন্ট পদ্ধতি'}
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.settingItem}
        onPress={() => handleSettingsPress(language === 'en' ? 'Notifications' : 'বিজ্ঞপ্তি')}
      >
        <View style={styles.settingLeft}>
          <Ionicons name="notifications-outline" size={24} color={colors.text} />
          <ThemedText style={styles.settingText}>
            {language === 'en' ? 'Notifications' : 'বিজ্ঞপ্তি'}
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.settingItem}
        onPress={toggleLanguage}
      >
        <View style={styles.settingLeft}>
          <Ionicons name="language-outline" size={24} color={colors.text} />
          <ThemedText style={styles.settingText}>
            {language === 'en' ? 'Language' : 'ভাষা'}
          </ThemedText>
        </View>
        <View style={styles.settingRight}>
          <ThemedText style={styles.settingValue}>
            {language === 'en' ? 'English' : 'বাংলা'}
          </ThemedText>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity 
        style={styles.settingItem}
        onPress={() => handleSettingsPress(language === 'en' ? 'Help & Support' : 'সাহায্য ও সহায়তা')}
      >
        <View style={styles.settingLeft}>
          <Ionicons name="help-circle-outline" size={24} color={colors.text} />
          <ThemedText style={styles.settingText}>
            {language === 'en' ? 'Help & Support' : 'সাহায্য ও সহায়তা'}
          </ThemedText>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#ccc" />
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.settingItem, styles.logoutItem]}
        onPress={handleLogout}
      >
        <View style={styles.settingLeft}>
          <Ionicons name="log-out-outline" size={24} color="#F44336" />
          <ThemedText style={[styles.settingText, styles.logoutText]}>
            {language === 'en' ? 'Sign Out' : 'সাইন আউট'}
          </ThemedText>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderFavoriteFarmers = () => (
    <View style={[styles.farmersCard, { backgroundColor: colors.background }]}>
      <ThemedText style={styles.sectionTitle}>
        {language === 'en' ? 'Favorite Farmers' : 'প্রিয় কৃষক'}
      </ThemedText>
      
      {mockFavoriteFarmers.map((farmer) => (
        <View key={farmer.id} style={styles.farmerItem}>
          <View style={styles.farmerInfo}>
            <ThemedText style={styles.farmerName}>{farmer.name}</ThemedText>
            <ThemedText style={styles.farmerDetails}>
              {farmer.location} • {farmer.specialty}
            </ThemedText>
            <View style={styles.farmerStats}>
              <View style={styles.statItem}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <ThemedText style={styles.statText}>{farmer.rating}</ThemedText>
              </View>
              <View style={styles.statItem}>
                <Ionicons name="cube-outline" size={14} color="#666" />
                <ThemedText style={styles.statText}>
                  {farmer.products} {language === 'en' ? 'products' : 'পণ্য'}
                </ThemedText>
              </View>
            </View>
          </View>
          <TouchableOpacity 
            style={styles.viewProductsButton}
            onPress={() => handleViewProducts(farmer)}
          >
            <ThemedText style={styles.viewProductsText}>
              {language === 'en' ? 'View Products' : 'পণ্য দেখুন'}
            </ThemedText>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#F8F9FA' }]}>
      {/* Header */}
      <View style={styles.header}>
        <ThemedText style={styles.headerTitle}>
          {language === 'en' ? 'My Profile' : 'আমার প্রোফাইল'}
        </ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          {language === 'en' 
            ? 'Manage your account and preferences' 
            : 'আপনার অ্যাকাউন্ট এবং পছন্দ পরিচালনা করুন'
          }
        </ThemedText>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {renderProfileInfo()}
        {renderSettingsSection()}
        {renderFavoriteFarmers()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  avatarContainer: {
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userSince: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  verifiedBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  contactInfo: {
    gap: 12,
    marginBottom: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  settingsCard: {
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    paddingVertical: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  farmersCard: {
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  settingRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  settingText: {
    fontSize: 16,
    color: '#333',
  },
  settingValue: {
    fontSize: 14,
    color: '#666',
  },
  logoutText: {
    color: '#F44336',
  },
  farmerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  farmerInfo: {
    flex: 1,
  },
  farmerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  farmerDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  farmerStats: {
    flexDirection: 'row',
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 12,
    color: '#666',
  },
  viewProductsButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  viewProductsText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});