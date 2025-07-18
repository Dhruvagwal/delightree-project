import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';
import {
  TEXT_COLOR,
  PRIMARY_COLOR,
  SCREEN_PADDING,
  INPUT_COLOR,
} from '../../../styles/global';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ProfileTab = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleEditProfile = () => {
    navigation.navigate('EditProfile' as never);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: logout },
      ],
      { cancelable: true },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.typeTag}>{user?.type}</Text>
      </View>

      <View style={styles.options}>
        <TouchableOpacity style={styles.optionItem} onPress={handleEditProfile}>
          <Ionicons
            name="create-outline"
            size={20}
            color={TEXT_COLOR}
            style={styles.icon}
          />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionItem} onPress={handleLogout}>
          <Ionicons
            name="log-out-outline"
            size={20}
            color="#ff4d4f"
            style={styles.icon}
          />
          <Text style={[styles.optionText, { color: '#ff4d4f' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SCREEN_PADDING,
    marginTop: 50,
  },
  headerContainer: {
    marginBottom: 32,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: TEXT_COLOR,
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  typeTag: {
    backgroundColor: '#2a2a2a',
    color: '#ccc',
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  options: {},
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    backgroundColor: INPUT_COLOR,
    paddingHorizontal: SCREEN_PADDING,
    borderRadius: 5,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
    color: TEXT_COLOR,
  },
  icon: {
    marginRight: 16,
  },
});

export default ProfileTab;
