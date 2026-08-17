import React from 'react';
import { Stack } from 'expo-router';

export default function HomeStackLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="index" options={{ title: 'Products' }} />
      <Stack.Screen name="detail/[id]" options={{ title: 'Product Details' }} />
    </Stack>
  );
}
