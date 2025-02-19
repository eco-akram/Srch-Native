import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo'; // ✅ Import NetInfo

import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';
import { getUserData, syncDataIfOnline } from '~/utils/supabase';

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<string>("Checking...");
  const [isOnline, setIsOnline] = useState<boolean | null>(null); // ✅ Track online/offline state
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getUserData();
        setUsers(data || []);
        setConnectionStatus("✅ Data Loaded!");
      } catch (error) {
        setConnectionStatus(`❌ Error: ${(error as Error).message}`);
      }
    }

    fetchData();
    syncDataIfOnline();

    // ✅ Subscribe to network status changes
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });

    return () => unsubscribe(); // ✅ Cleanup the event listener on unmount
  }, [reloadKey]);

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container key={reloadKey}>
        <ScreenContent path="app/index.tsx" title="Home" />

        {/* ✅ Show Online/Offline Status */}
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 10, color: isOnline ? "green" : "red" }}>
          {isOnline !== null ? (isOnline ? "🌐 Online" : "📴 Offline") : "Checking network..."}
        </Text>

        <Text style={{ fontSize: 16, fontWeight: 'bold', marginVertical: 10 }}>
          {connectionStatus}
        </Text>

        <Text>Users:</Text>
        {users.length > 0 ? (
          users.map((user, index) => <Text key={index}>{user.name}</Text>)
        ) : (
          <Text>No users found.</Text>
        )}

        {/* ✅ Button now forces a real refresh */}
        <Button title="Restart Page" onPress={() => setReloadKey(prev => prev + 1)} />
      </Container>
    </>
  );
}
