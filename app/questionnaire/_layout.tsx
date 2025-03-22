import { Stack } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { TranslationProvider } from '../../contexts/TranslationContext';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import Toast from 'react-native-toast-message';

const Layout = () => {
  return (
    <TranslationProvider>
      <GluestackUIProvider mode="light">
        <View style={styles.container}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="categories" />
            <Stack.Screen name="questions" />
          </Stack>
          <StatusBar style="dark" />
        </View>
        <Toast />
      </GluestackUIProvider>
    </TranslationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default Layout;
