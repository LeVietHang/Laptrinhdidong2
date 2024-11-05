import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function RegisterScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(""); // Trạng thái đăng ký
  const router = useRouter();
  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:8000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          password_confirmation: confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Đăng ký thành công"); // Hiển thị thông báo thành công

        router.push("/(tabs)/signin");
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to register");
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo1.png")}
        style={styles.logo}
      />

      <Text style={styles.title}>Đăng Kí</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        keyboardType="default"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#aaa"
      />

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
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        placeholderTextColor="#aaa"
      />

      {/* Nút đăng ký */}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      {/* Hiển thị thông báo */}
      {message ? <Text style={styles.message}>{message}</Text> : null}

      <TouchableOpacity style={styles.loginRedirect}>
        <Link href="/(tabs)/signin">
          <Text style={styles.loginText}>Bạn đã có tài khoản? Đăng nhập</Text>
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
    marginBottom: 12,
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
  loginRedirect: {
    alignItems: "center",
  },
  loginText: {
    color: "#06213e",
    fontSize: 16,
    fontWeight: "500",
  },
});
