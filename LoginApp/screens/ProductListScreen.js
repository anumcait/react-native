import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, Image, TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import axios from 'axios';

export default function ProductListScreen({ route, navigation }) {
  const { category, addToCart } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [category]);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => addToCart(item)}
        >
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category.replace('%20', ' ')}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#E91E63" />
      ) : (
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textTransform: 'capitalize',
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    padding: 10,
  },
  image: { height: 180, width: '100%', resizeMode: 'contain' },
  info: { marginTop: 10 },
  title: { fontWeight: 'bold', marginBottom: 5 },
  price: { color: '#E91E63', marginBottom: 10 },
  button: {
    backgroundColor: '#E91E63',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: { color: '#fff', textAlign: 'center' },
});
