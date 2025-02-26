import React, { createContext, useContext, useEffect, useState } from "react";
import NetInfo from "@react-native-community/netinfo";
import { useSync } from "@/hooks/useSync";

const tablesToSync = ["Categories", "Products", "Questions","Answers","Product_Answers"];

const NetworkContext = createContext<{ isOnline: boolean }>({ isOnline: true });

export default function SyncManager({ children }: { children: React.ReactNode }) {
  const { syncTable, loadStoredData, subscribeToRealtimeUpdates } = useSync();
  const [isOnline, setIsOnline] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(async (state) => {
      const online = !!state.isConnected;
      setIsOnline(online);

      if (online) {
        console.log("🌍 Online - Syncing all tables...");
        for (const table of tablesToSync) {
          await syncTable(table);
        }

        // ✅ Start real-time updates globally
        tablesToSync.forEach((table) => subscribeToRealtimeUpdates(table));
      } else {
        console.log("📴 Offline - Loading data from cache...");
        for (const table of tablesToSync) {
          await loadStoredData(table);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <NetworkContext.Provider value={{ isOnline }}>{children}</NetworkContext.Provider>;
}

export const useNetwork = () => useContext(NetworkContext);
