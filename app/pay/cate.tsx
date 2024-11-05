import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from 'expo-router';

const productImage = require("../../assets/images/12.png");
const relatedProductImage1 = require("../../assets/images/14.png");
const relatedProductImage2 = require("../../assets/images/02.png");

export default function ProductDetailScreen() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const basePrice = 100;

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const totalPrice = basePrice * quantity;

  const relatedProducts = [
    { id: 1, name: "Áo Sơ Mi Reto", image: relatedProductImage1, price: "$50" },
    { id: 2, name: "Chân Váy Vạt Chéo", image: relatedProductImage2, price: "$70" },
  ];

  const sizes = ["S", "M", "L"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerIcons}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.productImageContainer}>
        <Image
          source={productImage}
          style={styles.productImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.productDetailsContainer}>
        <Text style={styles.productCategory}>Áo Sơ Mi</Text>
        <Text style={styles.productTitle}>Áo Sơ Mi Cổ Tàu</Text>

        <View style={styles.sizeContainer}>
          <Text style={styles.sizeTitle}>Size:</Text>
          {sizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.sizeButton,
                selectedSize === size && styles.selectedSizeButton,
              ]}
              onPress={() => setSelectedSize(size)}
            >
              <Text
                style={[
                  styles.sizeButtonText,
                  selectedSize === size && styles.selectedSizeButtonText,
                ]}
              >
                {size}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.quantityPriceContainer}>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={decreaseQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity
              onPress={increaseQuantity}
              style={styles.quantityButton}
            >
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.productPrice}>${totalPrice}</Text>
        </View>

        <Text style={styles.productDescription}>
          Giới thiệu sản phẩm hahahh
        </Text>

        <View style={styles.cartContainer}>
          {/* Chat Icon Button */}
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#fff" />
          </TouchableOpacity>
         
          <TouchableOpacity style={styles.addToCartButton}>
          <Link href='./cart'>
            <Text style={styles.addToCartButtonText}>Add To Cart</Text>
            </Link>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.relatedProductsContainer}>
        <Text style={styles.relatedProductsTitle}>Sản phẩm liên quan</Text>
        <View style={styles.productRow}>
          {relatedProducts.map((product) => (
            <View key={product.id} style={styles.productItem}>
              <Image
                source={product.image}
                style={styles.relatedProductImage}
              />
              <Text style={styles.productName} numberOfLines={2}>
                {product.name}
              </Text>
              <Text style={styles.productOtherPrice}>{product.price}</Text>
              <TouchableOpacity style={styles.buyButtonSmall}>
                <Text style={styles.buyButtonText}>Mua</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f0f4f8",
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    marginTop: 40,
  },
  productImageContainer: {
    alignItems: "center",
    marginBottom: 25,
    borderRadius: 20,
    overflow: "hidden",
    top: -12,
    width: "100%",
    height: 290,
  },
  productImage: {
    width: "100%",
    height: "100%",
  },
  productDetailsContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 20,
  },
  productCategory: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
    textTransform: "uppercase",
  },
  productTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  sizeTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 10,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  selectedSizeButton: {
    backgroundColor: "#06213e",
    borderColor: "#06213e",
  },
  sizeButtonText: {
    fontSize: 14,
    color: "#333",
  },
  selectedSizeButtonText: {
    color: "#fff",
  },
  quantityPriceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#06213e",
    padding: 9,
    height: 35,
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  quantityButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    color: "#06213e",
    marginHorizontal: 12,
  },
  productPrice: {
    fontSize: 18,
    marginRight: 20,
    fontWeight: "bold",
    color: "#ed181f",
  },
  productOtherPrice:{
    fontSize: 18,
    fontWeight: "bold",
    color: "#ed181f",
  },
  productDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 15,
  },
  cartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
  },
  cartButton: {
    backgroundColor: "#06213e",
    paddingVertical: 8, // Reduced padding
    paddingHorizontal: 10, // Reduced padding
    borderRadius: 10,
    marginRight: 10,
  
  },
  addToCartButton: {
    backgroundColor: "#06213e",
    paddingVertical: 10,  // Reduced from 12
    paddingHorizontal: 10,  // Reduced from 15
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
  
  },
  addToCartButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  relatedProductsContainer: {
    marginTop: 20,
  },
  relatedProductsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  productItem: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 10,
  },
  relatedProductImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  productName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  buyButtonSmall: {
    backgroundColor: "#06213e",
    paddingVertical: 6,
    borderRadius: 10,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
