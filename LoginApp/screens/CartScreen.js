import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';

export default function CartScreen({ route, navigation }) {
  const { cart, setCart } = route.params;

  const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  const handleCheckout = () => {
    Alert.alert('Order Placed!', `Your order total is $${total}`);
    setCart([]);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Your cart is empty.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>${item.price}</Text>
            </View>
          )}
        />
      )}
      {cart.length > 0 && (
        <>
          <Text style={styles.total}>Total: ${total}</Text>
          <TouchableOpacity style={styles.checkout} onPress={handleCheckout}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 15 },
  item: {
    padding: 15,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 10,
  },
  title: { fontSize: 16 },
  price: { fontSize: 14, color: '#E91E63' },
  total: { fontSize: 18, fontWeight: 'bold', marginTop: 10 },
  checkout: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
  },
  checkoutText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  empty: { fontSize: 16, color: '#888' },
});
