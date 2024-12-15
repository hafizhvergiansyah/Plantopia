import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faSeedling } from '@fortawesome/free-solid-svg-icons';

const EditData = () => {
  const jsonUrl = 'http://10.0.2.2:3000/mahasiswa';
  const [namaTanaman, setNamaTanaman] = useState('');
  const [kondisi, setKondisi] = useState('');
  const [alamat, setAlamat] = useState('');
  const [tanggal, setTanggal] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [selectedTanaman, setSelectedTanaman] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [dataTanaman, setDataTanaman] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const fetchData = () => {
    setLoading(true);
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => setDataTanaman(json))
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

  const submit = () => {
    if (!selectedTanaman || !selectedTanaman.id) {
      alert('Pilih data untuk diedit.');
      return;
    }

    const data = {
      nama_tanaman: namaTanaman,
      kondisi: kondisi,
      alamat: alamat,
      date: tanggal,
      location: {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      },
    };

    fetch(`${jsonUrl}/${selectedTanaman.id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then(() => {
        alert('Data tanaman berhasil diperbarui');
        resetForm();
        refreshPage();
      })
      .catch((error) => {
        console.error(error);
        alert('Gagal memperbarui data');
      });
  };

  const selectItem = (item) => {
    setSelectedTanaman(item);
    setNamaTanaman(item.nama_tanaman);
    setKondisi(item.kondisi);
    setAlamat(item.alamat);
    setTanggal(item.date);
    setLatitude(item.location.latitude.toString());
    setLongitude(item.location.longitude.toString());
  };

  const resetForm = () => {
    setNamaTanaman('');
    setKondisi('');
    setAlamat('');
    setTanggal('');
    setLatitude('');
    setLongitude('');
    setSelectedTanaman(null);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <View style={styles.loading}>
            <Text>Loading...</Text>
          </View>
        ) : (
          <>
            <Text style={styles.title}>Edit Data Tanaman</Text>
            <View style={styles.form}>
              <TextInput
                style={styles.input}
                placeholder="Nama Tanaman"
                value={namaTanaman}
                onChangeText={setNamaTanaman}
              />
              <TextInput
                style={styles.input}
                placeholder="Kondisi"
                value={kondisi}
                onChangeText={setKondisi}
              />
              <TextInput
                style={styles.input}
                placeholder="Alamat Detail"
                value={alamat}
                onChangeText={setAlamat}
              />
              <TextInput
                style={styles.input}
                placeholder="Tanggal"
                value={tanggal}
                onChangeText={setTanggal}
              />
              <TextInput
                style={styles.input}
                placeholder="Latitude"
                value={latitude}
                onChangeText={setLatitude}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Longitude"
                value={longitude}
                onChangeText={setLongitude}
                keyboardType="numeric"
              />
              <Button title="Simpan Perubahan" onPress={submit} />
            </View>
            <FlatList
              data={dataTanaman}
              keyExtractor={(item) => item.id.toString()}
              refreshing={refresh}
              onRefresh={refreshPage}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => selectItem(item)}>
                  <View style={styles.card}>
                    <View style={styles.iconContainer}>
                      <FontAwesomeIcon icon={faSeedling} size={50} color="#58c7ff" />
                    </View>
                    <View>
                      <Text style={styles.cardTitle}>{item.nama_tanaman}</Text>
                      <Text>Kondisi: {item.kondisi}</Text>
                      <Text>Alamat: {item.alamat}</Text>
                      <Text>Tanggal: {item.date}</Text>
                      <Text>
                        Lokasi: {item.location.latitude}, {item.location.longitude}
                      </Text>
                    </View>
                    <View style={styles.editIcon}>
                      <FontAwesomeIcon icon={faPenToSquare} size={20} color="#333" />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </>
        )}
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EditData;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingVertical: 12,
    backgroundColor: '#333',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  form: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#777',
    borderRadius: 8,
    padding: 8,
    marginVertical: 5,
  },
  card: {
    flexDirection: 'row',
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  editIcon: {
    flex: 1,
    alignItems: 'flex-end',
  },
});
