import React from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './OrderSuccessScreen.style';

const { width } = Dimensions.get('window');

export default function OrderSuccessScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Success Image */}
        <Image
          source={require('../assets/order-placed.png')}
          style={styles.image}
          resizeMode="contain"
        />

        {/* Success Message */}
        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.subtitle}>
          Thank you for your purchase. Your order has been placed and is being
          processed.
        </Text>

        {/* Go to Products Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Products')}
        >
          <Text style={styles.buttonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
