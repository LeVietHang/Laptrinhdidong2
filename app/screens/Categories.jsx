import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  View,
  Dimensions,
  ActivityIndicator,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons"; // Import Ionicons
import { fetchCategories } from "../api/categories"; // Đảm bảo đường dẫn này là chính xác

const { width: windowWidth } = Dimensions.get("window");

const categories = () => {
  const [categories, setCategories] = useState([]); // Khởi tạo mảng categories
  const [loadingCategories, setLoadingCategories] = useState(true);

  // Load categories
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        if (Array.isArray(categoriesData)) {
          setCategories(categoriesData);
        } else {
          console.error("Categories data is not an array");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingCategories(false);
      }
    };
    loadCategories();
  }, []);

  return (
    <View>
      {/* categories Section */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriecategoriesSection}
      >
        <TouchableOpacity style={styles.categoriecategoriesButton}>
          <Text style={styles.categoriecategoriesButtonText}>ALL</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.categoriecategoriesButton}>
          <Text style={styles.categoriecategoriesButtonText}>ÁO</Text>
        </TouchableOpacity> */}
        

        {categories.map((categoriecategories) => (
          <TouchableOpacity
            key={categoriecategories.id}
            style={styles.categoriecategoriesButton}
          >
           
            <Text style={styles.categoriecategoriesButtonText}>
              {categoriecategories.NAME}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* {loadingCategories ? (
        <ActivityIndicator size="large" color="#FF4081" />
      ) : (
        <View style={styles.categoriesContainer}>
          {categories.map((categoriecategories) => (
            <View
              key={categoriecategories.id}
              style={styles.categoriecategoriesCard}
            >
              <Image
                source={{
                  uri: `http://127.0.0.1:8000/images/categories/${categoriecategories.image}`,
                }}
                style={styles.categoriecategoriesImage}
              />
              <Text style={styles.categoriecategoriesName}>
                {categoriecategories.name}
              </Text>
            </View>
          ))}
        </View>
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  categoriecategoriesSection: {
    flexDirection: "row",
  },
  categoriecategoriesButton: {
    backgroundColor: "#06213e",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    marginRight: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  categoriecategoriesIcon: {
    marginRight: 6,
  },
  categoriecategoriesButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  categoriecategoriesCard: {
    width: windowWidth / 2 - 20,
    margin: 10,
    alignItems: "center",
  },
  categoriecategoriesImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
  },
  categoriecategoriesName: {
    marginTop: 5,
    fontWeight: "bold",
  },
});

export default categories;
