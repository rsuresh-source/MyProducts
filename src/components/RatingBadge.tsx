import React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import { HS, Radii } from '@constants/theme';

interface RatingBadgeProps {
  rating: number;
  style?: ViewStyle;
}

export function RatingBadge({ rating, style }: RatingBadgeProps) {
  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.star}>★</Text>
      <Text style={styles.text}>{rating.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: HS.amberBg,
    borderRadius: Radii.pill,
  },
  star: {
    color: HS.amberText,
    fontSize: 12,
    marginRight: 4,
  },
  text: {
    color: HS.navy,
    fontSize: 12,
    fontWeight: '700',
  },
});
