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