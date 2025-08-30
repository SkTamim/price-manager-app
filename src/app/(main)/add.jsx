import { useNavigation } from '@react-navigation/native';
import { addDoc, collection } from 'firebase/firestore';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, TextInput, useTheme } from 'react-native-paper';
import { COLORS } from '../../constants/colors';
import { db } from '../../firebase/config';
import { useFeedback } from '../../context/FeedbackContext';

export default function AddProductScreen() {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme();
  const { showSnackbar } = useFeedback();

  const inputTheme = { ...theme, roundness: 30 };

  const handleAddProduct = async () => {
    if (!name || !price) {
      showSnackbar('Please fill in both fields.', { error: true });
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'products'), {
        name: name,
        price: parseFloat(price),
      });
      showSnackbar('Product added successfully!');
      setName('');
      setPrice('');
      navigation.navigate('Products');
    } catch (error) {
      console.error('Error adding product: ', error);
      showSnackbar('Could not add product.', { error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>Add New Product</Text>

          <TextInput
            label="Product Name"
            value={name}
            onChangeText={setName}
            mode="outlined"
            style={styles.input}
            theme={inputTheme}
          />
          <TextInput
            label="Product Price"
            value={price}
            onChangeText={setPrice}
            mode="outlined"
            style={styles.input}
            theme={inputTheme}
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
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  formContainer: {
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
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
