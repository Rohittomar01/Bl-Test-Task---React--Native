import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { clearCart } from '../redux/slices/cartSlice';
import CartItem from '../components/CartItem';
import styles from './CartScreen.style';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function CartScreen({ navigation }: any) {
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();

  const DELIVERY_CHARGE = 0;
  const HANDLING_CHARGE = 0;

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const finalAmount = Math.floor(
    totalAmount + DELIVERY_CHARGE + HANDLING_CHARGE,
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={{ width: 24 }} /> {/* Placeholder for alignment */}
      </View>

      {cart.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty 😔</Text>
          <TouchableOpacity
            style={styles.navigateButton}
            onPress={() => navigation.navigate('Products')}
          >
            <Text style={styles.navigateButtonText}>Go to Products</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          {/* Cart Items Card */}
          <View style={[styles.cartCard, { flex: 1 }]}>
            <Text style={styles.cardTitle}>Your Items</Text>
            <FlatList
              data={cart}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => <CartItem item={item} />}
              contentContainerStyle={{ paddingBottom: 10 }}
            />
          </View>

          {/* Payment Summary Card */}
          <View style={styles.paymentCard}>
            <Text style={styles.cardTitle}>Payment Summary</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Subtotal</Text>
              <Text style={styles.value}>₹ {Math.floor(totalAmount)}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Delivery Charge</Text>
              <Text style={styles.value}>₹ {DELIVERY_CHARGE}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Handling Charge</Text>
              <Text style={styles.value}>₹ {HANDLING_CHARGE}</Text>
            </View>
            <View style={[styles.row, { marginTop: 10 }]}>
              <Text style={[styles.label, { fontWeight: '700' }]}>
                Total Payable
              </Text>
              <Text style={[styles.value, { fontWeight: '700' }]}>
                ₹ {finalAmount}
              </Text>
            </View>

            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => {
                dispatch(clearCart()); // Clear the cart
                navigation.replace('OrderSuccess'); // Navigate to success screen
              }}
            >
              <Text style={styles.checkoutButtonText}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}
