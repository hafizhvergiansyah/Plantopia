import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profil from './App';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faGear} from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

import Mahasiswa from './Mahasiswa';

function HomeScreen() {
  return (
    <Profil/>
  );
}

function SettingsScreen() {
  return (
   <Mahasiswa/>
  );
}
function WebScreen() {
  return (
    <WebView
      source={{ uri: 'https://github.com/hafizhvergiansyah' }}
      style={{ flex: 1 }} // Optional: Makes WebView take up the full screen
    />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faUser} color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="Data"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faGear} color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="Github"
          component={WebScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <FontAwesomeIcon icon={faGithub} color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}