import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants/colors';

export const styles = StyleSheet.create({
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
    color: COLORS.text,
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    marginVertical: 8,
    backgroundColor: COLORS.surface,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F3F4F6',
    paddingVertical: 8,
    alignItems: 'center',
  },
  priceItem: {
    flex: 1,
  },
  priceLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: COLORS.gray,
    marginBottom: 2,
  },
  priceValue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: COLORS.danger,
    alignItems: 'center',
  },
  sellingPrice: {
    color: COLORS.success,
  },
  priceUnit: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.gray,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  infoText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.gray,
    marginLeft: 8,
    marginRight: 3,
    flexWrap: 'wrap',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: COLORS.gray,
    fontFamily: 'Poppins-Regular',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  itemNumber: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: COLORS.primary,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    borderRadius: 25,
    width: 30,
    height: 30,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginRight: 12,
    lineHeight: 1,
  },
  productName: {
    fontFamily: 'HindSiliguri-SemiBold',
    fontSize: 20,
    color: COLORS.text,
    flex: 1,
  },
  productNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rupee: {
    fontFamily: 'Arial',
    fontWeight: '700',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  buttomArea: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
