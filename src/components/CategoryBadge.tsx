import React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import { HS, Radii } from '@constants/theme';

interface CategoryBadgeProps {
  label: string;
  style?: ViewStyle;
}

export function CategoryBadge({ label, style }: CategoryBadgeProps) {
  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    backgroundColor: HS.navy,
    borderRadius: Radii.pill,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
});
