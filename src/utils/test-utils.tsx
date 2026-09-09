import type { ReactElement, ReactNode } from 'react';
import { render, type RenderResult } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import type { RootState } from '../store/store';
import { authReducer } from '../features/auth/authSlice';
import { productReducer } from '../features/products/productSlice';
import { cartReducer } from '../features/cart/cartSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
});

interface RenderWithProvidersOptions {
  preloadedState?: Partial<RootState>;
}

function buildStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as never,
  });
}

type TestStore = ReturnType<typeof buildStore>;

interface RenderWithProvidersResult extends RenderResult {
  store: TestStore;
}

export async function renderWithProviders(
  ui: ReactElement,
  { preloadedState }: RenderWithProvidersOptions = {}
): Promise<RenderWithProvidersResult> {
  const store = buildStore(preloadedState);

  const wrapper = ({ children }: { children: ReactNode }): ReactElement => (
    <Provider store={store}>{children}</Provider>
  );

  const result = await render(ui, { wrapper });

  return { ...result, store };
}

export type { TestStore };
