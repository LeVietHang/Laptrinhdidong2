import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { router, useRouter } from "expo-router";

export default function IntroScreen() {
  const navigation = useNavigation();
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/(tabs)/signin"); 
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/logo1.png")} // Thay bằng đường dẫn đến hình ảnh của bạn
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.title}>Chào mừng đến với DINO </Text>
      <Text style={styles.subtitle}>
      Khám phá những sản phẩm và trải nghiệm tuyệt vời nhất. Hãy bắt đầu hành trình ngay thôi!
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
        <Text style={styles.buttonText}>Bắt Đầu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#06213e",
    textAlign: "center",
    marginBottom: 15,
    top:-25,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    top:-25,
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#06213e",
    paddingVertical: 15,
    paddingHorizontal: 40,
    top:-25,
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
