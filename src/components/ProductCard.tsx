import React from 'react';
import { View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import styles from '../screens/ProductListScreen.style';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

interface Props {
  item: any;
  quantity: number;
  onIncrease: (item: any) => void;
  onDecrease: (id: number) => void;
}

const ProductCard: React.FC<Props> = ({
  item,
  quantity,
  onIncrease,
  onDecrease,
}) => {
  const discountedPrice =
    item.price - (item.price * item.discountPercentage) / 100;

  return (
    <View style={[styles.card, { width: CARD_WIDTH }]}>
      {item.thumbnail && (
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.productImage}
          resizeMode="cover"
        />
      )}

      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>

      <Text style={styles.brand}>{item.brand}</Text>

      <View style={styles.priceRow}>
        <Text style={styles.price}>₹ {discountedPrice.toFixed(0)}</Text>
        {item.discountPercentage > 0 && (
          <Text style={styles.oldPrice}>₹ {item.price}</Text>
        )}
      </View>

      <Text style={styles.rating}>⭐ {item.rating}</Text>

      {quantity > 0 ? (
        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => onDecrease(item.id)}
          >
            <Text style={styles.qtyButtonText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.qtyText}>{quantity}</Text>

          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => onIncrease(item)}
          >
            <Text style={styles.qtyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => onIncrease(item)}
        >
          <Text style={styles.addButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProductCard;
