import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { COLORS } from '../../constants/colors';
import { auth } from '../../firebase/config';
import { useFeedback } from '../../context/FeedbackContext';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme();
  const { showSnackbar } = useFeedback();

  const inputTheme = { ...theme, roundness: 30 };

  const handleSignup = async () => {
    // 1. Client-side validation
    if (!email || !password || !confirmPassword) {
      showSnackbar('Please fill in all fields.', { error: true });
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showSnackbar('Please enter a valid email address.', { error: true });
      return;
    }
    if (password.length < 8) {
      showSnackbar('Password must be at least 8 characters long.', { error: true });
      return;
    }
    if (password !== confirmPassword) {
      showSnackbar('Passwords do not match.', { error: true });
      return;
    }

    // 2. Call Firebase
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // The listener in App.tsx will automatically navigate to the main app
      showSnackbar('Account created successfully!');
    } catch (e) {
      // 3. Handle Firebase-specific errors
      let errorMessage = 'An unknown error occurred.';
      if (e.code === 'auth/email-already-in-use') {
        errorMessage = 'This email address is already in use.';
      }
      showSnackbar(errorMessage, { error: true });
      console.error('Signup Error:', e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* Top colored section */}
      <View style={styles.topSection}>
        <Text style={styles.topSectionTitle}>Create Account</Text>
        <Text style={styles.topSectionSubtitle}>Get started with your new account</Text>
      </View>

      {/* White rounded card for the form */}
      <View style={styles.bottomSection}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.formContainer}
            keyboardShouldPersistTaps='handled'
          >
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
              theme={inputTheme}
              keyboardType="email-address"
              autoCapitalize="none"
              left={<TextInput.Icon icon="email-outline" />}
            />

            <TextInput
              label="Password"
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={styles.input}
              theme={inputTheme}
              secureTextEntry={!isPasswordVisible}
              left={<TextInput.Icon icon="lock-outline" />}
              right={
                <TextInput.Icon
                  icon={isPasswordVisible ? "eye-off" : "eye"}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              }
            />

            <TextInput
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              mode="outlined"
              style={styles.input}
              theme={inputTheme}
              secureTextEntry={!isConfirmPasswordVisible}
              left={<TextInput.Icon icon="lock-check-outline" />}
              right={
                <TextInput.Icon
                  icon={isConfirmPasswordVisible ? "eye-off" : "eye"}
                  onPress={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                />
              }
            />

            <Button
              mode="contained"
              onPress={handleSignup}
              loading={loading}
              disabled={loading}
              style={styles.button}
              labelStyle={styles.buttonLabel}
            >
              {loading ? 'Creating Account...' : 'Sign Up'}
            </Button>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>Already have an account? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Log In</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

// These styles now match the login screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  topSection: {
    flex: 0.3,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40
  },
  topSectionTitle: {
    fontFamily: 'Agbalumo-Regular',
    fontSize: 42,
    color: COLORS.surface,
    textAlign: 'center',
  },
  topSectionSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
    color: COLORS.surface,
    textAlign: 'center',
    marginTop: 8,
  },
  bottomSection: {
    flex: 0.7,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 12,
  },
  button: {
    borderRadius: 30,
    paddingVertical: 6,
    marginBottom: 14
  },
  buttonLabel: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1.5,
    fontSize: 16,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  loginText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.gray,
  },
  loginLink: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: COLORS.primary,
  },
});