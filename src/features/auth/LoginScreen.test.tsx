import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, screen, waitFor } from '@testing-library/react-native';
import { apiClient } from '../../services/apiClient';
import { renderWithProviders } from '../../utils/test-utils';
import { LoginScreen } from './LoginScreen';
import type { LoginResponse } from '../../types/auth';
import type { RootState } from '../../store/store';

jest.mock('../../services/apiClient');

const mockPost = apiClient.post as jest.MockedFunction<typeof apiClient.post>;

function preloadAuth(): Partial<RootState> {
  return {
    auth: {
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      errorMessage: null,
    },
  };
}

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

describe('LoginScreen', () => {
  beforeEach(() => {
    mockPost.mockReset();
  });

  it('should render the login form and branding', async () => {
    await renderWithProviders(<LoginScreen />, { preloadedState: preloadAuth() });

expect(screen.getByText('myProducts')).toBeTruthy();
    expect(screen.getByText(/Welcome back!/)).toBeTruthy();
    expect(screen.getAllByText('Sign In')).toHaveLength(2);
    expect(screen.getByPlaceholderText('Enter username (e.g. emilys)')).toBeTruthy();
    expect(screen.getByPlaceholderText('Enter password')).toBeTruthy();
    expect(screen.getByText(/Auto-fill demo credentials/)).toBeTruthy();
  });

  it('should auto-fill demo credentials when the demo link is pressed', async () => {
    await renderWithProviders(<LoginScreen />, { preloadedState: preloadAuth() });

    await fireEvent.press(screen.getByText(/Auto-fill demo credentials/));

    expect(
      screen.getByPlaceholderText('Enter username (e.g. emilys)').props.value
    ).toBe('emilys');
    expect(screen.getByPlaceholderText('Enter password').props.value).toBe(
      'emilyspass'
    );
  });

  it('should dispatch the login thunk with trimmed credentials on submit', async () => {
    mockPost.mockResolvedValue({ data: fulfilledPayload });

    const { store } = await renderWithProviders(<LoginScreen />, { preloadedState: preloadAuth() });

    await fireEvent.changeText(
      screen.getByPlaceholderText('Enter username (e.g. emilys)'),
      'emilys'
    );
    await fireEvent.changeText(
      screen.getByPlaceholderText('Enter password'),
      'emilyspass'
    );

    const signInButtons = screen.getAllByText('Sign In');
    await fireEvent.press(signInButtons[signInButtons.length - 1]);

    await waitFor(() => {
      expect(mockPost).toHaveBeenCalledWith('/auth/login', {
        username: 'emilys',
        password: 'emilyspass',
      });
    });
    await waitFor(() => {
      expect(store.getState().auth.isAuthenticated).toBe(true);
    });
  });

  it('should show validation errors when submitting invalid credentials', async () => {
    await renderWithProviders(<LoginScreen />, { preloadedState: preloadAuth() });

    const signInButtons = screen.getAllByText('Sign In');
    await fireEvent.press(signInButtons[signInButtons.length - 1]);

    expect(screen.getByText('Username is required')).toBeTruthy();
    expect(screen.getByText('Password is required')).toBeTruthy();
    expect(mockPost).not.toHaveBeenCalled();
  });
});
