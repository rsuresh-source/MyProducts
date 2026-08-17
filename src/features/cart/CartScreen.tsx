import { useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppSelector, useAppDispatch } from '@store/hooks';
import { removeFromCart, updateQuantity } from './cartSlice';
import { QuantityStepper } from '@components/QuantityStepper';
import { PrimaryButton } from '@components/PrimaryButton';
import { HS, Radii } from '@constants/theme';
import type { Product } from '../../types/product';

interface CartLineItem {
  productId: number;
  product: Product;
  quantity: number;
}

export function CartScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { cartItems, totalQuantity, totalPrice } = useAppSelector(
    (state) => state.cart,
  );

  const handleIncrement = useCallback(
    (productId: number, currentQty: number) => {
      dispatch(updateQuantity({ productId, quantity: currentQty + 1 }));
    },
    [dispatch],
  );

  const handleDecrement = useCallback(
    (productId: number, currentQty: number) => {
      if (currentQty <= 1) {
        dispatch(removeFromCart(productId));
      } else {
        dispatch(updateQuantity({ productId, quantity: currentQty - 1 }));
      }
    },
    [dispatch],
  );

  const handleRemove = useCallback(
    (productId: number) => {
      dispatch(removeFromCart(productId));
    },
    [dispatch],
  );

  const handleStartShopping = useCallback(() => {
    router.push('/home' as never);
  }, [router]);

  const renderItem = ({ item }: { item: CartLineItem }) => (
    <View style={styles.cartItem}>
      <Image
        source={{ uri: item.product.thumbnail }}
        style={styles.cartThumb}
        resizeMode="cover"
      />
      <View style={styles.cartInfo}>
        <Text style={styles.cartName} numberOfLines={2}>
          {item.product.title}
        </Text>
        <Text style={styles.cartUnit}>${item.product.price.toFixed(2)} each</Text>
        <View style={styles.cartActions}>
          <QuantityStepper
            quantity={item.quantity}
            onIncrement={() => handleIncrement(item.productId, item.quantity)}
            onDecrement={() => handleDecrement(item.productId, item.quantity)}
          />
          <Pressable onPress={() => handleRemove(item.productId)}>
            <Text style={styles.removeBtn}>Remove</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  const isEmpty = cartItems.length === 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ── Page Header ─────────────────────────────────── */}
      <View style={styles.pageHeader}>
        <Text style={styles.pageTitle}>My Cart</Text>
        <Text style={styles.pageSubtitle}>
          {totalQuantity} {totalQuantity === 1 ? 'Item' : 'Items'}
        </Text>
      </View>

      {isEmpty ? (
        /* ── Empty State ──────────────────────────────── */
        <View style={styles.emptyState}>
          <View style={styles.emptyIconContainer}>
            <Text style={styles.emptyIcon}>🛍️</Text>
          </View>
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySub}>Browse the catalog and add your first item.</Text>
          <View style={styles.emptyBtnWrap}>
            <PrimaryButton title="Start Shopping" onPress={handleStartShopping} />
          </View>
        </View>
      ) : (
        /* ── Cart List ────────────────────────────────── */
        <FlatList
          data={cartItems.map((ci) => ({
            productId: ci.product.id,
            product: ci.product,
            quantity: ci.quantity,
          }))}
          keyExtractor={(item) => item.productId.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* ── Sticky Footer ──────────────────────────────── */}
      {!isEmpty && (
        <View style={styles.footer}>
          <View style={styles.footerTotal}>
            <Text style={styles.footerTotalLabel}>Total</Text>
            <Text style={styles.footerTotalValue}>${totalPrice.toFixed(2)}</Text>
          </View>
          <PrimaryButton title="Checkout" onPress={() => {}} style={styles.checkoutBtn} />
        </View>
      )}
    </SafeAreaView>
  );
}

/* ================================================================
   Styles — mapped 1:1 from /prototype/styles.css §9 (Cart Screen)
   ================================================================ */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: HS.canvas,
  },

  /* ── Page header ── */
  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 6,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: HS.text,
  },
  pageSubtitle: {
    fontSize: 14,
    color: HS.textMuted,
    marginTop: 3,
  },

  /* ── Cart list ── */
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 90,
  },

  /* ── Cart item ── */
  cartItem: {
    flexDirection: 'row',
    gap: 12,
    backgroundColor: HS.surface,
    borderWidth: 1,
    borderColor: HS.border,
    borderRadius: Radii.card,
    padding: 12,
    marginBottom: 12,
    shadowColor: HS.navy,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  cartThumb: {
    width: 64,
    height: 64,
    borderRadius: 10,
    backgroundColor: HS.placeholder,
  },
  cartInfo: {
    flex: 1,
    minWidth: 0,
  },
  cartName: {
    fontSize: 14,
    fontWeight: '700',
    color: HS.text,
    lineHeight: 20,
  },
  cartUnit: {
    fontSize: 12,
    color: HS.textMuted,
    marginTop: 3,
    marginBottom: 8,
  },
  cartActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  removeBtn: {
    fontSize: 13,
    fontWeight: '600',
    color: HS.danger,
  },

  /* ── Empty state ── */
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 40,
    paddingBottom: 110,
  },
  emptyIconContainer: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  emptyIcon: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: HS.text,
    marginBottom: 6,
  },
  emptySub: {
    fontSize: 13,
    color: HS.textMuted,
    textAlign: 'center',
    marginBottom: 22,
  },
  emptyBtnWrap: {
    maxWidth: 220,
    width: '100%',
  },

  /* ── Footer ── */
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: HS.surface,
    borderTopWidth: 1,
    borderTopColor: HS.border,
    shadowColor: HS.navy,
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.06,
    shadowRadius: 16,
    elevation: 10,
  },
  footerTotal: {
    marginRight: 14,
    minWidth: 78,
  },
  footerTotalLabel: {
    fontSize: 12,
    color: HS.textMuted,
  },
  footerTotalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: HS.text,
  },
  checkoutBtn: {
    flex: 1,
  },
});
