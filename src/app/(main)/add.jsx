import { collection, addDoc } from '@react-native-firebase/firestore'; // Modular import
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { COLORS } from '../../constants/colors';
import { db } from '../../firebase/config'; // Import db instance
import { useFeedback } from '../../context/FeedbackContext';

export default function AddProductScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const { showSnackbar } = useFeedback();

  const handleAddProduct = async () => {
    if (!name || !price) {
      showSnackbar('Please fill in all fields.', { error: true });
      return;
    }
    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice)) {
      showSnackbar('Please enter a valid price.', { error: true });
      return;
    }

    setLoading(true);
    try {
      // Modular syntax for adding a document
      const productsCollection = collection(db, 'products');
      await addDoc(productsCollection, {
        name: name,
        price: parsedPrice,
      });
      showSnackbar('Product added successfully!');
      setName('');
      setPrice('');
    } catch (error) {
      showSnackbar('Failed to add product.', { error: true });
      console.error('Add product error', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardView}
        >
          <Text style={styles.title}>Add New Product</Text>
          <TextInput
            label="Product Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
            theme={theme}
          />
          <TextInput
            label="Price"
            value={price}
            onChangeText={setPrice}
            mode="outlined"
            style={styles.input}
            theme={theme}
            keyboardType="numeric"
          />
          <Button
            mode="contained"
            onPress={handleAddProduct}
            loading={loading}
            disabled={loading}
            style={styles.button}
            labelStyle={styles.buttonLabel}
          >
            {loading ? 'Adding...' : 'Add Product'}
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  keyboardView: {
    width: '100%',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 6,
    marginTop: 8,
  },
  buttonLabel: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
});