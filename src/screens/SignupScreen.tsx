import React from 'react';
import { View, Button, Text, TouchableOpacity } from 'react-native';
import CSignup from '../components/auth/CSignup';
import { useNavigation } from '@react-navigation/native';
import { Logo, PRIMARY_COLOR, SCREEN_PADDING } from '../styles/global';

const SignupScreen = () => {
  const navigation = useNavigation();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        padding: SCREEN_PADDING * 1.5,
        marginTop: 50,
      }}
    >
      <Logo />
      <CSignup />
      <TouchableOpacity
        onPress={() => navigation.navigate('Login' as never)}
        style={{ marginTop: 20, alignItems: 'center' }}
      >
        <Text style={{ color: PRIMARY_COLOR, textDecorationLine: 'underline' }}>
          Already have an account? Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;
