import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  Image,
} from 'react-native';
import CLogin from '../components/auth/CLogin';
import {
  Logo,
  MAIN_COLOR,
  PRIMARY_COLOR,
  SCREEN_PADDING,
} from '../styles/global';
import { useKeyboardVisible } from '../hooks/useKeyboardVisible';
import { form_styles } from '../components/auth/styles';
const image = {
  uri: 'https://static.ambitionbox.com/api/v2/photo/c3NvU3ZVdDhnQVRkY3JBNFhyMnJ3QT09',
};
const LoginScreen = ({ navigation }: any) => {
  const isActive = useKeyboardVisible();
  return (
    <View style={styles.container}>
      {!isActive && (
        <>
          <ImageBackground
            source={image}
            resizeMode="cover"
            style={{
              flex: 1,
              justifyContent: 'center',
              position: 'absolute',
              width: '100%',
              height: '80%',
            }}
          />
          <View style={{ flex: 1 }} />
        </>
      )}
      <View
        style={{
          marginTop: !isActive ? 0 : 50,
          backgroundColor: MAIN_COLOR,
          padding: SCREEN_PADDING * 1.5,
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        }}
      >
        <Logo />
        <CLogin />
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          style={styles.signupLink}
        >
          <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  signupLink: { marginTop: 20, alignItems: 'center' },
  signupText: { color: PRIMARY_COLOR, textDecorationLine: 'underline' },
});

export default LoginScreen;
