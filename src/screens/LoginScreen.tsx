import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import CLogin from '../components/auth/CLogin';

const LoginScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      <CLogin />
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={styles.signupLink}
      >
        <Text style={styles.signupText}>
          Don't have an account? Sign up here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  signupLink: { marginTop: 20, alignItems: 'center' },
  signupText: { color: 'blue', textDecorationLine: 'underline' },
});

export default LoginScreen;
