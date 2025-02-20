import { useQuery, useQueryClient } from "@tanstack/react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo from "@react-native-community/netinfo";
import { supabase } from "../utils/supabase";
import { useEffect, useState, useCallback, useRef } from "react";

const STORAGE_KEY = "cached_data";

// ✅ Fetch data from Supabase and store in AsyncStorage
const fetchFromSupabase = async (table: string) => {

  const { data, error } = await supabase.from(table).select("*");

  if (error) {
    console.error(`❌ Supabase Error: ${error.message}`);
    throw new Error(error.message);
  }

  await AsyncStorage.setItem(`${STORAGE_KEY}_${table}`, JSON.stringify(data));
 
  return data;
};

// ✅ Fetch from AsyncStorage when offline
const fetchFromAsyncStorage = async (table: string) => {

  const storedData = await AsyncStorage.getItem(`${STORAGE_KEY}_${table}`);
  return storedData ? JSON.parse(storedData) : [];
};

// ✅ Sync Supabase data to AsyncStorage when online
export async function syncDataIfOnline(table: string, queryClient: any) {
  
  try {
    const { data, error } = await supabase.from(table).select("*");
    if (error) {
      console.error(`❌ Sync Error (${table}): ${error.message}`);
      return;
    }

    await AsyncStorage.setItem(`${STORAGE_KEY}_${table}`, JSON.stringify(data));
 

    // ✅ IMMEDIATELY UPDATE UI WITHOUT UNNECESSARY FETCHES
    queryClient.setQueryData([table], data);
  } catch (err) {
    console.error("❌ Unexpected sync error:", err);
  }
}

// ✅ Optimized React Query Hook for Data Sync
export function useSync(table: string) {
  const queryClient = useQueryClient();
  const [isOnline, setIsOnline] = useState(true);
  const netInfoRef = useRef<(() => void) | null>(null); // ✅ Prevent unnecessary re-registrations

  // ✅ Memoized function to fetch data
  const fetchData = useCallback(async () => {
    const cachedData = await fetchFromAsyncStorage(table);
    return isOnline ? fetchFromSupabase(table) : cachedData;
  }, [isOnline, table]);

  useEffect(() => {
    if (netInfoRef.current) return; // ✅ Prevent duplicate event listeners

    netInfoRef.current = NetInfo.addEventListener(async (state) => {
      const online = !!state.isConnected;
      setIsOnline(online);

      if (online) {
      
        await syncDataIfOnline(table, queryClient);
      }
    });

    return () => {
      if (netInfoRef.current) {
        
        netInfoRef.current(); // ✅ Unsubscribe the listener
        netInfoRef.current = null; // ✅ Prevent re-adding it
      }
    };
  }, []); // ✅ Empty array ensures this effect runs only once

  return useQuery({
    queryKey: [table],
    queryFn: fetchData,
    staleTime: 1000 * 60 * 5, // ✅ Cache for 5 minutes
    refetchOnReconnect: true, // ✅ Ensures refetching when coming back online
    refetchOnMount: false, // ✅ Prevents redundant refetching on screen mount
    refetchOnWindowFocus: false, // ✅ Avoids unnecessary re-fetch when switching apps
    retry: 2, // ✅ Retry twice if an error occurs
  });
}
