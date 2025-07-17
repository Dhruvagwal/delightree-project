import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuditsTab from './tabs/AuditsTab';
import ProfileTab from './tabs/ProfileTab';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'clipboard';

          if (route.name === 'Audits') {
            iconName = focused ? 'clipboard' : 'clipboard-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Audits" component={AuditsTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
