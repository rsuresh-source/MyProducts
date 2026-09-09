import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import type { AsyncStorageStatic } from '@react-native-async-storage/async-storage';
import { apiClient } from '../../services/apiClient';
import { authReducer, loginUser, logout, restoreSession } from './authSlice';
import { productReducer } from '../products/productSlice';
import { cartReducer } from '../cart/cartSlice';
import type { RootState } from '../../store/store';
import type { LoginResponse, User } from '../../types/auth';

jest.mock('axios', () => ({
  create: jest.fn(() => ({
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    patch: jest.fn(),
    delete: jest.fn(),
    interceptors: {
      request: { use: jest.fn(), eject: jest.fn(), clear: jest.fn() },
      response: { use: jest.fn(), eject: jest.fn(), clear: jest.fn() },
    },
    defaults: {},
  })),
}));

const mockPost = apiClient.post as jest.MockedFunction<typeof apiClient.post>;

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  cart: cartReducer,
});

function makeStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as never,
  });
}

type AuthState = RootState['auth'];

const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  errorMessage: null,
};

const fulfilledPayload: LoginResponse = {
  id: 1,
  username: 'emilys',
  email: 'emily@example.com',
  firstName: 'Emily',
  lastName: 'Smith',
  gender: 'female',
  image: 'https://dummyjson.com/icon/emilys/128',
  accessToken: 'access-token-123',
  refreshToken: 'refresh-token-123',
};

const fulfilledAuthState: AuthState = {
  user: {
    id: 1,
    username: 'emilys',
    email: 'emily@example.com',
    firstName: 'Emily',
    lastName: 'Smith',
    gender: 'female',
    image: 'https://dummyjson.com/icon/emilys/128',
  } satisfies User,
  token: 'access-token-123',
  isAuthenticated: true,
  isLoading: false,
  errorMessage: null,
};

describe('authSlice', () => {
  let asyncStorage: AsyncStorageStatic;

  beforeEach(() => {
    mockPost.mockReset();
    jest.clearAllMocks();
    asyncStorage = jest.requireMock<AsyncStorageStatic>(
      '@react-native-async-storage/async-storage'
    );
  });

  it('should expose the expected initial state', () => {
    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialAuthState);
  });

  describe('loginUser', () => {
    it('should set loading state while the request is pending', () => {
      const store = makeStore();
      let resolvePost: (value: { data: LoginResponse }) => void = () => {};
      mockPost.mockReturnValue(
        new Promise((resolve) => {
          resolvePost = resolve;
        })
      );

      store.dispatch(loginUser({ username: 'emilys', password: 'emilyspass' }));

      expect(store.getState().auth.isLoading).toBe(true);
      expect(store.getState().auth.errorMessage).toBeNull();

      resolvePost({ data: fulfilledPayload });
    });

    it('should store the token and user on a fulfilled login', async () => {
      const store = makeStore();
      mockPost.mockResolvedValue({ data: fulfilledPayload });

      await store.dispatch(
        loginUser({ username: 'emilys', password: 'emilyspass' })
      );

      const state = store.getState().auth;
      expect(state).toEqual(fulfilledAuthState);
      expect(mockPost).toHaveBeenCalledWith('/auth/login', {
        username: 'emilys',
        password: 'emilyspass',
      });
      expect(jest.mocked(asyncStorage.setItem)).toHaveBeenCalledWith(
        '@auth_token',
        'access-token-123'
      );
      expect(jest.mocked(asyncStorage.setItem)).toHaveBeenCalledWith(
        '@auth_user',
        JSON.stringify(fulfilledPayload)
      );
    });

    it('should set the error message on a rejected login', async () => {
      const store = makeStore();
      mockPost.mockRejectedValue({
        response: { data: { message: 'Invalid credentials' } },
      });

      await store.dispatch(
        loginUser({ username: 'emilys', password: 'wrongpass' })
      );

      const state = store.getState().auth;
      expect(state.isLoading).toBe(false);
      expect(state.errorMessage).toBe('Invalid credentials');
      expect(state.isAuthenticated).toBe(false);
      expect(state.token).toBeNull();
    });

    it('should fall back to a default message when no server error is provided', async () => {
      const store = makeStore();
      mockPost.mockRejectedValue(new Error('Network Error'));

      await store.dispatch(
        loginUser({ username: 'emilys', password: 'emilyspass' })
      );

      expect(store.getState().auth.errorMessage).toBe('Network Error');
    });
  });

  describe('logout', () => {
    it('should clear the session and remove persisted keys', async () => {
      const store = makeStore({
        auth: { ...fulfilledAuthState },
      });

      await store.dispatch(logout());

      const state = store.getState().auth;
      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.errorMessage).toBeNull();
      expect(jest.mocked(asyncStorage.multiRemove)).toHaveBeenCalledWith([
        '@auth_token',
        '@auth_user',
      ]);
    });
  });

  describe('restoreSession', () => {
    it('should restore a previously saved session', async () => {
      const store = makeStore();
      jest.mocked(asyncStorage.getItem)
        .mockResolvedValueOnce('restored-token')
        .mockResolvedValueOnce(JSON.stringify(fulfilledPayload));

      await store.dispatch(restoreSession());

      const state = store.getState().auth;
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.token).toBe('restored-token');
      expect(state.user).toMatchObject({
        id: 1,
        username: 'emilys',
        email: 'emily@example.com',
        firstName: 'Emily',
        lastName: 'Smith',
      });
    });

    it('should remain unauthenticated when no session exists', async () => {
      const store = makeStore();
      jest.mocked(asyncStorage.getItem).mockResolvedValueOnce(null);

      await store.dispatch(restoreSession());

      const state = store.getState().auth;
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(false);
      expect(state.user).toBeNull();
    });
  });
});
