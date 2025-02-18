import '../global.css';
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from 'expo-router';

const Layout = () => {
  return (
    <GluestackUIProvider mode="light">
      <Stack>
        <Stack.Screen name='index' options={{ headerShown: false }} />
        <Stack.Screen name='details' options={{ headerShown: false }} />
      </Stack>
    </GluestackUIProvider>
  );
};

export default Layout;