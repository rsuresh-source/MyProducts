import { useState, useCallback } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { logout } from '../auth/authSlice';
import { HS, Radii } from '@constants/theme';

interface DetailRowProps {
  icon: string;
  label: string;
  value: string;
  isPassword?: boolean;
  showPassword?: boolean;
  onTogglePassword?: () => void;
}

function DetailRow({
  icon,
  label,
  value,
  isPassword,
  showPassword,
  onTogglePassword,
}: DetailRowProps) {
  return (
    <View style={rowStyles.row}>
      <View style={rowStyles.iconTile}>
        <Text style={rowStyles.iconEmoji}>{icon}</Text>
      </View>
      <View style={rowStyles.copy}>
        <Text style={rowStyles.label}>{label}</Text>
        {isPassword ? (
          <View style={rowStyles.passwordField}>
            <Text style={rowStyles.passwordValue} numberOfLines={1}>
              {showPassword ? value : '••••••••'}
            </Text>
            <TouchableOpacity onPress={onTogglePassword}>
              <Text style={rowStyles.toggleBtn}>{showPassword ? 'Hide' : 'Show'}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <Text style={rowStyles.value} numberOfLines={2}>
            {value}
          </Text>
        )}
      </View>
    </View>
  );
}

export function ProfileScreen() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogout = useCallback(() => {
    dispatch(logout());
  }, [dispatch]);

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  if (!user) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={HS.navy} />
          <Text style={styles.loadingText}>Loading profile details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const fullName =
    `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* ── Page Header ──────────────────────────────── */}
        <View style={styles.pageHeader}>
          <Text style={styles.pageTitle}>My Profile</Text>
          <Text style={styles.pageSubtitle}>Manage your account information</Text>
        </View>

        {/* ── Profile Identity Card ────────────────────── */}
        <View style={styles.profileCard}>
          <View style={styles.avatarFrame}>
            {user.image ? (
              <Image
                source={{ uri: user.image }}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarFallbackText}>
                  {user.firstName ? user.firstName[0].toUpperCase() : 'U'}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.profileName}>{fullName}</Text>
          <Text style={styles.profileHandle}>@{user.username}</Text>
        </View>

        {/* ── Account Details Card ─────────────────────── */}
        <View style={styles.detailsCard}>
          <DetailRow icon="👤" label="Username" value={user.username} />

          <View style={rowStyles.separator} />

          <DetailRow icon="✉️" label="Email Address" value={user.email} />

          <View style={rowStyles.separator} />

          <DetailRow
            icon="🔒"
            label="Password"
            value={user.username}
            isPassword
            showPassword={showPassword}
            onTogglePassword={togglePassword}
          />

          {user.gender ? (
            <>
              <View style={rowStyles.separator} />
              <DetailRow icon="⚥" label="Gender" value={user.gender} />
            </>
          ) : null}
        </View>

        {/* ── Logout Button ────────────────────────────── */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          activeOpacity={0.85}>
          <Text style={styles.logoutBtnText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================================================================
   Styles — mapped 1:1 from /prototype/styles.css §10 (Profile Screen)
   ================================================================ */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: HS.canvas,
  },
  scrollContent: {
    paddingBottom: 90,
  },

  /* ── Page header ── */
  pageHeader: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 6,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: HS.text,
  },
  pageSubtitle: {
    fontSize: 14,
    color: HS.textMuted,
    marginTop: 3,
  },

  /* ── Profile identity card ── */
  profileCard: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: HS.surface,
    borderWidth: 1,
    borderColor: HS.border,
    borderRadius: Radii.card,
    shadowColor: HS.navy,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 20,
    marginTop: 14,
    marginBottom: 14,
    paddingVertical: 22,
    paddingHorizontal: 20,
  },
  avatarFrame: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: HS.placeholder,
    borderWidth: 3,
    borderColor: HS.accent,
    overflow: 'hidden',
    marginBottom: 12,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
  },
  avatarFallback: {
    flex: 1,
    backgroundColor: HS.navy,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarFallbackText: {
    color: HS.accent,
    fontSize: 32,
    fontWeight: '800',
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: HS.text,
  },
  profileHandle: {
    fontSize: 14,
    color: HS.textMuted,
    marginTop: 3,
  },

  /* ── Details card ── */
  detailsCard: {
    backgroundColor: HS.surface,
    borderWidth: 1,
    borderColor: HS.border,
    borderRadius: Radii.card,
    shadowColor: HS.navy,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
    elevation: 2,
    marginHorizontal: 20,
    marginBottom: 20,
    overflow: 'hidden',
  },

  /* ── Logout button ── */
  logoutBtn: {
    marginHorizontal: 20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: HS.danger,
    borderRadius: Radii.btn,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },

  /* ── Loading ── */
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: HS.textMuted,
  },
});

/* Detail row sub-component styles — separated to avoid nesting StyleSheet */
const rowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  separator: {
    height: 1,
    backgroundColor: HS.border,
    marginHorizontal: 16,
  },
  iconTile: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: HS.canvas,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  iconEmoji: {
    fontSize: 16,
  },
  copy: {
    flex: 1,
    minWidth: 0,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    color: HS.textMuted,
    marginBottom: 3,
  },
  value: {
    fontSize: 14,
    fontWeight: '600',
    color: HS.text,
  },
  passwordField: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: HS.text,
    letterSpacing: 1,
  },
  toggleBtn: {
    fontSize: 13,
    fontWeight: '700',
    color: HS.accent,
    marginLeft: 8,
  },
});
