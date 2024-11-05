import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchProducts } from "../api/product";
import { Link, router, useRouter } from "expo-router";

const { width: windowWidth } = Dimensions.get("window");

const Product = () => {
  const [products, setProducts] = useState([]); // Holds the fetched products
  const [loading, setLoading] = useState(true); // Loading state
  const [likedProducts, setLikedProducts] = useState({}); // State for liked products
  const router = useRouter();
  const toggleLike = (productId) => {
    setLikedProducts((prevLikedProducts) => ({
      ...prevLikedProducts,
      [productId]: !prevLikedProducts[productId], // Toggle like status
    }));
  };

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts(); // Fetch products from API
        setProducts(fetchedProducts); // Set the fetched products
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts(); // Call the function to load products
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4081" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.productContainer}>
        {products.map((product) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/product-details/[id]",
                params: { id: product.id },
              })
            }
            key={product.id}
            style={styles.productCard}
          >
            <View style={styles.imageContainer}>
              <Image
                source={{
                  uri: `http://127.0.0.1:8000/images/products/${product.image}`, // Image from the backend
                }}
                style={styles.productImage} // Fixed image style reference
              />
              <TouchableOpacity
                style={styles.heartIconContainer}
                onPress={() => toggleLike(product.id)} // Toggle like for this specific product
              >
                <Ionicons
                  name={likedProducts[product.id] ? "heart" : "heart-outline"}
                  size={24}
                  color={likedProducts[product.id] ? "red" : "#333"}
                />
              </TouchableOpacity>
            </View>
            <Link href={`./cate/${product.id}`}>
              <Text style={styles.productName}>{product.name}</Text>{" "}
              {/* Dynamic product name */}
            </Link>
            <Text style={styles.productPrice}>${product.price}</Text>{" "}
            {/* Dynamic product price */}
            <TouchableOpacity style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Buy</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productContainer: {
    flexDirection: "row", // Arrange products in a row
    flexWrap: "wrap", // Wrap products to the next line if space is insufficient
    justifyContent: "space-between", // Add space between the products
    marginBottom: 0,
    paddingHorizontal: 16,
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    width: "48%", // Ensure each product takes up roughly half of the available space
    elevation: 4,
  },
  imageContainer: {
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  heartIconContainer: {
    position: "absolute",
    top: -2,
    right: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#06213e",
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: "#ed181f",
    fontWeight: "bold",
    marginBottom: 8,
  },
  buyButton: {
    backgroundColor: "#06213e",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
  },
  buyButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Product;
