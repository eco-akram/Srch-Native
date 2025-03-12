import React, { useContext, useEffect, useState, useCallback } from 'react';
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

/**
 * 📝 A memoized CategoryItem that only re-renders if:
 *  1) `isSelected` changes for this item, or
 *  2) this item was or is the expandedCategory
 */
const CategoryItem = React.memo(
  function CategoryItem({
    item,
    isSelected,
    expandedCategory,
    onToggleCategory,
    onToggleExpand,
  }: {
    item: {
      id: number;
      categoryName: string;
      categoryDescription: string;
    };
    isSelected: boolean;              // Whether this item is selected
    expandedCategory: number | null; // Which ID is expanded
    onToggleCategory: (id: number) => void;
    onToggleExpand: (id: number) => void;
  }) {
  
    const handlePressCategory = () => {
      onToggleCategory(item.id);
    };

    const handlePressExpand = () => {
      onToggleExpand(item.id);
    };

    const isExpanded = expandedCategory === item.id;

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
          onPress={handlePressCategory}
          style={{
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            borderBottomLeftRadius: isExpanded ? 0 : 18,
            borderBottomRightRadius: isExpanded ? 0 : 18,
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
            <Pressable hitSlop={20} onPress={handlePressExpand}>
              <Icon as={ChevronDown} size="lg" color="black" />
            </Pressable>
          </HStack>
        </Pressable>

        {isExpanded && (
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
  },
  // 📝 A custom compare function to only re-render the item if:
  // 1) isSelected changed, or
  // 2) this item was the old expandedCategory OR is the new expandedCategory
  (prevProps, nextProps) => {
    // If selection changed, must re-render
    if (prevProps.isSelected !== nextProps.isSelected) {
      return false;
    }

    // If previously expanded or newly expanded, re-render
    const prevIsExpanded = prevProps.expandedCategory === prevProps.item.id;
    const nextIsExpanded = nextProps.expandedCategory === nextProps.item.id;
    if (prevIsExpanded !== nextIsExpanded) {
      return false;
    }

    // Otherwise, skip re-render
    return true;
  }
);

function CategoriesScreen() {
  // 📝 Real mount/unmount logs
  useEffect(() => {
    console.log('✅ [MOUNT] Component truly mounted!');
    return () => {
      console.log('❌ [UNMOUNT] Component truly unmounted!');
    };
  }, []);

  const { data } = useSync();
  const { categories, setCategories, selectedCategories, toggleCategory } =
    useCategorySelectionStore();
  const translationContext = useContext(TranslationContext);
  const translate = translationContext ? translationContext.translate : () => '';

  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  // ✅ Only set categories if they're empty in Zustand & we have new data
  useEffect(() => {
 
    if (categories.length === 0 && data.Categories && data.Categories.length > 0) {
 
      setCategories(data.Categories);
    }
  }, [categories.length, data.Categories, setCategories]);

  // ✅ Memoize toggles so they don't create new function references each time
  const handleToggleCategory = useCallback(
    (id: number) => {
      toggleCategory(id);
    },
    [toggleCategory]
  );

  const handleToggleExpand = useCallback(
    (id: number) => {
      setExpandedCategory((prev) => (prev === id ? null : id));
    },
    []
  );

  const goToQuestionsScreen = () => {
    if (selectedCategories.size === 0) {
      alert(translate('errOneCategory'));
      return;
    }
    router.push('/questionnaire/questions');
  };

  // 📝 If categories are empty, show a loading text
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

      {/* 
        Pressable for back arrow 
      */}
      <Box className="absolute left-2 right-0 top-2 p-4">
        <HStack space="lg">
          <Pressable onPress={() => router.back()}>
            <Icon as={ArrowLeft} size="xl" color="black" style={{ width: 35, height: 35 }} />
          </Pressable>
        </HStack>
      </Box>

      {/* 
        Header image & Title
      */}
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

      {/* 
        FlatList of categories
      */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        // ✅ Only re-render items if 'expandedCategory' or 'selectedCategories' changes relevantly
        extraData={{ expandedCategory, selectedCategories }}
        renderItem={({ item }) => {
          const isSelected = selectedCategories.has(item.id);
          return (
            <CategoryItem
              item={item}
              isSelected={isSelected}
              expandedCategory={expandedCategory}
              onToggleCategory={handleToggleCategory}
              onToggleExpand={handleToggleExpand}
            />
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
}

export default CategoriesScreen;