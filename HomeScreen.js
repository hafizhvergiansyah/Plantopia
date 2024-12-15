import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require('./assets/images/Logo.png')}
        style={styles.logo}
      />

      {/* Judul Aplikasi */}
      <Text style={styles.title}>Welcome to Plantopia</Text>
      <Text style={styles.subtitle}>
        Explore the map and track your plants' journey
      </Text>

      {/* Tombol Navigasi ke Map */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('MapView')} // Sesuai dengan nama layar
      >
        <Text style={styles.buttonText}>View Plant Map</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f8f2',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4b8b3b',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6e7e5e',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ffcc33',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
  },
  buttonText: {
    color: '#4b8b3b',
    fontSize: 18,
    fontWeight: '600',
  },
});
