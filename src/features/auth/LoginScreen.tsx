import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  Pressable,
  View,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { loginUser, clearError } from './authSlice';
import { PrimaryButton } from '@components/PrimaryButton';
import { HS, Radii } from '@constants/theme';

export function LoginScreen() {
  const dispatch = useAppDispatch();
  const { isLoading, errorMessage } = useAppSelector((state) => state.auth);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const fillDemoCredentials = () => {
    setUsername('emilys');
    setPassword('emilyspass');
    setUsernameError('');
    setPasswordError('');
    dispatch(clearError());
  };

  const validate = (): boolean => {
    let valid = true;

    if (!username.trim()) {
      setUsernameError('Username is required');
      valid = false;
    } else if (username.trim().length < 3) {
      setUsernameError('Username must be at least 3 characters');
      valid = false;
    } else {
      setUsernameError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.trim().length < 4) {
      setPasswordError('Password must be at least 4 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleLogin = () => {
    if (!validate()) return;
    dispatch(loginUser({ username: username.trim(), password: password.trim() }));
  };

  const handleUsernameChange = (text: string) => {
    setUsername(text);
    if (usernameError) setUsernameError('');
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    if (passwordError) setPasswordError('');
  };

  const hasUsernameInvalid = usernameError.length > 0;
  const hasPasswordInvalid = passwordError.length > 0;

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled">
          {/* ── Brand Header ──────────────────────────────── */}
          <View style={styles.brandHeader}>
            <View style={styles.brandIcon}>
              <Text style={styles.brandMonogram}>mP</Text>
            </View>
            <Text style={styles.brandTitle}>myProducts</Text>
            <Text style={styles.brandSubtitle}>Welcome back! Log in to continue.</Text>
          </View>

          {/* ── Login Card ────────────────────────────────── */}
          <View style={styles.loginCard}>
            <Text style={styles.cardHeading}>Sign In</Text>

            {errorMessage ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}

            {/* Username */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Username</Text>
              <TextInput
                style={[styles.formInput, hasUsernameInvalid && styles.formInputInvalid]}
                placeholder="Enter username (e.g. emilys)"
                placeholderTextColor="#94A3B8"
                value={username}
                onChangeText={handleUsernameChange}
                autoCapitalize="none"
                autoComplete="username"
                editable={!isLoading}
              />
              {hasUsernameInvalid ? (
                <Text style={styles.fieldError}>{usernameError}</Text>
              ) : null}
            </View>

            {/* Password */}
            <View style={styles.formGroup}>
              <Text style={styles.formLabel}>Password</Text>
              <TextInput
                style={[styles.formInput, hasPasswordInvalid && styles.formInputInvalid]}
                placeholder="Enter password"
                placeholderTextColor="#94A3B8"
                value={password}
                onChangeText={handlePasswordChange}
                secureTextEntry
                autoCapitalize="none"
                autoComplete="current-password"
                editable={!isLoading}
              />
              {hasPasswordInvalid ? (
                <Text style={styles.fieldError}>{passwordError}</Text>
              ) : null}
            </View>

            {/* Demo auto-fill */}
            <Pressable onPress={fillDemoCredentials} disabled={isLoading}>
              <Text style={styles.demoLink}>⚡ Auto-fill demo credentials (emilys)</Text>
            </Pressable>

            {/* Sign In */}
            <PrimaryButton
              title="Sign In"
              onPress={handleLogin}
              loading={isLoading}
              disabled={isLoading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

/* ================================================================
   Styles — mapped 1:1 from /prototype/styles.css §6 (Login Screen)
   ================================================================ */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: HS.canvas,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 28,
  },

  /* Brand header */
  brandHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  brandIcon: {
    width: 64,
    height: 64,
    borderRadius: 18,
    backgroundColor: HS.navy,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    shadowColor: HS.navy,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  brandMonogram: {
    color: HS.accent,
    fontSize: 26,
    fontWeight: '800',
  },
  brandTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: HS.text,
  },
  brandSubtitle: {
    fontSize: 14,
    color: HS.textMuted,
    marginTop: 6,
  },

  /* Login card */
  loginCard: {
    backgroundColor: HS.surface,
    borderRadius: 24,
    padding: 24,
    paddingBottom: 28,
    shadowColor: HS.navy,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: HS.text,
    marginBottom: 18,
  },

  /* Server-level error banner */
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderColor: '#FCA5A5',
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },

  /* Form fields */
  formGroup: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: HS.textMuted,
    marginBottom: 7,
  },
  formInput: {
    width: '100%',
    paddingVertical: 13,
    paddingHorizontal: 14,
    backgroundColor: HS.surface,
    borderWidth: 1.5,
    borderColor: HS.border,
    borderRadius: Radii.field,
    color: HS.text,
    fontSize: 14,
  },
  formInputInvalid: {
    borderColor: HS.danger,
  },
  fieldError: {
    color: HS.danger,
    fontSize: 12,
    fontWeight: '500',
    marginTop: 6,
  },

  /* Demo link */
  demoLink: {
    color: HS.accent,
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 18,
    marginTop: 4,
  },
});
