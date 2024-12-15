import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import MapLibreGL from '@maplibre/maplibre-react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTree } from '@fortawesome/free-solid-svg-icons';

const jsonUrl = 'http://10.0.2.2:3000/mahasiswa'; // Replace with your backend URL

MapLibreGL.setAccessToken(null);

const MapScreen = () => {
  const [markers, setMarkers] = useState([]);
  const [isAddMode, setAddMode] = useState(false);
  const [tempCoordinate, setTempCoordinate] = useState(null);
  const [markerData, setMarkerData] = useState({
    nama_tanaman: '',
    kondisi: '',
    alamat: '',
    date: '',
    location: {
      latitude: null,
      longitude: null,
    },
  });
  const [selectedMarker, setSelectedMarker] = useState(null);

  // Fetch markers from the backend
  const fetchMarkers = async () => {
    try {
      const response = await fetch(jsonUrl);
      const data = await response.json();
      setMarkers(data);
    } catch (error) {
      console.error('Error fetching markers:', error);
      Alert.alert('Error', 'Failed to fetch marker data');
    }
  };

  useEffect(() => {
    fetchMarkers();
  }, []);

  // Handle long press to add marker
  const handleLongPress = (e) => {
    const { geometry } = e;
    setTempCoordinate(geometry.coordinates);
    setAddMode(true);
    setMarkerData({
      ...markerData,
      location: {
        latitude: geometry.coordinates[1],
        longitude: geometry.coordinates[0],
      },
      date: new Date().toISOString().split('T')[0], // Set current date
    });
  };

  // Save marker to backend
  const handleSaveMarker = async () => {
    if (!markerData.nama_tanaman || !markerData.kondisi || !markerData.alamat) {
      Alert.alert('Error', 'All fields are required!');
      return;
    }

    const newMarker = {
      id: Date.now().toString(),
      ...markerData,
    };

    try {
      const response = await fetch(jsonUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newMarker),
      });

      if (!response.ok) throw new Error('Failed to save marker.');

      setMarkers([...markers, newMarker]);
      setAddMode(false);
      setTempCoordinate(null);
      Alert.alert('Success', 'Marker saved successfully!');
    } catch (error) {
      console.error('Error saving marker:', error);
      Alert.alert('Error', 'Failed to save marker.');
    }
  };

  // Handle marker press
  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

  const closePopup = () => {
    setSelectedMarker(null);
  };

  const handleCancel = () => {
    setAddMode(false);
    setTempCoordinate(null);
  };

  return (
    <View style={styles.container}>
      <MapLibreGL.MapView
        style={styles.map}
        styleURL="https://api.maptiler.com/maps/streets-v2/style.json?key=D17gGlj0wqTi5KQQ0yHF"
        onLongPress={handleLongPress}
      >
        <MapLibreGL.Camera zoomLevel={9} centerCoordinate={[106.827153, -6.17511]} />

        {/* Render Markers */}
        {markers.map((marker, index) => (
          <MapLibreGL.PointAnnotation
            key={index}
            id={marker.id}
            coordinate={[
              marker.location.longitude,
              marker.location.latitude,
            ]}
            onSelected={() => handleMarkerPress(marker)}
          >
            <View style={styles.markerIcon}>
              <FontAwesomeIcon icon={faTree} size={30} color="#28a745" />
            </View>
          </MapLibreGL.PointAnnotation>
        ))}
      </MapLibreGL.MapView>

      {/* Popup Information */}
      {selectedMarker && (
        <View style={styles.popupContainer}>
          <Text style={styles.popupText}>
            <Text style={styles.boldText}>Nama Tanaman:</Text> {selectedMarker.nama_tanaman}
          </Text>
          <Text style={styles.popupText}>
            <Text style={styles.boldText}>Tanggal:</Text> {selectedMarker.date}
          </Text>
          <Text style={styles.popupText}>
            <Text style={styles.boldText}>Kondisi:</Text> {selectedMarker.kondisi}
          </Text>
          <Text style={styles.popupText}>
            <Text style={styles.boldText}>Alamat:</Text> {selectedMarker.alamat}
          </Text>
          <TouchableOpacity onPress={closePopup} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Tutup</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Add Marker Form */}
      {isAddMode && (
        <View style={styles.formContainer}>
          <Text style={styles.title}>Add New Marker</Text>
          <TextInput
            style={styles.input}
            placeholder="Nama Tanaman"
            value={markerData.nama_tanaman}
            onChangeText={(text) => setMarkerData({ ...markerData, nama_tanaman: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Kondisi"
            value={markerData.kondisi}
            onChangeText={(text) => setMarkerData({ ...markerData, kondisi: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Alamat"
            value={markerData.alamat}
            onChangeText={(text) => setMarkerData({ ...markerData, alamat: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Tanggal"
            value={markerData.date}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Latitude"
            value={tempCoordinate ? tempCoordinate[1].toString() : ''}
            editable={false}
          />
          <TextInput
            style={styles.input}
            placeholder="Longitude"
            value={tempCoordinate ? tempCoordinate[0].toString() : ''}
            editable={false}
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveMarker}>
              <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
  markerIcon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  popupText: {
    fontSize: 16,
    marginBottom: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#ff5c5c',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  formContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: 40,
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  cancelButton: { backgroundColor: 'gray', padding: 10, borderRadius: 5 },
  saveButton: { backgroundColor: '#28a745', padding: 10, borderRadius: 5 },
  buttonText: { color: '#fff', textAlign: 'center' },
});

export default MapScreen;
