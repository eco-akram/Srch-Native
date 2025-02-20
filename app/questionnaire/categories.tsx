import React, { useState, useEffect } from 'react';
import { StatusBar, Image, FlatList, Animated } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Pressable } from '@/components/ui/pressable';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, ChevronDown } from 'lucide-react-native';
import { router } from 'expo-router';

const categoriesScreen = () => {
  const [categories, setCategories] = useState<{ id: number; name: string; description: string; }[]>([]);
  const [selectedCategories, setSelectedCategories] = useState(new Set());
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const [borderAnimations, setBorderAnimations] = useState<{ [key: number]: Animated.Value }>({});

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    // Simulating API fetch
    const fetchedCategories = [
      { id: 1, name: 'Apšvietimas', description: 'Apšvietimo sistemos jūsų namams.' },
      { id: 2, name: 'Žaliuzės / Langinės / Tentai', description: 'Langų uždengimo sprendimai.' },
      { id: 3, name: 'Apsauga', description: 'Namų saugumo sprendimai.' },
      { id: 4, name: 'Vertės rodymas', description: 'Duomenų vizualizacija ir analizė.' },
      { id: 5, name: 'Jungiklių laikmačiai', description: 'Automatizuoti jungikliai.' }
    ];
    setCategories(fetchedCategories);
    
    const animations: { [key: number]: Animated.Value } = {};
    fetchedCategories.forEach(cat => {
      animations[cat.id] = new Animated.Value(0);
    });
    setBorderAnimations(animations);
  };

  const toggleSelection = (id: number) => {
    const updatedSelection = new Set(selectedCategories);
    if (updatedSelection.has(id)) {
      updatedSelection.delete(id);
      Animated.timing(borderAnimations[id], {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start();
    } else {
      updatedSelection.add(id);
      Animated.timing(borderAnimations[id], {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
    setSelectedCategories(updatedSelection);
  };

  const toggleExpand = (id: number) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <Box className="align-center flex-1 justify-center p-4" style={{ backgroundColor: '#F1EBE5' }}>
      <StatusBar backgroundColor="#C2C2C2" barStyle="dark-content" />
      
      {/* Back Button */}
      <Box className="absolute left-2 right-0 top-2 p-4">
        <HStack space="lg">
          <Pressable onPress={() => router.back()}>
            <Icon as={ArrowLeft} size={'xl'} color="black" style={{ width: 35, height: 35 }} />
          </Pressable>
        </HStack>
      </Box>
      
      {/* Logo */}
      <Image
        source={require('../../assets/JUNG.png')}
        style={{ width: 120, height: 30, marginVertical: 25, alignSelf: 'center' }}
      />
      
        <Text size="3xl" style={{ color: 'black', alignSelf: 'center', marginVertical: 20 }}>Pasirinkite kategorijas</Text>
      
      
      {/* Category List */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const borderColor = borderAnimations[item.id]?.interpolate({
            inputRange: [0, 1],
            outputRange: ['#D3D3D3', '#1EB20A']
          });
          
          return (
            <Animated.View
              style={{
                borderWidth: 2,
                borderRadius: 10,
                borderColor: borderColor || '#D3D3D3',
                marginBottom: 10,
              }}
            >
              <Pressable
                className="rounded-xl bg-white p-4 shadow-md"
                onPress={() => toggleSelection(item.id)}
              >
                <HStack className="justify-between items-center">
                  <Text size="xl" style={{ color: 'black', fontWeight: 'bold' }}>{item.name}</Text>
                  <Pressable hitSlop={20} onPress={() => toggleExpand(item.id)}>
                    <Icon as={ChevronDown} size={'lg'} color="black" />
                  </Pressable>
                </HStack>
              </Pressable>
              {expandedCategory === item.id && (
                <Box className="p-4 bg-gray-100 rounded-b-xl">
                  <Text size="md" style={{ color: 'black', alignSelf: "center" }}>{item.description}</Text>
                </Box>
              )}
            </Animated.View>
          );
        }}
      />
      
      {/* Next Button */}
      <Button className="mt-4 border-radius-3xl" onPress={() => router.push('/')}>
        <Text size="md" style={{ color: 'white', fontWeight:"bold"}}>Toliau</Text>
      </Button>
    </Box>
  );
};

export default categoriesScreen;
