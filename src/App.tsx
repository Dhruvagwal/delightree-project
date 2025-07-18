import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar, ActivityIndicator, View } from 'react-native';
import { DarkTheme } from '@react-navigation/native';

import { AuthProvider, useAuth } from './context/AuthContext';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import HomeScreen from './screens/HomeScreen';
import CreateAuditScreen from './screens/HomeScreen/CreateAuditScreen';
import AuditDetailScreen from './screens/HomeScreen/AuditDetailScreen';
import EditProfileScreen from './screens/HomeScreen/EditProfileScreen';
import { MAIN_COLOR, PRIMARY_COLOR, TEXT_COLOR } from './styles/global';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator>
      {user ? (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Home"
            component={HomeScreen}
          />
          <Stack.Screen name="CreateAudit" component={CreateAuditScreen} />
          <Stack.Screen name="AuditDetail" component={AuditDetailScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        </>
      ) : (
        <>
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Signup"
            component={SignupScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      {/* <StatusBar backgroundColor={MAIN_COLOR} barStyle="light-content" /> */}
      <StatusBar hidden />
      <NavigationContainer
        theme={{
          ...DarkTheme,
          colors: {
            ...DarkTheme.colors,
            background: MAIN_COLOR,
            text: TEXT_COLOR,
            primary: PRIMARY_COLOR,
          },
        }}
      >
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}
