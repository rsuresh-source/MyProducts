import React from 'react';
import { Pressable, Text, View, StyleSheet, ViewStyle } from 'react-native';
import { HS, Radii } from '@constants/theme';

interface QuantityStepperProps {
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
  style?: ViewStyle;
}

export function QuantityStepper({
  quantity,
  onIncrement,
  onDecrement,
  style,
}: QuantityStepperProps) {
  return (
    <View style={[styles.row, style]}>
      <Pressable style={styles.btn} onPress={onDecrement}>
        <Text style={styles.btnText}>−</Text>
      </Pressable>
      <Text style={styles.value}>{quantity}</Text>
      <Pressable style={styles.btn} onPress={onIncrement}>
        <Text style={styles.btnText}>+</Text>
      </Pressable>
    </View>
  );
}

/* Mapped from /prototype/styles.css §9 — .qty-row, .qty-btn, .qty-value */
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: HS.canvas,
    borderWidth: 1,
    borderColor: HS.border,
    borderRadius: Radii.pill,
    paddingVertical: 3,
    paddingHorizontal: 4,
  },
  btn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: HS.surface,
    borderWidth: 1,
    borderColor: HS.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    fontWeight: '700',
    color: HS.text,
    lineHeight: 20,
  },
  value: {
    fontSize: 13,
    fontWeight: '700',
    color: HS.text,
    minWidth: 16,
    textAlign: 'center',
    marginHorizontal: 10,
  },
});
