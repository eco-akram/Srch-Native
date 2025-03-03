import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StatusBar,
} from 'react-native';

import { useSync } from '@/hooks/useSync'; // ✅ Use global Sync Zustand store
import { useCategorySelectionStore } from '../../store/useCategorySelectionStore'; // ✅ Import category selection store
import { useAnswerStore } from '../../store/useAnswerStore'; // Import Zustand store

import { CircleCheckBig } from 'lucide-react-native';
import { Circle } from 'lucide-react-native';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Progress, ProgressFilledTrack } from '@/components/ui/progress';

const QuestionScreen = () => {
  const { id } = useLocalSearchParams(); // ✅ Get question ID from URL
  const router = useRouter();

  const { data } = useSync(); // ✅ Use global Zustand storage
  const { selectedCategories } = useCategorySelectionStore(); // ✅ Get selected categories
  const { setAnswer, clearAnswers } = useAnswerStore(); // Add clearAnswers
  const [answers, setAnswers] = useState<any[]>([]);

  const [selectedAnswers, setSelectedAnswers] = useState<Set<string>>(
    new Set(),
  );

  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  const [question, setQuestion] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Calculate progress
  const currentIndex = filteredQuestions.findIndex((q) => q.id === Number(id));
  const totalQuestions = filteredQuestions.length;
  const progress = ((currentIndex + 1) / totalQuestions) * 100; // Progress in percentage

  const handleAnswerSelection = (answerId: string) => {
    setSelectedAnswers((prev) => {
      const newSelectedAnswers = new Set(prev);
      if (newSelectedAnswers.has(answerId)) {
        newSelectedAnswers.delete(answerId); // Deselect if already selected
      } else {
        newSelectedAnswers.add(answerId); // Select if not already selected
      }
      return newSelectedAnswers;
    });
  };

  useEffect(() => {
    if (!id || !data.Questions || !data.Answers) return;

    // ✅ Filter questions by selected categories
    const questionsForSelectedCategories = data.Questions.filter((q) =>
      selectedCategories.has(q.categoryId),
    );

    setFilteredQuestions(questionsForSelectedCategories);

    // ✅ Find the current question within filtered questions
    const currentQuestion = questionsForSelectedCategories.find(
      (q) => q.id === Number(id),
    );

    if (currentQuestion) {
      setQuestion(currentQuestion);
      // ✅ Get answers for this question
      const questionAnswers = data.Answers.filter(
        (a) => a.questionsId === Number(id),
      );
      setAnswers(questionAnswers);
    }
    setLoading(false);
  }, [id, data.Questions, data.Answers, selectedCategories]); // ✅ Reacts to state changes in Zustand

  // ✅ Handle answer selection (Navigate to next filtered question or summary)
  const handleNextQuestion = () => {
    console.log(`Number of selected answers: ${selectedAnswers.size}`);

    // ✅ Save selected answers to Zustand store
    setAnswer(id as string, Array.from(selectedAnswers));

    // ✅ Navigate to next question
    const currentIndex = filteredQuestions.findIndex(
      (q) => q.id === Number(id),
    );
    const nextQuestion = filteredQuestions[currentIndex + 1];

    if (nextQuestion) {
      router.push({
        pathname: '/questionnaire/[id]',
        params: { id: nextQuestion.id },
      });
    } else {
      // ✅ If this is the last question, clear the answers in Zustand
      clearAnswers(); // Clear the answers
      router.push('/questionnaire/result'); // Redirect to summary or categories page
    }

    // ✅ Reset selected answers for the next question
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
      <Box className="flex-row justify-between items-center pb-11">
        {/* Progress Bar */}

        <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

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

        {/* Progress Count */}
        <Text className="font-bold color-secondaryText  min-w-[60px] text-right">
          {currentIndex + 1}/{totalQuestions}
        </Text>
      </Box>

      {/* Question Title */}
      <Text
        className="font-bold text-center text-3xl text-black mt-4"
        style={{ marginBottom: 55 }}
      >
        {question?.questionText}
      </Text>

      {/* Answers List */}
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
      />

      {/* Next Button */}
      <Button
        className="bg-[#18181B] rounded-xl mt-3"
        variant="outline"
        size="xl"
        onPress={handleNextQuestion}
      >
        <Text className="color-white font-semibold text-xl">Toliau</Text>
      </Button>
    </Box>
  );
};

export default QuestionScreen;
