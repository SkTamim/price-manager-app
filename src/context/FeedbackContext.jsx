import React, { createContext, useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';
import { COLORS } from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FeedbackContext = createContext();

export const useFeedback = () => useContext(FeedbackContext);

export const FeedbackProvider = ({ children }) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const showSnackbar = (msg, options = { error: false }) => {
    setMessage(msg);
    setIsError(options.error);
    setVisible(true);
  };

  const onDismissSnackBar = () => setVisible(false);

  return (
    <FeedbackContext.Provider value={{ showSnackbar }}>
      {children}
      <View style={styles.snackbarContainer}>
        <Snackbar
          visible={visible}
          onDismiss={onDismissSnackBar}
          duration={4000}
          style={[
            styles.snackbar,
            { backgroundColor: isError ? COLORS.danger : COLORS.success },
          ]}
        >
          <View style={styles.snackbarContent}>
            <Ionicons
              name={isError ? 'alert-circle' : 'checkmark-circle'}
              size={20}
              color="white"
              style={styles.icon}
            />
            <Text style={styles.messageText}>{message}</Text>
          </View>
        </Snackbar>
      </View>
    </FeedbackContext.Provider>
  );
};

const styles = StyleSheet.create({
  snackbarContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
  },
  snackbar: {
    borderRadius: 8,
  },
  snackbarContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  messageText: {
    color: 'white',
    fontWeight: 'bold',
    flexShrink: 1,
  },
});
