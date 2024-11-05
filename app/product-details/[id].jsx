import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { fetchProductById } from "../api/product";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ProductDetails() {
  const route = useRoute();
  const navigation = useNavigation();
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const sizes = ["S", "M", "L"];

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const totalPrice = (product ? product.price : 100) * quantity;

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!product) { 
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={28} color="#000" />
        </TouchableOpacity>
      </View>
      <Image
        source={{ uri: `http://127.0.0.1:8000/images/products/${product.image}` }}
        style={styles.mainImage}
        resizeMode="cover"
      />
      <View style={styles.header}>
        <Text style={styles.productName}>{product.name}</Text>
      </View>
      <Text style={styles.productPrice}>${totalPrice.toFixed(2)}</Text>
      <Text style={styles.productDescription}>Mô tả sản phẩm: {product.description}</Text>
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
          <TouchableOpacity onPress={decreaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{quantity}</Text>
          <TouchableOpacity onPress={increaseQuantity} style={styles.quantityButton}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.productPrice}>${totalPrice.toFixed(2)}</Text>
      </View>
      <View style={styles.cartContainer}>
        <TouchableOpacity style={styles.cartButton}>
          <Ionicons name="chatbubble-outline" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToCartButton} onPress={() => {/* Handle adding to cart */}}>
          <Text style={styles.addToCartButtonText}>Add To Cart</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.productDescription}>{product.description}</Text>
        <View style={styles.additionalDetails}>
          <Text style={styles.detailsHeader}>Additional Product Details:</Text>
          <Text style={styles.detailsText}>{product.detail}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    paddingHorizontal: 20,
    paddingTop: -10,
  },
  mainImage: {
    width: "100%",
    height: 300,
    borderRadius: 15,
    top: -15,
    marginVertical: 15,
  },
  header: {
    alignItems: "center",
    marginBottom: -10,
  },
  productName: {
    fontSize: 28,
    fontWeight: "600",
    color: "#06213e",
    textAlign: "center",
  },
  productPrice: {
    fontSize: 20,
    color: "#ed181f",
    fontWeight: "600",
    marginVertical: 10,
    textAlign: "center",
  },
  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  sizeButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  selectedSizeButton: {
    backgroundColor: "#06213e",
    borderColor: "#06213e",
  },
  sizeButtonText: {
    fontSize: 16,
    color: "#333",
    fontWeight: 'bold',
  },
  selectedSizeButtonText: {
    color: "#fff",
  },
  quantityPriceContainer: {
    flexDirection: "row",
    top: -20,
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 15,
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#06213e",
    padding: 10,
    borderRadius: 8,
    
  },
  quantityButtonText: {
    color: "#fff",
    fontWeight: 'bold',
    fontSize: 16,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#06213e",
    marginHorizontal: 12,
  },
  cartContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
  cartButton: {
    backgroundColor: "#ed181f",
    padding: 10,
    borderRadius: 8,
    top: -30,
    marginRight: 10,
  },
  addToCartButton: {
    backgroundColor: "#06213e",
    paddingVertical: 12,
    borderRadius: 8,
      top: -30,
    flex: 1,
    alignItems: "center",
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: 'bold',
  },
  productDescription: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  scrollContainer: {
    paddingTop: 10,
    paddingBottom: 20,
  },
  additionalDetails: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 14,
    color: "#666",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  headerIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 40,
  },
});
