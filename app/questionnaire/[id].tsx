import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useContext } from "react";
import { ActivityIndicator, FlatList, Pressable, StatusBar } from "react-native";

import { useQuestionFlow } from "@/hooks/useQuestionFlow"; // Custom hook for the questionnaire flow and logic from other zustand store files
import { TranslationContext } from "../../contexts/TranslationContext";
import { ArrowLeft } from "lucide-react-native";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { Progress, ProgressFilledTrack } from "@/components/ui/progress";
import { HStack } from "~/components/ui/hstack";

const QuestionScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const translationContext = useContext(TranslationContext);
  const translate = translationContext ? translationContext.translate : (t: string) => t;

  // Use the custom hook to handle the entire questionnaire flow
  const {
    loading,
    currentQuestion,
    currentAnswers,
    currentCategory,
    filteredQuestions,
    selectedAnswers,
    handleAnswerSelection,
    goToNextQuestion,
    goToPreviousQuestion,
  } = useQuestionFlow(String(id));

  // Calculate current index and progress based on filteredQuestions
  const currentIndex = filteredQuestions.findIndex((q: any) => q.id === Number(id));
  const totalQuestions = filteredQuestions.length;
  const progress = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;

  if (loading) {
    return (
      <Box className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="black" />
      </Box>
    );
  }

  return (
    <Box className="flex-1 p-4 pt-14" style={{ backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Back Button */}
      <Box className="absolute left-2 right-0 top-2 p-4">
        <HStack space="lg">
          <Pressable onPress={goToPreviousQuestion}>
            <ArrowLeft size={35} color="black" style={{ width: 35, height: 35 }} />
          </Pressable>
        </HStack>
      </Box>

      {/* current category */}
      {currentCategory && (
        <Box className="mt-6 mb-4">
          <Text className="text-2xl font-bold text-center text-gray-600">
            {currentCategory}
          </Text>
        </Box>
      )}
      {/* Progress and Question Count */}
      <Box className="flex-row justify-between items-center pt-10 pb-11">
        <Box className="flex-1">
          <Progress value={progress} size="md" orientation="horizontal" className="w-full bg-[#EAEAEA] h-4">
            <ProgressFilledTrack className="h-2 bg-[#017AFF]" />
          </Progress>
        </Box>
        <Text className="font-bold color-secondaryText min-w-[60px] text-right">
          {currentIndex + 1}/{totalQuestions}
        </Text>
      </Box>

      {/* Current Question */}
      <Text className="font-bold text-center text-3xl text-black mb-4">
        {currentQuestion?.questionText}
      </Text>

      {/* Answer List */}
      <FlatList
        data={currentAnswers} 
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            className="bg-white rounded-xl mt-4 p-2 px-2 border-[#18181B] border"
            style={{
              backgroundColor: selectedAnswers.has(item.id.toString()) ? "#18181B" : "#FFFFFF",
            }}
            onPress={() => handleAnswerSelection(item.id.toString())}
          >
            <Text
              className={`font-semibold text-xl text-center ${selectedAnswers.has(item.id.toString()) ? "text-white" : "text-black"
                }`}
            >
              {item.answerText}
            </Text>
          </Pressable>
        )}
      />

      {/* Next Button */}
      <Button className="bg-[#18181B] rounded-xl mt-3" variant="outline" size="xl" onPress={goToNextQuestion}>
        <Text className="color-white font-semibold text-xl">
          {translate("next")}
        </Text>
      </Button>
    </Box>
  );
};

export default QuestionScreen;
