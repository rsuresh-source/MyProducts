import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { apiClient } from '../../services/apiClient';
import type { Product, ProductsResponse } from '../../types/product';
import type { RootState } from '../../store/store';

interface ProductState {
  items: Product[];
  activeProduct: Product | null;
  isLoading: boolean;
  errorMessage: string | null;
}

const initialState: ProductState = {
  items: [],
  activeProduct: null,
  isLoading: false,
  errorMessage: null,
};

export const fetchProducts = createAsyncThunk<Product[], void, { state: RootState }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<ProductsResponse>('/products', {
        params: { limit: 30 },
      });
      return response.data.products;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to load products.'
      );
    }
  }
);

export const fetchProductById = createAsyncThunk<Product, number | string, { state: RootState }>(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.get<Product>(`/products/${id}`);
      return response.data;
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      return rejectWithValue(
        err.response?.data?.message || err.message || 'Failed to load product details.'
      );
    }
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearActiveProduct(state) {
      state.activeProduct = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = (action.payload as string) ?? 'Failed to load products.';
      })
      .addCase(fetchProductById.pending, (state) => {
        state.isLoading = true;
        state.errorMessage = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action: PayloadAction<Product>) => {
        state.isLoading = false;
        state.activeProduct = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = (action.payload as string) ?? 'Failed to load product details.';
      });
  },
});

export const { clearActiveProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;
