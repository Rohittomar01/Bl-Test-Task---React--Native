import React from 'react';
import { View, Button, Text } from 'react-native';

export default function CheckoutScreen({ navigation }: any) {
  return (
    <View>
      <Text>Payment Method: Cash on Delivery</Text>
      <Button
        title="Place Order"
        onPress={() => navigation.replace('OrderSuccess')}
      />
    </View>
  );
}
