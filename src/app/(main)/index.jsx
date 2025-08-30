import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button } from 'react-native-paper';
import { COLORS } from '../../constants/colors';
import { auth, db } from '../../firebase/config';

export default function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    // onSnapshot creates a real-time listener for the products collection
    const unsubscribe = onSnapshot(collection(db, 'products'), snapshot => {
      const productsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      // No navigation needed, the root App.tsx component will handle the redirect
    } catch (error) {
      console.error('Sign out error', error);
    }
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.productItem}>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Products</Text>
        <Button
          mode="outlined"
          onPress={handleSignOut}
          textColor={COLORS.primary}
        >
          Sign Out
        </Button>
      </View>

      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={EmptyProductList}
      />
    </View>
  );
}

// Moved outside ProductListScreen to avoid inline component definition
function EmptyProductList() {
  return (
    <Text style={styles.emptyText}>You have no products yet.</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  productItem: {
    backgroundColor: COLORS.surface,
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  productName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  productPrice: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: COLORS.primary,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
