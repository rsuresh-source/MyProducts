import React from 'react';
import { useLocalSearchParams } from 'expo-router';
import { ProductDetailScreen } from '../../../../features/products/ProductDetailScreen';

export default function DetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <ProductDetailScreen productId={id} />;
}
