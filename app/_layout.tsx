import "@/global.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { Stack } from "expo-router";
import SyncManager from "@/components/SyncManager";

// ✅ Create QueryClient instance
const queryClient = new QueryClient();

const Layout = () => {
  return (
    // ✅ Wrap the entire app in QueryClientProvider
    <QueryClientProvider client={queryClient}>
      <SyncManager>
        <GluestackUIProvider mode="light">
          <Stack>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="sysInfo" options={{ headerShown: false }} />
          </Stack>
        </GluestackUIProvider>
      </SyncManager>
    </QueryClientProvider>
  );
};

export default Layout;
