import React, { useState } from 'react'; 
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import Slider from "../screens/Slider";
import Product from "../screens/Product";
import Categories from "../screens/Categories";

const { width } = Dimensions.get('window');

// Kiểu cho sản phẩm
type Product = {
  id: number;
  name: string;
  price: number;
  image: string;
};

export default function HomeScreen() {
  const [likedProducts, setLikedProducts] = useState<{ [key: number]: boolean }>({});

  const toggleLike = (productId: number) => {
    setLikedProducts((prevState) => ({
      ...prevState,
      [productId]: !prevState[productId],
    }));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header: Logo and Search Bar */}
      <View style={styles.header}>
        <Image source={require("@/assets/images/logo1.png")} style={styles.logo} />
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Search products..."
            placeholderTextColor="#aaa"
          />
          <Ionicons name="search" size={18} color="#000" style={styles.searchIcon} />
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="cart-outline" size={24} color="#06213e" />
        </TouchableOpacity>
      </View>
      <Slider/>

      {/* Slideshow */}
     

      {/* Category Section */}
      <Categories/>

      <Product/>

      
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f4f8",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 65,
    top: 10,
    marginRight: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    width: 240,
    alignItems: 'center',
    borderColor: '#ddd',
    top: 10,
    borderWidth: 2,
    borderRadius: 25,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  searchBar: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 14,
    color: '#333',
  },
  searchIcon: {
    marginLeft: 8,
  },
  cartButton: {
    top: 10,
    marginLeft: 8,
  },
  // slideshow: {
  //   height: 160,
  //   marginTop: 15,
  //   marginBottom: 40,
  // },
  // slide: {
  //   width,
  //   height: '100%',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  // slideImage: {
  //   width: width * 0.9,
  //   height: '100%',
  //   borderRadius: 10,
  // },
  // categorySection: {
  //   flexDirection: 'row',
  //   marginBottom: 0,
  // },
  // categoryButton: {
  //   backgroundColor: '#06213e',
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  //   borderRadius: 25,
  //   marginRight: 10,
  //   alignItems: 'center',
  //   flexDirection: 'row',
  // },
  // categoryIcon: {
  //   marginRight: 6,
  // },
  // categoryButtonText: {
  //   color: '#fff',
  //   fontWeight: 'bold',
  //   fontSize: 12,
  // },
  // productContainer: {
  //   marginBottom: 0,
  // },
  // productRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginBottom: 16,
  // },
  // productCard: {
  //   backgroundColor: '#fff',
  //   borderRadius: 10,
  //   marginVertical: 10,
  //   borderWidth: 1,
  //   borderColor: "#ddd",
  //   padding: 10,
  //   width: '48%',
  //   elevation: 4,
  // },
  // imageContainer: {
  //   position: 'relative',
  // },
  // productImage: {
  //   width: '100%',
  //   height: 120,
  //   borderRadius: 10,
  //   marginBottom: 8,
  // },
  // heartIconContainer: {
  //   position: 'absolute',
  //   top: -2,
  //   right: 5,
  // },
  // productName: {
  //   fontSize: 16,
  //   fontWeight: 'bold',
  //   color:'#06213e',
  //   marginBottom: 4,
  // },
  // productPrice: {
  //   fontSize: 14,
  //   color: '#ed181f',
  //   fontWeight: 'bold',
  //   marginBottom: 8,
  // },
  // buyButton: {
  //   backgroundColor: '#06213e',
  //   borderRadius: 8,
  //   paddingVertical: 8,
  //   alignItems: 'center',
  // },
  // buyButtonText: {
  //   color: '#fff',
  //   fontWeight: 'bold',
  // },
});

