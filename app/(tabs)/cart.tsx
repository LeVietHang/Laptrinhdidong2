import React, { useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

const cartItems = [
  { id: 1, name: 'Áo Phông Reto', image: require('../../assets/images/20.png'), price: 50, quantity: 1, selected: true, size: 'M' },
  { id: 2, name: 'Chân Váy Vinci', image: require('../../assets/images/05.png'), price: 70, quantity: 1, selected: true, size: 'L' },
];

export default function CartScreen() {
  const [items, setItems] = useState(cartItems);

  const increaseQuantity = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, quantity: item.quantity + 1 } : item));
  };

  const decreaseQuantity = (id: number) => {
    setItems(items.map(item => item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const toggleSelectItem = (id: number) => {
    setItems(items.map(item => item.id === id ? { ...item, selected: !item.selected } : item));
  };

  const changeSize = (id: number, newSize: string) => {
    setItems(items.map(item => item.id === id ? { ...item, size: newSize } : item));
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      if (item.selected) {
        return total + item.price * item.quantity;
      }
      return total;
    }, 0);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Giỏ hàng</Text>
        <TouchableOpacity>
          <Ionicons name="trash-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.cartItemsContainer}>
        {items.map(item => (
          <View key={item.id} style={styles.cartItem}>
            <TouchableOpacity onPress={() => toggleSelectItem(item.id)} style={styles.customCheckBox}>
              {item.selected ? (
                <Ionicons name="checkmark-circle" size={24} color="#06213e" />
              ) : (
                <Ionicons name="ellipse-outline" size={24} color="#ccc" />
              )}
            </TouchableOpacity>

            <Image source={item.image} style={styles.cartItemImage} />
            <View style={styles.cartItemDetails}>
              <Text style={styles.cartItemName}>{item.name}</Text>
              <View style={styles.cartItemQuantityContainer}>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.cartItemQuantity}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.cartItemPrice}>${item.price * item.quantity}</Text>
              <View style={styles.sizeSelector}>
                <Text style={styles.sizeLabel}>Size:</Text>
                {['S', 'M', 'L'].map((size) => (
                  <TouchableOpacity
                    key={size}
                    onPress={() => changeSize(item.id, size)}
                    style={[
                      styles.sizeButton,
                      item.size === size ? styles.selectedSizeButton : {},
                    ]}
                  >
                    <Text style={item.size === size ? styles.selectedSizeText : styles.sizeText}>{size}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng thanh toán:</Text>
        <Text style={styles.totalPrice}>${calculateTotal()}</Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
      <Link href="/pay">
           
        <Text style={styles.checkoutButtonText}>Mua hàng</Text>
        </Link>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 16,
    top: 15,
    backgroundColor: "#f0f4f8",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  cartItemsContainer: {
    marginBottom: 20,
    
  },
  cartItem: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  customCheckBox: {
    marginRight: 10,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cartItemName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    top: 14,
    marginBottom: 10,
  },
  cartItemQuantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    backgroundColor: '#06213e',
    padding: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
    height: 27,
    top: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  quantityButtonText: {
    color: '#fff',
    top:-6,
    fontWeight: 'bold',
    fontSize: 18,
  },
  cartItemQuantity: {
    fontSize: 20,
    top: 14,
    color: '#06213e',
    marginHorizontal: 12,
  },
  cartItemPrice: {
    fontSize: 18,
    top: -10,
    fontWeight: 'bold',
    color: '#ed181f',
    left: 140,
    bottom: 20,
  },
  sizeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  sizeLabel: {
    marginRight: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 10,
  },
  selectedSizeButton: {
    borderColor: '#06213e',
  },
  sizeText: {
    color: '#333',
  },
  selectedSizeText: {
    color: '#06213e',
    fontWeight: 'bold',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    right: -80,
    color: '#333',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    top: -2,
    left: -50,
    color: '#ed181f',
  },
  checkoutButton: {
    backgroundColor: '#06213e',
    paddingVertical: 12,
    right: -210,
    width:150,
    borderRadius: 10,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
