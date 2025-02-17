import { Tabs } from 'expo-router';
import { House, Info, List } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={
          {
            /*           tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#777777', */
            /*           tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: '#000000',
            borderTopWidth: 0.5,
            borderTopColor: '#141414',
            height: 110,
          }, */
            /*           sceneStyle: {
            backgroundColor: '#0A0A0A',
          }, */
          }
        }>
        <Tabs.Screen
          name="details"
          options={{
            title: 'Ai',
            headerShown: false,
            tabBarIcon: ({ color }) => <Info size={24} />,
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => <House size={24} />,
          }}
        />
        <Tabs.Screen
          name="list"
          options={{
            title: 'Decks',
            headerShown: false,
            tabBarIcon: ({ color }) => <List size={24} />,
          }}
        />
      </Tabs>
    </>
  );
}
