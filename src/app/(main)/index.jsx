import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useState, useEffect, useRef } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  View,
  Keyboard
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Card, Searchbar } from 'react-native-paper';
import { COLORS } from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { styles } from './ProductList.styles';

const EmptyProductList = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyText}>No products found.</Text>
  </View>
);

export default function ProductListScreen() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const searchbarRef = useRef(null);

  useEffect(() => {
    const subscriber = firestore()
      .collection('companies/sk-hardwares/products')
      .onSnapshot(querySnapshot => {
        const productsData = querySnapshot.docs.map(documentSnapshot => ({
          id: documentSnapshot.id,
          ...documentSnapshot.data(),
        }));
        setProducts(productsData);
        setFilteredProducts(productsData);
        if (loading) setLoading(false);
      });

    return () => subscriber();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  // Effect to filter products whenever searchQuery changes
  useEffect(() => {
    setIsSearching(true);
    if (searchQuery === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }

    setTimeout(() => {
      setIsSearching(false);
    }, 100);
  }, [searchQuery, products]);

  // This effect listens for when the keyboard hides
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        // When the keyboard hides, unfocus the searchbar
        if (searchbarRef.current) {
          searchbarRef.current.blur();
        }
      }
    );

    // Cleanup the listener when the component unmounts
    return () => {
      keyboardDidHideListener.remove();
    };
  }, []);


  const handleSignOut = async () => {
    try {
      await auth().signOut();
    } catch (error) {
      console.error('Sign out error', error);
    }
  };

  const renderProductItem = ({ item, index }) => (
    <Card style={styles.card}>

      <Card.Content>
        <View style={styles.productNameContainer}>
          <Text style={styles.itemNumber}>{index + 1}</Text>
          <Text style={styles.productName}>{item.name}</Text>
        </View>

        <View style={styles.priceRow}>
          <View style={styles.priceItem}>
            <Text style={styles.priceLabel}>BUYING</Text>
            <Text style={styles.priceValue}>
              <Text style={styles.rupee}>₹</Text>
              {item.buyingPrice}
              <Text style={styles.priceUnit}>/{item.buyingUnit}</Text>
            </Text>
          </View>
          <View style={styles.priceItem}>
            <Text style={styles.priceLabel}>SELLING</Text>
            <Text style={[styles.priceValue, styles.sellingPrice]}>
              <Text style={styles.rupee}>₹</Text>
              {item.sellingPrice}
              <Text style={styles.priceUnit}>/{item.sellingUnit}</Text>
            </Text>
          </View>
          {item.image && (
            <Image source={{ uri: item.image }} style={styles.image} />
          )}
        </View>

        <View style={styles.buttomArea}>
          <View>
            <View style={styles.infoRow}>
              <Ionicons name="location-outline" size={14} color={COLORS.gray} />
              <Text style={styles.infoText}>{item.buyingPoint}</Text>
            </View>
            <View style={styles.infoRow}>
              <Ionicons name="calendar-outline" size={14} color={COLORS.gray} />
              <Text style={styles.infoText}>{item.date}</Text>
            </View>
          </View>
          <Button mode="contained" textColor={COLORS.background} >
            View Details
          </Button>
        </View>


        {item.priceInfo && (
          <View style={styles.infoRow}>
            <Ionicons name="information-circle-outline" size={14} color={COLORS.gray} />
            <Text style={styles.infoText}>{item.priceInfo}</Text>
          </View>
        )}

      </Card.Content>
    </Card>
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
        <Text style={styles.title}>Products</Text>
        <Button mode="outlined" onPress={handleSignOut} textColor={COLORS.primary}>
          Sign Out
        </Button>
      </View>

      <Searchbar
        placeholder="Search by name..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchbar}
        autoFocus={false}
        ref={searchbarRef}
      />
      {isSearching ? (
        <ActivityIndicator style={styles.searchIndicator} size="30%" color={COLORS.primary} />
      ) : (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={EmptyProductList}
        />)}
    </SafeAreaView>
  );
}