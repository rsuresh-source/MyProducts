import { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchProducts } from './productSlice';
import { logout } from '../auth/authSlice';
import { RatingBadge } from '@components/RatingBadge';
import { DiscountPill } from '@components/DiscountPill';
import { HS, Radii } from '@constants/theme';
import type { Product } from '../../types/product';

export function HomeScreen() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { items: products, isLoading, errorMessage: error } = useAppSelector(
    (state) => state.products,
  );
  const user = useAppSelector((state) => state.auth.user);

  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    dispatch(fetchProducts()).finally(() => setIsRefreshing(false));
  }, [dispatch]);

  const handleSelectProduct = useCallback(
    (id: number) => {
      router.push(`/home/detail/${id}` as never);
    },
    [router],
  );

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const renderProductCard = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleSelectProduct(item.id)}
      activeOpacity={0.8}>
      {/* Thumbnail with floating category badge */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: item.thumbnail }}
          style={styles.thumbnail}
          resizeMode="cover"
        />
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryBadgeText}>{item.category}</Text>
        </View>
      </View>

      {/* Card info body */}
      <View style={styles.cardInfo}>
        <Text style={styles.productTitle} numberOfLines={2}>
          {item.title}
        </Text>

        {/* Rating + Price row */}
        <View style={styles.productMeta}>
          <RatingBadge rating={item.rating} />
          <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
        </View>

        {/* Discount pill */}
        {item.discountPercentage > 0 ? (
          <DiscountPill label={`-${Math.round(item.discountPercentage)}%`} />
        ) : null}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.safeArea}>
      {/* ── Header ─────────────────────────────────────── */}
      <View style={styles.header}>
        <View style={styles.headerTitleRow}>
          <View>
            <Text style={styles.headerTitle}>Explore Products</Text>
            <Text style={styles.headerGreeting}>
              Hello, {user?.firstName ?? 'Guest'}
            </Text>
          </View>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* ── Content ────────────────────────────────────── */}
      {isLoading && !isRefreshing ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={HS.navy} />
          <Text style={styles.loadingText}>Fetching product catalog...</Text>
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorTitle}>Oops! Something went wrong</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => dispatch(fetchProducts())}>
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderProductCard}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={handleRefresh}
              tintColor={HS.navy}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products available.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

/* ================================================================
   Styles — mapped 1:1 from /prototype/styles.css §7 (Home Screen)
   ================================================================ */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: HS.canvas,
  },

  /* Header */
  header: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 14,
    backgroundColor: HS.canvas,
  },
  headerTitleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: HS.text,
  },
  headerGreeting: {
    fontSize: 14,
    color: HS.textMuted,
    marginTop: 4,
  },
  logoutButton: {
    paddingVertical: 9,
    paddingHorizontal: 18,
    backgroundColor: HS.surface,
    borderWidth: 1,
    borderColor: HS.border,
    borderRadius: Radii.pill,
  },
  logoutButtonText: {
    color: HS.navy,
    fontSize: 13,
    fontWeight: '700',
  },

  /* Product grid */
  listContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 90,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 14,
  },

  /* Product card */
  card: {
    width: '48%',
    backgroundColor: HS.surface,
    borderRadius: Radii.card,
    borderWidth: 1,
    borderColor: HS.border,
    overflow: 'hidden',
    shadowColor: HS.navy,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },

  /* Thumbnail */
  imageContainer: {
    height: 118,
    backgroundColor: HS.placeholder,
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: HS.navy,
    borderRadius: Radii.pill,
  },
  categoryBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },

  /* Card info */
  cardInfo: {
    padding: 12,
  },
  productTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: HS.text,
    lineHeight: 20,
    minHeight: 39,
    marginBottom: 10,
  },
  productMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '800',
    color: HS.text,
  },

  /* Loading / Error / Empty */
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
  retryButton: {
    backgroundColor: HS.navy,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: Radii.field,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    color: HS.textMuted,
    fontSize: 15,
  },
});
