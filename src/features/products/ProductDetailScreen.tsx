import { useEffect, useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchProductById, clearActiveProduct } from './productSlice';
import { addToCart } from '../cart/cartSlice';
import { PrimaryButton } from '@components/PrimaryButton';
import { RatingBadge } from '@components/RatingBadge';
import { HS, Radii } from '@constants/theme';

interface ProductDetailScreenProps {
  productId?: string;
}

export function ProductDetailScreen({ productId }: ProductDetailScreenProps) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    activeProduct: product,
    isLoading,
    errorMessage: error,
  } = useAppSelector((state) => state.products);

  const [addedFeedback, setAddedFeedback] = useState(false);

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(Number(productId)));
    }
    return () => {
      dispatch(clearActiveProduct());
    };
  }, [productId, dispatch]);

  const handleBack = useCallback(() => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/home' as never);
    }
  }, [router]);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    dispatch(addToCart(product));
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1400);
  }, [product, dispatch]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* ── Top Nav Bar ─────────────────────────────────── */}
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.backBtn} onPress={handleBack} activeOpacity={0.7}>
          <Text style={styles.backBtnText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.navTitle} numberOfLines={1}>
          {product ? product.title : 'Product'}
        </Text>
      </View>

      {isLoading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={HS.navy} />
          <Text style={styles.loadingText}>Loading product details...</Text>
        </View>
      ) : error || !product ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorTitle}>Error</Text>
          <Text style={styles.errorMessage}>{error || 'Product not found.'}</Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => productId && dispatch(fetchProductById(Number(productId)))}>
            <Text style={styles.retryBtnText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {/* ── Hero Image ──────────────────────────────── */}
            <View style={styles.heroWrap}>
              <Image
                source={{ uri: product.images?.[0] || product.thumbnail }}
                style={styles.heroImage}
                resizeMode="cover"
              />
              <View style={styles.heroBadge}>
                <Text style={styles.heroBadgeText}>{product.category.toUpperCase()}</Text>
              </View>
            </View>

            {/* ── Product Body ────────────────────────────── */}
            <View style={styles.body}>
              {/* Brand + Rating row */}
              <View style={styles.brandRow}>
                {product.brand ? (
                  <Text style={styles.brandName}>{product.brand.toUpperCase()}</Text>
                ) : (
                  <View />
                )}
                <RatingBadge rating={product.rating} />
              </View>

              {/* Title */}
              <Text style={styles.title}>{product.title}</Text>

              {/* Price + Save pill */}
              <View style={styles.priceLine}>
                <Text style={styles.price}>${product.price.toFixed(2)}</Text>
                {product.discountPercentage > 0 ? (
                  <View style={styles.savePill}>
                    <Text style={styles.savePillText}>
                      Save {Math.round(product.discountPercentage)}%
                    </Text>
                  </View>
                ) : null}
              </View>

              {/* Description */}
              <Text style={styles.sectionTitle}>Description</Text>
              <Text style={styles.description}>{product.description}</Text>
            </View>
          </ScrollView>

          {/* ── Sticky Buy Bar ──────────────────────────── */}
          <View style={styles.buyBar}>
            <View style={styles.buyTotal}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${product.price.toFixed(2)}</Text>
            </View>
            <PrimaryButton
              title={addedFeedback ? 'Added ✓' : 'Add to Cart'}
              onPress={handleAddToCart}
              disabled={addedFeedback}
              style={styles.buyBtn}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

/* ================================================================
   Styles — mapped 1:1 from /prototype/styles.css §8 (Detail Screen)
   ================================================================ */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: HS.canvas,
  },

  /* ── Nav bar ── */
  navBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: HS.canvas,
  },
  backBtn: {
    paddingVertical: 7,
    paddingHorizontal: 14,
    backgroundColor: HS.surface,
    borderWidth: 1,
    borderColor: HS.border,
    borderRadius: Radii.pill,
    shadowColor: HS.navy,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
  },
  backBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: HS.text,
  },
  navTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: HS.text,
    marginHorizontal: 10,
  },

  /* ── Container / Scroll ── */
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },

  /* ── Hero image ── */
  heroWrap: {
    position: 'relative',
    backgroundColor: HS.placeholder,
  },
  heroImage: {
    width: '100%',
    height: 280,
  },
  heroBadge: {
    position: 'absolute',
    top: 12,
    left: 16,
    paddingVertical: 5,
    paddingHorizontal: 12,
    backgroundColor: HS.navy,
    borderRadius: Radii.pill,
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },

  /* ── Body ── */
  body: {
    padding: 20,
    paddingBottom: 110,
    backgroundColor: HS.canvas,
  },
  brandRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  brandName: {
    fontSize: 13,
    fontWeight: '800',
    color: HS.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: HS.text,
    marginBottom: 10,
  },
  priceLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  price: {
    fontSize: 24,
    fontWeight: '800',
    color: HS.text,
    marginRight: 12,
  },
  savePill: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    backgroundColor: HS.greenBg,
    borderRadius: Radii.pill,
  },
  savePillText: {
    color: HS.greenText,
    fontSize: 11,
    fontWeight: '700',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: HS.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 23,
    color: HS.textMuted,
  },

  /* ── Buy bar ── */
  buyBar: {
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
  buyTotal: {
    marginRight: 14,
    minWidth: 78,
  },
  totalLabel: {
    fontSize: 12,
    color: HS.textMuted,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: HS.text,
  },
  buyBtn: {
    flex: 1,
  },

  /* ── Loading / Error ── */
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: HS.textMuted,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#991B1B',
    marginBottom: 8,
  },
  errorMessage: {
    fontSize: 14,
    color: HS.textMuted,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryBtn: {
    backgroundColor: HS.navy,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: Radii.field,
  },
  retryBtnText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
