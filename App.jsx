import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { authInstance as auth } from './src/firebase/config';
import { onAuthStateChanged } from '@react-native-firebase/auth';
import { COLORS } from './src/constants/colors';
import { FeedbackProvider } from './src/context/FeedbackContext';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import your screens
import LoginScreen from './src/app/(auth)/login';
import SignupScreen from './src/app/(auth)/signup';
import ProductListScreen from './src/app/(main)/index';
import AddProductScreen from './src/app/(main)/add';
import SplashScreen from './src/components/SplashScreen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ForgotPasswordScreen from './src/app/(auth)/ForgotPassword';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

/**
 * Main application navigator displayed after a user is authenticated.
 * It contains the bottom tabs for navigating between core features.
 */
// Define the screenOptions function outside the component
const mainTabsScreenOptions = ({ route }) => ({
  tabBarIcon: ({ focused, color, size }) => {
    let iconName = 'list'; // Default icon
    if (route.name === 'Products') {
      iconName = focused ? 'list-circle' : 'list-circle-outline';
    } else if (route.name === 'Add') {
      iconName = focused ? 'add-circle' : 'add-circle-outline';
    }
    return <Ionicons name={iconName} size={size} color={color} />;
  },
  tabBarActiveTintColor: COLORS.primary,
  headerShown: false,
});

function MainAppTabs() {
  return (
    <Tab.Navigator screenOptions={mainTabsScreenOptions}>
      <Tab.Screen name="Products" component={ProductListScreen} />
      <Tab.Screen name="Add" component={AddProductScreen} />
    </Tab.Navigator>
  );
}

/**
 * Authentication navigator for handling login and signup flows.
 */
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}

// Configure the global theme for React Native Paper
const theme = {
  ...MD3LightTheme,
  fonts: {
    ...MD3LightTheme.fonts,
    default: { fontFamily: 'Poppins-Regular' },
  },
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.primary,
  },
};

/**
 * The root component of the application.
 * It handles authentication state and renders the appropriate navigator.
 */
export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = onAuthStateChanged(auth, authenticatedUser => {
      setUser(authenticatedUser);
      if (loading) {
        setLoading(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <FeedbackProvider>
          <NavigationContainer>
            {user ? <MainAppTabs /> : <AuthStack />}
          </NavigationContainer>
        </FeedbackProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
