import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    try {
      await auth().createUserWithEmailAndPassword(email, password);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Registration Error', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      await auth().signInWithEmailAndPassword(email, password);
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <ImageBackground
     // source={{ uri: 'https://source.unsplash.com/featured/?fashion' }}
      source={{ uri: 'https://t3.ftcdn.net/jpg/02/96/19/88/360_F_296198884_iJvPPEL8ACqJETMHn6bs4cNmHv54MGMv.jpg' }}
      
      style={styles.background}
      blurRadius={1}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to AnuFashions</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.registerBtn]} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
       backgroundColor: 'rgba(100,0,0,0.5)',
  },
  overlay: {

    padding: 30,
    margin: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    color: '#9C27B0',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#E91E63',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  registerBtn: {
    backgroundColor: '#9C27B0',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
