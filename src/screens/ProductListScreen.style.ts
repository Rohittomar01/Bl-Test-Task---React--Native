import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../utils/colors';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 40) / 2;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    // elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  cartButton: {
    backgroundColor: '#57c831ff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 3,
    paddingBottom: 20,
  },
  productImage: {
    width: CARD_WIDTH - 20,
    height: 120,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 3,
    textAlign: 'center',
  },
  brand: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#62a92fff',
    marginRight: 5,
  },
  oldPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
  },
  rating: {
    fontSize: 12,
    color: '#444',
    marginBottom: 10,
  },
  addButton: {
    backgroundColor: Colors.appColor,
    paddingVertical: 6,
    paddingHorizontal: 35,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 10,
  },
  qtyButton: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 22,
    paddingVertical: 5,
    borderRadius: 6,
  },
  qtyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  qtyText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});
