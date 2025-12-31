import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { addToCart, decreaseQty } from '../redux/slices/cartSlice';
import { logout } from '../redux/slices/authSlice';
import { RootState } from '../redux/store';
import styles from './ProductListScreen.style';
import { Colors } from '../utils/colors';
import ProductCard from '../components/ProductCard';
import { clearCurrentUser } from '../utils/storage';

const PAGE_SIZE = 10;
const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

const ProductListScreen = ({ navigation }: any) => {
  const [products, setProducts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);

  const dispatch = useDispatch();

  // 🔐 Redux States
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    fetchProducts(false);
  }, [page]);

  const fetchProducts = async (isRefresh: boolean) => {
    try {
      isRefresh ? setRefreshing(true) : setLoading(true);

      const res = await axios.get('https://dummyjson.com/products');

      setTotalProducts(res.data.products.length);

      const slicedData = res.data.products.slice(0, page * PAGE_SIZE);
      setProducts(slicedData);
    } catch (error) {
      console.log('Fetch products error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  /* ================= LOGOUT ================= */
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await clearCurrentUser();
            dispatch(logout()); // 🔥 Clear Redux auth
          },
        },
      ],
      { cancelable: true },
    );
  };

  /* ================= CART ================= */
  const handleIncrease = (product: any) => {
    dispatch(
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: 1,
        thumbnail: product.thumbnail,
        brand: product.brand,
      }),
    );
  };

  const handleDecrease = (productId: number) => {
    dispatch(decreaseQty(productId));
  };

  const getCartQuantity = (productId: number) => {
    const item = cartItems.find(i => i.id === productId);
    return item ? item.quantity : 0;
  };

  const totalCartQuantity = cartItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  /* ================= RENDER ================= */
  const renderItem = ({ item }: any) => {
    const quantity = getCartQuantity(item.id);

    return (
      <ProductCard
        item={item}
        quantity={quantity}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
      />
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f7f7f7' }}>
      <View style={styles.container}>
        {/* ================= HEADER ================= */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            Hi, {user?.name || user?.identifier || 'User'}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 15 }}>
            {/* Cart Icon */}
            <TouchableOpacity
              style={{ position: 'relative' }}
              onPress={() => navigation.navigate('Cart')}
            >
              <Ionicons name="cart-outline" size={28} color="#333" />
              {totalCartQuantity > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    top: -5,
                    right: -10,
                    backgroundColor: Colors.secondary,
                    borderRadius: 10,
                    width: 20,
                    height: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    {totalCartQuantity}
                  </Text>
                </View>
              )}
            </TouchableOpacity>

            {/* Logout Icon */}
            <TouchableOpacity onPress={handleLogout}>
              <Ionicons name="log-out-outline" size={26} color="#e53935" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ================= PRODUCT GRID ================= */}
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={{
            paddingHorizontal: 10,
            paddingBottom: 20,
          }}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginBottom: 15,
            marginTop: 10,
          }}
          onEndReached={() => {
            if (products.length < totalProducts) {
              setPage(prev => prev + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          refreshing={refreshing}
          onRefresh={() => {
            setPage(1);
            fetchProducts(true);
          }}
          ListFooterComponent={() => {
            if (loading) {
              return <ActivityIndicator size="small" color="#000" />;
            }
            if (products.length >= totalProducts) {
              return (
                <Text
                  style={{
                    textAlign: 'center',
                    marginVertical: 15,
                    color: '#888',
                  }}
                >
                  No more data
                </Text>
              );
            }
            return null;
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductListScreen;
