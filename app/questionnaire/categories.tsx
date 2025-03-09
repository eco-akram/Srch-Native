import React, { useContext, useEffect, useState, useRef } from 'react';
import { router } from 'expo-router';
import { ArrowLeft, ChevronDown } from 'lucide-react-native';
import { StatusBar, Image, FlatList, Animated } from 'react-native';

import { useSync } from '@/hooks/useSync';
import { useCategorySelectionStore } from '../../store/useCategorySelectionStore';
import { TranslationContext } from '../../contexts/TranslationContext';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';

const CategoriesScreen = () => {
  const { data } = useSync();
  const { categories, setCategories, selectedCategories, toggleCategory } =
    useCategorySelectionStore();
  const translationContext = useContext(TranslationContext);
  const translate = translationContext ? translationContext.translate : () => '';

  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    if (data.Categories && data.Categories.length > 0) {
      const areCategoriesEqual = JSON.stringify(categories) === JSON.stringify(data.Categories);
      if (!areCategoriesEqual) {
        setCategories(data.Categories);
      }
    }
  }, [data.Categories, setCategories]);

  const toggleExpand = (id: number) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const goToQuestionsScreen = () => {
    if (selectedCategories.size === 0) {
      alert(translate('errOneCategory'));
      return;
    }
    router.push('/questionnaire/questions');
  };

  if (!categories || categories.length === 0) {
    return (
      <Text size="lg" style={{ textAlign: 'center', marginTop: 20 }}>
        Loading categories...
      </Text>
    );
  }

  return (
    <Box
      className="align-center flex-1 justify-center p-4 pt-14"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <Box className="absolute left-2 right-0 top-2 p-4">
        <HStack space="lg">
          <Pressable onPress={() => router.back()}>
            <Icon
              as={ArrowLeft}
              size="xl"
              color="black"
              style={{ width: 35, height: 35 }}
            />
          </Pressable>
        </HStack>
      </Box>

      <Image
        source={require('../../assets/JUNG.png')}
        style={{
          width: 120,
          height: 30,
          marginVertical: 25,
          alignSelf: 'center',
        }}
      />

      <Text
        size="3xl"
        style={{
          color: 'black',
          alignSelf: 'center',
          marginVertical: 20,
          fontWeight: 'bold',
        }}
      >
        {translate('chooseCategory')}
      </Text>

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const isSelected = selectedCategories.has(item.id);

          return (
            <Animated.View
              style={{
                borderWidth: 2,
                borderRadius: 18,
                borderColor: isSelected ? '#1EB20A' : '#D3D3D3',
                marginBottom: 10,
                backgroundColor: 'white',
                shadowColor: '#000',
                shadowOffset: { width: 1, height: 5 },
                shadowOpacity: 0.5,
                shadowRadius: 3,
                elevation: 3,
              }}
            >
              <Pressable
                className="bg-white p-4"
                onPress={() => toggleCategory(item.id)}
                style={{
                  borderTopLeftRadius: 18,
                  borderTopRightRadius: 18,
                  borderBottomLeftRadius: expandedCategory === item.id ? 0 : 18,
                  borderBottomRightRadius:
                    expandedCategory === item.id ? 0 : 18,
                }}
              >
                <HStack className="justify-between items-center">
                  <Image
                    source={
                      isSelected
                        ? require('../../assets/check-circle.png')
                        : require('../../assets/x-circle.png')
                    }
                    style={{ width: 22, height: 22, marginRight: 10 }}
                  />
                  <Text
                    size="xl"
                    style={{
                      color: 'black',
                      fontWeight: 'bold',
                      flex: 1,
                      flexShrink: 1,
                    }}
                  >
                    {item.categoryName}
                  </Text>
                  <Pressable hitSlop={20} onPress={() => toggleExpand(item.id)}>
                    <Icon as={ChevronDown} size="lg" color="black" />
                  </Pressable>
                </HStack>
              </Pressable>
              {expandedCategory === item.id && (
                <Box
                  className="p-4 bg-white"
                  style={{
                    borderBottomLeftRadius: 18,
                    borderBottomRightRadius: 18,
                  }}
                >
                  <Text
                    size="md"
                    style={{ color: 'black', alignSelf: 'center' }}
                  >
                    {item.categoryDescription}
                  </Text>
                </Box>
              )}
            </Animated.View>
          );
        }}
      />

      <Button
        className="bg-[#18181B] rounded-xl mt-3"
        variant="outline"
        size="xl"
        onPress={goToQuestionsScreen}
      >
        <Text className="color-white font-semibold text-xl">
          {translate('next')}
        </Text>
      </Button>
    </Box>
  );
};

export default CategoriesScreen;
