import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import CSignup from '../components/auth/CSignup';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <CSignup />
      <TouchableOpacity
        onPress={() => navigation.navigate('Login' as never)}
        style={{ marginTop: 20, alignItems: 'center' }}
      >
        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>
          Already have an account? Login here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
