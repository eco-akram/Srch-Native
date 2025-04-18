import { Tabs } from 'expo-router';
import { House, Info, List } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          /*           tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#777777', */
          /*           tabBarShowLabel: false, */
          tabBarStyle: {
            /*             backgroundColor: '#000000', */
            borderTopWidth: 0.5,
            /*             borderTopColor: '#141414', */
            height: 60,
          },
        }}>
        <Tabs.Screen
          name="details"
          options={{
            title: 'Details',
            headerShown: false,
            tabBarIcon: ({ color }) => <Info size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => <House size={24} color={color} />,
          }}
        />
        <Tabs.Screen
          name="list"
          options={{
            title: 'List',
            headerShown: false,
            tabBarIcon: ({ color }) => <List size={24} color={color} />,
          }}
        />
      </Tabs>
      <StatusBar style="light" />
    </>
  );
}
