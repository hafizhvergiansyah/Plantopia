import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSeedling, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from '@react-navigation/native';
import MapScreen from './Mapview';

const Listdata = () => {
  const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
  const [isLoading, setLoading] = useState(true);
  const [dataTanaman, setDataTanaman] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const navigation = useNavigation();

  // Fetch data tanaman dari backend
  const fetchData = () => {
    setLoading(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        setDataTanaman(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshPage = () => {
    setRefresh(true);
    fetchData();
    setRefresh(false);
  };

  const deleteData = (id) => {
    fetch(`${jsonUrl}/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        Alert.alert('Success', 'Data berhasil dihapus');
        refreshPage();
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
        Alert.alert('Error', 'Gagal menghapus data');
      });
  };

  const calculateAge = (dateString) => {
    const today = new Date();
    const plantingDate = new Date(dateString);
    const differenceInDays = Math.floor(
      (today - plantingDate) / (1000 * 60 * 60 * 24)
    );
    return `${differenceInDays} hari`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      ) : (
        <FlatList
          style={{ marginBottom: 0 }}
          data={dataTanaman}
          onRefresh={refreshPage}
          refreshing={refresh}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('MapScreen', {
                  selectedMarker: {
                    latitude: item.location.latitude,
                    longitude: item.location.longitude,
                    nama_tanaman: item.nama_tanaman,
                    date: item.date,
                  },
                })
              }
            >
              <View style={styles.card}>
                <View style={styles.iconContainer}>
                  <FontAwesomeIcon icon={faSeedling} size={50} color="#58c7ff" />
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.cardTitle}>{item.nama_tanaman}</Text>
                  <Text style={styles.cardSubtitle}>Kondisi: {item.kondisi}</Text>
                  <Text style={styles.cardSubtitle}>Alamat: {item.alamat}</Text>
                  <Text style={styles.cardSubtitle}>Tanggal: {item.date}</Text>
                  <Text style={styles.cardSubtitle}>
                    Lokasi: {item.location.latitude}, {item.location.longitude}
                  </Text>
                  <Text style={styles.cardSubtitle}>
                    Usia Tanaman: {calculateAge(item.date)}
                  </Text>
                </View>
                <View style={styles.chevronContainer}>
                  <FontAwesomeIcon icon={faChevronRight} size={20} />
                </View>
              </View>
              <View style={styles.form}>
                <Button
                  title="Hapus"
                  onPress={() =>
                    Alert.alert('Hapus Data', 'Yakin ingin menghapus data ini?', [
                      { text: 'Tidak', style: 'cancel' },
                      { text: 'Ya', onPress: () => deleteData(item.id) },
                    ])
                  }
                  color="red"
                />
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 15,
  },
  infoContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 2,
  },
  chevronContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  form: {
    paddingHorizontal: 15,
    paddingBottom: 10,
  },
});

export default Listdata;
