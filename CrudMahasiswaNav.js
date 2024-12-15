import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserGraduate, faPlusCircle,faHome, faUserPen, faMapMarkedAlt, faTree } from '@fortawesome/free-solid-svg-icons';

// Import Screens
import HomeScreen from './HomeScreen';
import Createdata from './Createdata';
import DataTanaman from './Listdata';
import Editdata from './Editdata';
import MapView from './Mapview';

// Tab Navigator
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: true,
          headerShown: false,
          tabBarStyle: { backgroundColor: '#f8f8f8', paddingBottom: 5 },
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faHome} color={color} size={20} />
            ),
          }}
        />

        <Tab.Screen
          name="Data Tanaman"
          component={DataTanaman}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faTree} color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="Edit Data"
          component={Editdata}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUserPen} color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="MapView"
          component={MapView}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faMapMarkedAlt} color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
