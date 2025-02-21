import React from 'react';
import { StatusBar, Image, FlatList } from 'react-native';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { Icon } from '@/components/ui/icon';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useCategories } from './CategoriesContext';

const QuestionsScreen = () => {
  const { selectedCategories, categories } = useCategories();

  const selectedCategoryList = categories.filter(category => selectedCategories.has(category.id));

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
      
        <Text size="3xl" style={{ color: 'black', alignSelf: 'center', marginVertical: 20, fontWeight: 'bold' }}>Pasirinktos kategorijos</Text>
      
      
      {/* Selected Category List */}
      <FlatList
        data={selectedCategoryList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Box className="p-4 bg-white mb-4" style={{ borderRadius: 18 }}>
            <Text size="xl" style={{ color: 'black', fontWeight: 'bold' }}>{item.name}</Text>
            <Text size="md" style={{ color: 'black' }}>{item.description}</Text>
          </Box>
        )}
      />
      
      {/* Next Button */}
      <Button className="mt-4" style={{ borderRadius: 24 }} onPress={() => router.push('/')}>
        <Text size="md" style={{ color: 'white', fontWeight:"bold"}}>Toliau</Text>
      </Button>
    </Box>
  );
};

export default QuestionsScreen;