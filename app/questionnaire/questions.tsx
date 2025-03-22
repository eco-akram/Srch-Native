import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useContext, useState } from 'react';
import { StatusBar, Image, FlatList, ActivityIndicator } from 'react-native';
import { BookMarked } from 'lucide-react-native';

import { useCategorySelectionStore } from '../../store/useCategorySelectionStore'; // ✅ Zustand for selected categories
import { useSync } from '@/hooks/useSync'; // ✅ Fetch categories from Zustand storage
import { TranslationContext } from '../../contexts/TranslationContext';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Icon } from '@/components/ui/icon';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';
import { TouchableOpacity } from 'react-native';
const QuestionsScreen = () => {
  const { selectedCategories } = useCategorySelectionStore(); // ✅ Read selected categories from Zustand
  const { data } = useSync(); // ✅ Fetch categories from global Zustand store
  const [loading, setLoading] = useState(false);
  const translationContext = useContext(TranslationContext);
  const translate = translationContext ? translationContext.translate : () => '';

  // ✅ Get the selected categories from `useSync`
  const selectedCategoryList = Array.from(selectedCategories)
    .map((id) => data.Categories?.find((category) => category.id === id))
    .filter((category) => category !== undefined);

  const fetchQuestions = async () => {
    setLoading(true);

    // Check if questions exist
    const allQuestions = data.Questions ? [...data.Questions] : [];

    setLoading(false);

    if (allQuestions.length > 0) {
      // Simply navigate to the questionnaire page without explicitly setting a question id.
      // The useQuestionFlow hook will then detect that no valid id is provided and default to the head of the linked list.
      router.replace('/questionnaire/[id]');
    } else {
      alert('No questions available.');
    }
  };



  return (
    <Box
      className="align-center flex-1 justify-center p-4 pt-14"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Back Button */}
      <Box className="absolute left-2 right-0 top-2 p-4">
        <HStack space="lg">
          <Pressable onPress={() => router.replace('/questionnaire/categories')}>
            <Icon
              as={ArrowLeft}
              size="xl"
              color="black"
              style={{ width: 35, height: 35 }}
            />
          </Pressable>
        </HStack>
      </Box>

      {/* Logo */}
      <Image
        source={require('../../assets/JUNG.png')}
        style={{
          width: 120,
          height: 30,
          marginVertical: 25,
          alignSelf: 'center',
        }}
      />

      {/* Title */}
      <Text
        size="3xl"
        style={{
          color: 'black',
          alignSelf: 'center',
          marginVertical: 20,
          fontWeight: 'bold',
        }}
      >
        {translate("choosenCategories")}
      </Text>

      {/* Selected Category List */}
      <FlatList
        data={selectedCategoryList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Box
            className="flex-row p-4 bg-[#EAEAEA] mb-4 rounded-xl items-center gap-4"
            style={{ borderRadius: 18 }}
          >
            <BookMarked size={24} color="black" />
            <Box style={{ flex: 1 }}>
              <Text
                size="xl"
                style={{
                  color: 'black',
                  fontWeight: 'bold',
                  textAlign: 'left',
                }}
              >
                {item.categoryName}
              </Text>
              <Text
                size="md"
                style={{ color: 'black', textAlign: 'left', marginTop: 4 }}
              >
                {item.categoryDescription}
              </Text>
            </Box>
          </Box>
        )}
      />
      <TouchableOpacity
        onPress={fetchQuestions}
        disabled={loading}
        activeOpacity={0.85}
        style={{
          backgroundColor: loading ? '#2a2a2a' : '#18181B',
          borderRadius: 12,
          paddingVertical: 12,
          alignItems: 'center',
          marginTop: 12,
          opacity: loading ? 0.7 : 1, // dim button when loading
        }}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="color-white font-semibold text-xl">
            {translate('next')}
          </Text>
        )}
      </TouchableOpacity>
    </Box>
  );
};

export default QuestionsScreen;
