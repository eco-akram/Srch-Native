import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import Constants from 'expo-constants';
import NetInfo from '@react-native-community/netinfo';

// Get Supabase credentials from app.json
const supabaseUrl = Constants.expoConfig?.extra?.supabaseUrl;
const supabaseAnonKey = Constants.expoConfig?.extra?.supabaseAnonKey;

// Debugging: Log values
console.log("🔗 Supabase URL:", supabaseUrl);
console.log("🔑 Supabase Anon Key:", supabaseAnonKey ? "Loaded ✅" : "Missing ❌");

// Throw error if missing credentials
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("❌ Supabase environment variables are missing. Check app.json.");
}

// Initialize Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Storage key for AsyncStorage
const STORAGE_KEY = 'cached_users';

// Function to fetch data from Supabase
export async function fetchFromSupabase() {
  console.log("🔄 Fetching data from Supabase...");
  
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("❌ Supabase Connection Error:", error.message);
    return null;
  }

  // Save data to AsyncStorage
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  console.log("✅ Data from Supabase saved to AsyncStorage.");

  return data;
}

// Function to fetch data from AsyncStorage (Offline Mode)
export async function fetchFromAsyncStorage() {
  console.log("📴 Fetching data from AsyncStorage...");
  const storedData = await AsyncStorage.getItem(STORAGE_KEY);
  return storedData ? JSON.parse(storedData) : [];
}

// Main function to get user data (Uses AsyncStorage if offline)
export async function getUserData() {
  const netInfo = await NetInfo.fetch();

  if (netInfo.isConnected) {
    console.log("🌐 Online: Using Supabase...");
    return await fetchFromSupabase();
  } else {
    console.log("📴 Offline: Using AsyncStorage...");
    return await fetchFromAsyncStorage();
  }
}

// Sync AsyncStorage with Supabase when going online
export async function syncDataIfOnline() {
  const netInfo = await NetInfo.fetch();

  if (netInfo.isConnected) {
    console.log("🔄 Syncing local data with Supabase...");

    // ✅ Step 1: Fetch latest Supabase data
    const { data: supabaseData, error } = await supabase.from("users").select("*");
    if (error) {
      console.error("❌ Failed to fetch latest Supabase data:", error.message);
      return;
    }

    // ✅ Step 2: Fetch stored data from AsyncStorage
    const storedData = await fetchFromAsyncStorage();

    // ✅ Step 3: Remove any deleted users from AsyncStorage
    const updatedStorageData = storedData.filter((localUser: any) =>
      supabaseData.some((supabaseUser: any) => supabaseUser.id === localUser.id)
    );

    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStorageData));
    console.log("✅ Local storage updated. Removed deleted users.");

    // ✅ Step 4: Sync the cleaned data to Supabase
    for (const user of updatedStorageData) {
      await supabase.from("users").upsert(user);
    }
    console.log("✅ Sync complete!");
  } else {
    console.log("📴 Still offline. Sync postponed.");
  }
}


// Test Supabase connection
export async function testSupabaseConnection(): Promise<boolean> {
  console.log("🔍 Checking Supabase Connection...");

  try {
    const data = await getUserData();

    if (data) {
      console.log("✅ Supabase Connected Successfully:", data);
      return true;
    } else {
      console.log("❌ No data found.");
      return false;
    }
  } catch (err) {
    console.error("❌ Unexpected Supabase Error:", (err as Error).message);
    return false;
  }
}
