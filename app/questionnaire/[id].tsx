import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StatusBar,
} from 'react-native';

import { useSync } from '@/hooks/useSync'; // ✅ Use global Sync Zustand store
import { useCategorySelectionStore } from '../../store/useCategorySelectionStore'; // ✅ Import category selection store
import { useAnswerStore } from '../../store/useAnswerStore'; // Import Zustand store
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
  const translate = translationContext ? translationContext.translate : () => '';

  const { data } = useSync(); 
  const { selectedCategories } = useCategorySelectionStore(); 
  const { setAnswer, calculateRecommendation } = useAnswerStore(); 
  const [answers, setAnswers] = useState<any[]>([]);

  const [selectedAnswers, setSelectedAnswers] = useState<Set<string>>(new Set());

  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Calculate progress
  const currentIndex = filteredQuestions.findIndex((q) => q.id === Number(id));
  const totalQuestions = filteredQuestions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100; 

  const handleAnswerSelection = (answerId: string) => {
    setSelectedAnswers((prev) => {
      const newSelectedAnswers = new Set(prev);
      if (newSelectedAnswers.has(answerId)) {
        newSelectedAnswers.delete(answerId); 
      } else {
        newSelectedAnswers.add(answerId); 
      }
      return newSelectedAnswers;
    });
  };

  useEffect(() => {
    if (!id || !data.Questions || !data.Answers) return;
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
    }

    setLoading(false);

    return () => {
      setFilteredQuestions([]);
      setAnswers([]);
      setQuestion(null);
      setSelectedAnswers(new Set());
      setLoading(true);
    };
  }, [id, data.Questions, data.Answers, selectedCategories]);

  // ✅ Handle answer selection (Navigate to next filtered question or summary)
  const handleNextQuestion = async () => {
    console.log(`Number of selected answers: ${selectedAnswers.size}`);

    setAnswer(id as string, Array.from(selectedAnswers));

    const currentIndex = filteredQuestions.findIndex(
      (q) => q.id === Number(id),
    );
    const nextQuestion = filteredQuestions[currentIndex + 1];

    if (nextQuestion) {
      router.replace({
        pathname: '/questionnaire/[id]',
        params: { id: nextQuestion.id },
      });
    } else {
      console.log("🎯 Reached the end of the questionnaire, calculating results...");
      await calculateRecommendation(); // ✅ Calculate the recommendation before navigating
      router.replace('/questionnaire/result'); 
    }

    setSelectedAnswers(new Set());
  };

  if (loading) {
    return (
      <Box className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="black" />
      </Box>
    );
  }

  return (
    <Box className="flex-1 p-4 pt-14" style={{ backgroundColor: '#FFFFFF' }}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      <Box className="absolute left-2 right-0 top-2 p-4">
        <HStack space="lg">
          <Pressable onPress={() => router.back()}>
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
        renderItem={({ item }) => (
          <Pressable
            className="bg-white rounded-xl mt-3 p-2 px-2 border-[#18181B] border"
            style={{
              backgroundColor: selectedAnswers.has(item.id)
                ? '#18181B'
                : '#FFFFFF',
            }}
            onPress={() => handleAnswerSelection(item.id)}
          >
            <Text
              className={`font-semibold text-xl text-center 
      ${selectedAnswers.has(item.id) ? 'text-white' : 'text-black'}`}
            >
              {item.answerText}
            </Text>
          </Pressable>
        )}
        initialNumToRender={10}
        maxToRenderPerBatch={5}
        windowSize={5}
        removeClippedSubviews
      />

      <Button
        className="bg-[#18181B] rounded-xl mt-3"
        variant="outline"
        size="xl"
        onPress={handleNextQuestion}
      >
        <Text className="color-white font-semibold text-xl">{translate("next")}</Text>
      </Button>
    </Box>
  );
};

export default QuestionScreen;
