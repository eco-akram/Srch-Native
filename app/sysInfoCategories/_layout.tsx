import { Stack } from "expo-router";
import React from "react";
import { View, StyleSheet } from "react-native";
import { TranslationProvider } from '../../contexts/TranslationContext';
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Provider as PaperProvider } from 'react-native-paper';
import Toast from 'react-native-toast-message';

const Layout = () => {
  return (
    <TranslationProvider>
      <GluestackUIProvider mode="light">
        <PaperProvider>
          <View style={styles.container}>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="sysInfo" />
              <Stack.Screen name="eNET" />
              <Stack.Screen name="jung" />
              <Stack.Screen name="knx" />
              <Stack.Screen name="lb-Manage" />

            </Stack>
          </View>
          <Toast />
        </PaperProvider>
      </GluestackUIProvider>
    </TranslationProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1EBE5",
  },
});

export default Layout;
