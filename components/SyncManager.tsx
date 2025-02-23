import React, { createContext, useContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useSync } from "@/hooks/useSync";

const tablesToSync = ["Categories", "Products", "Questions"];

const NetworkContext = createContext<{ isOnline: boolean }>({ isOnline: true });

export default function SyncManager({ children }: { children: React.ReactNode }) {
  const { syncTable, loadStoredData } = useSync();
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      const online = !!state.isConnected; // ✅ Fix: Ensure it's always true or false
      setIsOnline(online);

      if (online) {
        console.log("🌐 Online - Syncing data from Supabase...");
        for (const table of tablesToSync) {
          await syncTable(table); // ✅ Fetch latest data from Supabase
        }
      } else {
        console.log("📴 Offline - Loading from AsyncStorage...");
        for (const table of tablesToSync) {
          await loadStoredData(table); // ✅ Load from AsyncStorage
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return <NetworkContext.Provider value={{ isOnline }}>{children}</NetworkContext.Provider>;
}

export const useNetwork = () => useContext(NetworkContext);
