import React from 'react';
import { Text, View, StyleSheet, ViewStyle } from 'react-native';
import { HS, Radii } from '@constants/theme';

interface DiscountPillProps {
  label: string;
  style?: ViewStyle;
}

export function DiscountPill({ label, style }: DiscountPillProps) {
  return (
    <View style={[styles.pill, style]}>
      <Text style={styles.text}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    backgroundColor: HS.greenBg,
    borderRadius: Radii.pill,
    alignSelf: 'flex-start',
  },
  text: {
    color: HS.greenText,
    fontSize: 11,
    fontWeight: '700',
  },
});
