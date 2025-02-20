import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import NetInfo from "@react-native-community/netinfo";
import { syncDataIfOnline } from "@/hooks/useSync";
import { useQueryClient } from "@tanstack/react-query";

// ✅ Create context for global network status
const NetworkContext = createContext<{ isOnline: boolean }>({ isOnline: true });

const tablesToSync = ["users"]; // ✅ Add more tables as needed

export default function SyncManager({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const netInfoRef = useRef<(() => void) | null>(null); // ✅ Prevent duplicate event listeners

  useEffect(() => {
    if (netInfoRef.current) return; // Prevent duplicate registrations

    netInfoRef.current = NetInfo.addEventListener(async (state) => {
      const online = !!state.isConnected;
      console.log(`Network status changed: ${online ? "Online" : "Offline"}`);
      setIsOnline(online);

      if (online) {
        console.log("Device is online. Starting data sync...");
        for (const table of tablesToSync) {
          console.log(`Syncing data for table: ${table}`);
          await syncDataIfOnline(table, queryClient);
          console.log(`Sync completed for table: ${table}`);
        }
        console.log("All data sync completed.");
      } else {
        console.log("Device is offline. Data sync paused.");
      }
    });

    return () => {
      if (netInfoRef.current) {
        console.log("Unsubscribing from network status changes.");
        netInfoRef.current(); // ✅ Unsubscribe the listener
        netInfoRef.current = null; // ✅ Prevent duplicate listeners
      }
    };
  }, []); // ✅ Runs only once when the component mounts

  return (
    <NetworkContext.Provider value={{ isOnline }}>
      {children}
    </NetworkContext.Provider>
  );
}

// ✅ Hook to access online/offline status
export const useNetwork = () => useContext(NetworkContext);
