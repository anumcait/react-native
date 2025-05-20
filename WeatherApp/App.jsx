import React, { useState } from 'react';
import {
  SafeAreaView,
  Text,
  TextInput,
  Button,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

const API_KEY = 'b759856b7ae26db1726401c8a15af6be';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const getWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
      setWeather(null);
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>🌤️ Weather App</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Get Weather" onPress={getWeather} />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {weather && (
        <View style={styles.result}>
          <Text style={styles.city}>{weather.name}</Text>
          <Text style={styles.temp}>{weather.main.temp} °C</Text>
          <Text>{weather.weather[0].description}</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  result: { marginTop: 20, alignItems: 'center' },
  city: { fontSize: 22, fontWeight: '600' },
  temp: { fontSize: 36, fontWeight: 'bold' },
});

export default WeatherApp;
