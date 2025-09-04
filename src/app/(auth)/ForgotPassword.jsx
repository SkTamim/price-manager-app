import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Button, IconButton, TextInput, useTheme } from 'react-native-paper';
import { COLORS } from '../../constants/colors';
import { useFeedback } from '../../context/FeedbackContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const theme = useTheme();
    const { showSnackbar } = useFeedback();

    const inputTheme = { ...theme, roundness: 30 };

    const handlePasswordReset = async () => {
        if (!email) {
            showSnackbar('Please enter your email address.', { error: true });
            return;
        }
        setLoading(true);
        try {
            await auth().sendPasswordResetEmail(email);
            showSnackbar('Password reset link sent! Check your inbox.');
            navigation.goBack();
        } catch (error) {
            showSnackbar('Failed to send reset email. Please check the address.', { error: true });
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <IconButton
                icon="arrow-left"
                size={30}
                color={COLORS.surface}
                onPress={() => navigation.goBack()}
                style={styles.floatingBackButton}
            />

            <View style={styles.topSection}>
                <Text style={styles.topSectionTitle}>Reset Password</Text>
                <Text style={styles.topSectionSubtitle}>Enter your email to receive a reset link</Text>
            </View>

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

                        <Button
                            mode="contained"
                            onPress={handlePasswordReset}
                            loading={loading}
                            disabled={loading}
                            style={styles.button}
                            labelStyle={styles.buttonLabel}
                        >
                            {loading ? 'Sending...' : 'Send Reset Link'}
                        </Button>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
        </SafeAreaView>
    );
}

// These styles are similar to the login/signup screens
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
    floatingBackButton: {
        position: 'absolute',
        top: Platform.OS === 'ios' ? 40 : 10,
        left: 10,
        zIndex: 10,
        backgroundColor: 'rgba(230, 244, 255, 0.85)',
        borderRadius: 25,
        padding: 5,
    },
});