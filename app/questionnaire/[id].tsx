import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StatusBar,
} from 'react-native';

import { useSync } from '@/hooks/useSync';
import { useCategorySelectionStore } from '../../store/useCategorySelectionStore';
import { useAnswerStore } from '../../store/useAnswerStore';
import { TranslationContext } from '../../contexts/TranslationContext';
import { ArrowLeft } from 'lucide-react-native';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';
import { HStack } from '~/components/ui/hstack';

const QuestionScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const translationContext = useContext(TranslationContext);
  const translate = translationContext
    ? translationContext.translate
    : () => '';

  const { data } = useSync();
  const { selectedCategories } = useCategorySelectionStore();
  const { setAnswer, getAnswer, calculateRecommendation, setLastQuestionId } =
    useAnswerStore();

  const [answers, setAnswers] = useState<any[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<Set<string>>(
    new Set(),
  );
  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const currentIndex = filteredQuestions.findIndex((q) => q.id === Number(id));
  const totalQuestions = filteredQuestions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100;

  const handleAnswerSelection = useCallback((answerId: string) => {
    setSelectedAnswers((prev) => {
      const newSelectedAnswers = new Set(prev);
      if (newSelectedAnswers.has(answerId)) {
        newSelectedAnswers.delete(answerId);
      } else {
        newSelectedAnswers.add(answerId);
      }
      return newSelectedAnswers;
    });
  }, []);

  useEffect(() => {
    if (!id || !data.Questions || !data.Answers) return;

    setLoading(true);

    const questionsForSelectedCategories = data.Questions.filter((q) =>
      selectedCategories.has(q.categoryId),
    );

    setFilteredQuestions(questionsForSelectedCategories);

    const currentQuestion = questionsForSelectedCategories.find(
      (q) => q.id === Number(id),
    );

    if (currentQuestion) {
      setQuestion(currentQuestion);

      const questionAnswers = data.Answers.filter(
        (a) => a.questionsId === Number(id),
      );
      setAnswers(questionAnswers);

      // Restore previously selected answers from the store
      const savedAnswers = getAnswer(id as string);
      setSelectedAnswers(new Set(savedAnswers));
      console.log(
        `🌀 Restoring saved answers for question ${id}:`,
        savedAnswers,
      );

      // Set the last question ID in the store for proper back navigation
      setLastQuestionId(id.toString());
    }

    setLoading(false);
  }, [
    id,
    data.Questions,
    data.Answers,
    selectedCategories,
    getAnswer,
    setLastQuestionId,
  ]);

  const handleNextQuestion = async () => {
    setAnswer(id as string, Array.from(selectedAnswers));

    const nextIndex =
      filteredQuestions.findIndex((q) => q.id === Number(id)) + 1;

    if (nextIndex < filteredQuestions.length) {
      router.replace({
        pathname: '/questionnaire/[id]',
        params: { id: filteredQuestions[nextIndex].id },
      });
    } else {
      await calculateRecommendation();
      router.replace('/questionnaire/result');
    }
  };

  const handlePreviousQuestion = () => {
    setAnswer(id as string, Array.from(selectedAnswers));

    const prevIndex =
      filteredQuestions.findIndex((q) => q.id === Number(id)) - 1;

    if (prevIndex >= 0) {
      router.replace({
        pathname: '/questionnaire/[id]',
        params: { id: filteredQuestions[prevIndex].id },
      });
    } else {
      router.back();
    }
  };

  const renderAnswerItem = useCallback(
    ({ item }: { item: any }) => (
      <Pressable
        className="bg-white rounded-xl mt-3 p-2 px-2 border-[#18181B] border"
        style={{
          backgroundColor: selectedAnswers.has(item.id) ? '#18181B' : '#FFFFFF',
        }}
        onPress={() => handleAnswerSelection(item.id)}
      >
        <Text
          className={`font-semibold text-xl text-center ${
            selectedAnswers.has(item.id) ? 'text-white' : 'text-black'
          }`}
        >
          {item.answerText}
        </Text>
      </Pressable>
    ),
    [selectedAnswers, handleAnswerSelection],
  );

  return loading ? (
    <Box className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="black" />
    </Box>
  ) : (
    <Box className="flex-1 p-4 pt-14" style={{ backgroundColor: '#FFFFFF' }}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <Box className="absolute left-2 right-0 top-2 p-4">
        <HStack space="lg">
          <Pressable onPress={handlePreviousQuestion}>
            <ArrowLeft
              size={35}
              color="black"
              style={{ width: 35, height: 35 }}
            />
          </Pressable>
        </HStack>
      </Box>

      <Box className="flex-row justify-between items-center pt-10 pb-11">
        <Box className="flex-1">
          <Progress
            value={progress}
            size="md"
            orientation="horizontal"
            className="w-full bg-[#EAEAEA] h-4"
          >
            <ProgressFilledTrack className="h-2 bg-[#017AFF]" />
          </Progress>
        </Box>
        <Text className="font-bold color-secondaryText min-w-[60px] text-right">
          {currentIndex + 1}/{totalQuestions}
        </Text>
      </Box>

      <Text
        className="font-bold text-center text-3xl text-black mt-4"
        style={{ marginBottom: 55 }}
      >
        {question?.questionText}
      </Text>

      <FlatList
        data={answers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderAnswerItem}
        initialNumToRender={5}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
      />
      <Text className="text-center text-gray-600 mt-4">
      {translate("noButtonText")}
      </Text>

      <Button
        className="bg-[#18181B] rounded-xl mt-3"
        variant="outline"
        size="xl"
        onPress={handleNextQuestion}
      >
        <Text className="color-white font-semibold text-xl">
          {translate('next')}
        </Text>
      </Button>
    </Box>
  );
};

export default QuestionScreen;
