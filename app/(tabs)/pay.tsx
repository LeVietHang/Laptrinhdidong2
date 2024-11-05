import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const paymentMethods = [
  { id: 1, name: "VISA", image: require("../../assets/images/1.png") },
  { id: 2, name: "MasterCard", image: require("../../assets/images/2.png") },
  { id: 3, name: "PayPal", image: require("../../assets/images/3.png") },
  { id: 4, name: "Stripe", image: require("../../assets/images/4.png") },
];

export default function PaymentScreen() {
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [selectedMethod, setSelectedMethod] = useState(paymentMethods[0]);

  const handleAddCard = () => {
    // Handle add card functionality
    console.log("Card Added:", {
      nameOnCard,
      cardNumber,
      expirationDate,
      cvc,
      selectedMethod,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Payment Method</Text>
      <View style={styles.methodContainer}>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.methodButton,
              selectedMethod.id === method.id && styles.selectedMethodButton,
            ]}
            onPress={() => setSelectedMethod(method)}
          >
            <Image source={method.image} style={styles.methodImage} />
            <Text style={styles.methodText}>{method.name}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Name on Card"
        value={nameOnCard}
        onChangeText={setNameOnCard}
      />
      <TextInput
        style={styles.input}
        placeholder="Card Number"
        value={cardNumber}
        onChangeText={setCardNumber}
        keyboardType="numeric"
      />
      <View style={styles.expiryCvcContainer}>
        <TextInput
          style={[styles.input, styles.expiryInput]}
          placeholder="Expiration Date (MM/YY)"
          value={expirationDate}
          onChangeText={setExpirationDate}
        />
        <TextInput
          style={[styles.input, styles.cvcInput]}
          placeholder="CVC"
          value={cvc}
          onChangeText={setCvc}
          keyboardType="numeric"
        />
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
        <Text style={styles.addButtonText}>Add Card</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f0f4f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  methodContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  methodButton: {
    alignItems: "center",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#e0e0e0",
    width: "20%",
  },
  selectedMethodButton: {
    backgroundColor: "#00000",
  },
  methodImage: {
    width: 40,
    height: 40,
    marginBottom: 5,
  },
  methodText: {
    fontSize: 14,
    color: "#333",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  expiryCvcContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  expiryInput: {
    width: "70%",
    marginRight: 10,
  },
  cvcInput: {
    width: "30%",
  },
  addButton: {
    backgroundColor: "#06213e",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
