// LoginScreen.js
import { Link, router, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { loginUser } from "../api/Auth"; // Nhập hàm đăng nhập từ authService

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Thông báo đăng nhập
  const [error, setError] = useState(""); // Thông báo lỗi
  const router = useRouter();
  // Hàm xử lý đăng nhập
  const handleLogin = async () => {
    if (email && password) {
      try {
        const data = await loginUser(email, password); // Gọi hàm đăng nhập
        setMessage(data.message); // Cập nhật thông báo thành công
        setError(""); // Xóa thông báo lỗi
        router.push("/(tabs)/");
      } catch {
        setMessage(""); // Xóa thông báo thành công nếu có lỗi
      }
    } else {
      setError("Vui lòng điền đầy đủ thông tin!"); // Thông báo khi thiếu trường
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo1.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Đăng Nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Hiển thị thông báo nếu có */}
      {message && <Text style={styles.message}>{message}</Text>}
      {error && <Text style={styles.errorMessage}>{error}</Text>}

      {/* Điều hướng sang màn hình đăng ký */}
      <TouchableOpacity style={styles.loginRedirect}>
        <Link href="/(tabs)/register">
          <Text style={styles.loginText}>Chưa có tài khoản? Đăng Kí</Text>
        </Link>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#f0f4f8",
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center",
    marginBottom: -30,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 16,
    color: "#06213e",
  },
  input: {
    height: 50,
    width: 300,
    alignSelf: "center",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  button: {
    height: 50,
    backgroundColor: "#06213e",
    borderRadius: 8,
    width: 180,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  message: {
    fontSize: 16,
    color: "green",
    textAlign: "center",
    marginBottom: 16,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 16,
  },
  loginRedirect: {
    alignItems: "center",
  },
  loginText: {
    color: "#06213e",
    fontSize: 16,
    fontWeight: "500",
  },
});
