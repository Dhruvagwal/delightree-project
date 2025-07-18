import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuditsTab from './tabs/AuditsTab';
import ProfileTab from './tabs/ProfileTab';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { INPUT_COLOR, MAIN_COLOR, PRIMARY_COLOR } from '../../styles/global';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'grid';

          if (route.name === 'Audits') {
            iconName = focused ? 'grid' : 'grid-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: PRIMARY_COLOR,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          elevation: 0,
          borderColor:INPUT_COLOR,
          shadowOpacity: 0,
          height: 60,
          paddingTop: 5,
          backgroundColor:MAIN_COLOR,
        },
      })}
    >
      <Tab.Screen name="Audits" component={AuditsTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
};

export default HomeScreen;
