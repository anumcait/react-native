import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, FlatList, Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const categories = [
  { id: '1', name: "women's clothing" },
  { id: '2', name: "men's clothing" },
  { id: '3', name: 'jewelery' },
  { id: '4', name: 'electronics' },
];

export default function HomeScreen({ navigation }) {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
    Alert.alert('Added to Cart', item.title);
  };

  const handleLogout = () => {
    auth().signOut();
    navigation.replace('Login');
  };

  const navigateToCategory = (category) => {
    navigation.navigate('ProductList', {
      category,
      addToCart,
    });
  };

  const viewCart = () => {
    navigation.navigate('Cart', { cart, setCart });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Shop by Category</Text>
      <FlatList
        data={categories}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categoryBtn}
            onPress={() => navigateToCategory(item.name)}
          >
            <Text style={styles.categoryText}>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />

      <TouchableOpacity style={styles.cartBtn} onPress={viewCart}>
        <Text style={styles.cartText}>View Cart ({cart.length})</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logout} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20, fontWeight: 'bold' },
  categoryBtn: {
    padding: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    marginBottom: 15,
  },
  categoryText: { fontSize: 18 },
  cartBtn: {
    backgroundColor: '#FF9800',
    padding: 12,
    borderRadius: 10,
    marginTop: 20,
  },
  cartText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  logout: {
    marginTop: 10,
    backgroundColor: '#F44336',
    padding: 12,
    borderRadius: 10,
  },
  logoutText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
