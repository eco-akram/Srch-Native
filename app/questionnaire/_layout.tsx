import { Stack } from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

const Layout = () => {
  return (
    <GluestackUIProvider mode="light">
      <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="categories" />
          <Stack.Screen name="questions" />
        </Stack>
        <StatusBar style="dark" />
      </View>
    </GluestackUIProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});

export default Layout;
