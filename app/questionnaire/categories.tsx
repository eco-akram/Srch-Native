import React, { useEffect, useState } from 'react';
import { StatusBar, Image, FlatList, Animated } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft, ChevronDown } from 'lucide-react-native';
import { router } from 'expo-router';
import { useCategories } from './CategoriesContext';

const CategoriesScreen = () => {
  const { categories, setCategories, selectedCategories, setSelectedCategories } = useCategories();
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
      { id: 5, name: 'Jungiklių laikmačiai', description: 'Automatizuoti jungikliai.' },
      { id: 6, name: 'Vartotojo Valdymas', description: 'Automatizuoti jungikliai.' },
      { id: 7, name: 'Vartotojo konfigūravimo galimybės', description: 'Automatizuoti jungikliai.' },
      { id: 8, name: 'Būvimo namie imitacija', description: 'Automatizuoti jungikliai.' },
      { id: 9, name: 'Perjungimas', description: 'Automatizuoti jungikliai.' },
      { id: 10, name: 'Pritemdymas', description: 'Automatizuoti jungikliai.' },
      { id: 11, name: 'Spalvų atspalviai', description: 'Automatizuoti jungikliai.' },
      { id: 12, name: 'Signalizacija', description: 'Automatizuoti jungikliai.' },
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
      
        <Text size="3xl" style={{ color: 'black', alignSelf: 'center', marginVertical: 20, fontWeight: 'bold' }}>Pasirinkite kategorijas</Text>
      
      
      {/* Category List */}
      <FlatList
  data={categories}
  keyExtractor={(item) => item.id.toString()}
  renderItem={({ item }) => {
    const borderColor = borderAnimations[item.id]?.interpolate({
      inputRange: [0, 1],
      outputRange: ['#D3D3D3', '#1EB20A']
    });

    const isSelected = selectedCategories.has(item.id);

    return (
      <Animated.View
      style={{
        borderWidth: 2,
        borderRadius: 18,
        borderColor: borderColor || '#D3D3D3',
        marginBottom: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 5 }, // Tiny shadow below
        shadowOpacity: 0.5, // Very subtle
        shadowRadius: 3, // Small blur for smooth effect
        elevation: 3, // Minimal elevation for Android
      }}
    >
    

        <Pressable
          className="bg-white p-4"
          onPress={() => toggleSelection(item.id)}
          style={{
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            borderBottomLeftRadius: expandedCategory === item.id ? 0 : 18,
            borderBottomRightRadius: expandedCategory === item.id ? 0 : 18,
          }}
        >
          <HStack className="justify-between items-center">
            <Image
              source={isSelected ? require('../../assets/check-circle.png') : require('../../assets/x-circle.png')}
              style={{ width: 22, height: 22, marginRight: 10 }}
            />
            <Text size="xl" style={{ color: 'black', fontWeight: 'bold', flex: 1, flexShrink: 1 }}>
              {item.name}
            </Text>
            <Pressable hitSlop={20} onPress={() => toggleExpand(item.id)}>
              <Icon as={ChevronDown} size={'lg'} color="black" />
            </Pressable>
          </HStack>
        </Pressable>
        {expandedCategory === item.id && (
          <Box className="p-4 bg-white"
          style={{
            borderBottomLeftRadius: 18,
            borderBottomRightRadius: 18,
          }}>
            <Text size="md" style={{color: 'black', alignSelf: "center" }}>{item.description}</Text>
          </Box>
        )}
      </Animated.View>
    );
  }}
/>
      
      {/* Next Button */}
      <Button className="mt-4" style={{ borderRadius: 24 }} onPress={() => router.push('/questionnaire/questions')}>
        <Text size="md" style={{ color: 'white', fontWeight:"bold"}}>Toliau</Text>
      </Button>
    </Box>
  );
};

export default CategoriesScreen;