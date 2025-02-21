import React from 'react';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import { CategoriesProvider } from './CategoriesContext';
import { View, StyleSheet } from "react-native";

const Layout = () => {
  return (
    <GluestackUIProvider mode="light">
      <CategoriesProvider>
        <View style={styles.container}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="categories" />
          <Stack.Screen name="questions" />
        </Stack>
        </View>
      </CategoriesProvider>
    </GluestackUIProvider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1EBE5",
  },
});

export default Layout;
