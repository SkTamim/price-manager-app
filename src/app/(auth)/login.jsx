import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
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
import { auth } from '../../firebase/config';
import { useFeedback } from '../../context/FeedbackContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
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
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      showSnackbar('Invalid email or password.', { error: true });
    } finally {
      setLoading(false);
    }
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
  }
});
