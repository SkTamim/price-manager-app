import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Text, TextInput, useTheme } from 'react-native-paper';
import { COLORS } from '../../constants/colors';
import { useFeedback } from '../../context/FeedbackContext';

import { signInWithGoogle } from '../../firebase/googleAuth';
export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const navigation = useNavigation();
  const theme = useTheme();
  const { showSnackbar } = useFeedback();

  const inputTheme = { ...theme, roundness: 30 };

  const handleLogin = async () => {
    if (!email || !password) {
      showSnackbar('Please fill in all fields.', { error: true });
      return;
    }
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      showSnackbar('Signed in successfully!');
    } catch (error) {
      showSnackbar('Invalid email or password.', { error: true });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);

    try {
      await signInWithGoogle();
      // Login will be handled by the onAuthStateChanged listener in App.tsx
      showSnackbar('Signed in with Google successfully!');
    } catch (error) {
      showSnackbar('Google Sign-In failed.', { error: true });
    } finally {
      setGoogleLoading(false);
    }
    setGoogleLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topSection}>
        <Text style={styles.topSectionTitle}>Welcome Back!</Text>
        <Text style={styles.topSectionSubtitle}>Login to your account</Text>
      </View>

      <View style={styles.bottomSection}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoidingView}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <ScrollView
            contentContainerStyle={styles.formContainer}
            keyboardShouldPersistTaps="handled"
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
                  icon={isPasswordVisible ? 'eye-off' : 'eye'}
                  onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              }
            />

            <View style={styles.forgotPasswordContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.button}
              labelStyle={styles.buttonLabel}
            >
              {loading ? 'Logging In...' : 'Login'}
            </Button>

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>
                Don&apos;t have an account?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>


            {/* Separator and Google Button */}
            <View style={styles.separatorContainer}>
              <View style={styles.separatorLine} />
              <Text style={styles.separatorText}>Or continue with</Text>
              <View style={styles.separatorLine} />
            </View>

            <View style={styles.socialLoginContainer}>
              <Button
                icon="google"
                mode="outlined"
                onPress={handleGoogleLogin}
                loading={googleLoading}
                disabled={loading || googleLoading}
                style={styles.socialButton}
                labelStyle={styles.socialButtonLabel}
                textColor={COLORS.text}
              >
                {googleLoading ? 'Signing in...' : 'Continue with Google'}
              </Button>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  topSection: {
    flex: 0.3,
    justifyContent: 'center',
    padding: 20,
    paddingTop: 40,
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
    marginBottom: 14,
  },
  buttonLabel: {
    fontFamily: 'Poppins-Bold',
    letterSpacing: 1.5,
    fontSize: 16,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: COLORS.gray,
  },
  signupLink: {
    fontFamily: 'Poppins-Bold',
    fontSize: 14,
    color: COLORS.primary,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  separatorText: {
    fontFamily: 'Poppins-Regular',
    marginHorizontal: 12,
    color: COLORS.gray,
  },
  socialLoginContainer: {
    alignItems: 'center',
  },
  socialButton: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    width: '100%',
    paddingVertical: 4,
  },
  socialButtonLabel: {
    fontFamily: 'Poppins-SemiBold',
  },
  forgotPasswordContainer: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  forgotPasswordText: {
    color: COLORS.primary,
    fontFamily: 'Poppins-SemiBold',
  },
});
