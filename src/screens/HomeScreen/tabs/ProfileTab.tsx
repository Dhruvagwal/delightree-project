import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const ProfileTab = () => {
  const { user, logout } = useAuth();
  const navigation = useNavigation();

  const handleEditProfile = () => {
    navigation.navigate('EditProfile' as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {user?.username}</Text>
      <Text style={styles.subtext}>User Type: {user?.type}</Text>

      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.logout]} onPress={logout}>
        <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtext: { fontSize: 16, marginBottom: 30, color: '#555' },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  logout: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  logoutText: {
    fontWeight: 'bold',
  },
});

export default ProfileTab;
