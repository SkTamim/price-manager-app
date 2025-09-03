import { useNavigation } from '@react-navigation/native';
import { signOut } from '@react-native-firebase/auth'; // Modular import
import { collection, onSnapshot } from '@react-native-firebase/firestore'; // Modular import
import React, { useState, useEffect } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from 'react-native-paper';
import { COLORS } from '../../constants/colors';
import { authInstance, db } from '../../firebase/config'; // Import instances

const EmptyProductList = () => (
  <Text style={styles.emptyText}>You have no products yet.</Text>
);

export default function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Modular syntax for creating a query and listener
    const productsQuery = collection(db, 'products');
    const subscriber = onSnapshot(productsQuery, querySnapshot => {
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(productsData);
      if (loading) setLoading(false);
    });

    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSignOut = async () => {
    try {
      // Modular syntax for signing out
      await signOut(authInstance);
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
    <SafeAreaView style={styles.container}>
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
    </SafeAreaView>
  );
}

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
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