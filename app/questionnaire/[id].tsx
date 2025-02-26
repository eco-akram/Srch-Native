import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";

import { useSync } from "@/hooks/useSync"; // ✅ Use global Sync Zustand store
import { useCategorySelectionStore } from "../../store/useCategorySelectionStore"; // ✅ Import category selection store
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

const QuestionScreen = () => {
  const { id } = useLocalSearchParams(); // ✅ Get question ID from URL
  const router = useRouter();
  const { data } = useSync(); // ✅ Use global Zustand storage
  const { selectedCategories } = useCategorySelectionStore(); // ✅ Get selected categories

  const [filteredQuestions, setFilteredQuestions] = useState<any[]>([]);
  const [question, setQuestion] = useState<any>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id || !data.Questions || !data.Answers) return;

    // ✅ Filter questions by selected categories
    const questionsForSelectedCategories = data.Questions.filter((q) =>
      selectedCategories.has(q.categoryId)
    );

    setFilteredQuestions(questionsForSelectedCategories);

    // ✅ Find the current question within filtered questions
    const currentQuestion = questionsForSelectedCategories.find(
      (q) => q.id === Number(id)
    );

    if (currentQuestion) {
      setQuestion(currentQuestion);
      // ✅ Get answers for this question
      const questionAnswers = data.Answers.filter(
        (a) => a.questionsId === Number(id)
      );
      setAnswers(questionAnswers);
    } 
    setLoading(false);
  }, [id, data.Questions, data.Answers, selectedCategories]); // ✅ Reacts to state changes in Zustand

  // ✅ Handle answer selection (Navigate to next filtered question or summary)
  const handleNextQuestion = () => {
    const currentIndex = filteredQuestions.findIndex((q) => q.id === Number(id));
    const nextQuestion = filteredQuestions[currentIndex + 1];

    if (nextQuestion) {
      router.push({
        pathname: "/questionnaire/[id]",
        params: { id: nextQuestion.id },
      }); // ✅ Go to next question
    } else {
      router.push("/questionnaire/categories"); // ✅ Redirect to results page (or summary)
    }
  };

  if (loading) {
    return (
      <Box className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="black" />
      </Box>
    );
  }

  return (
    <Box className="flex-1 p-4" style={{ backgroundColor: "#F1EBE5" }}>
      {/* Question Title */}
      <Text
        size="2xl"
        style={{ fontWeight: "bold", textAlign: "center", marginBottom: 20 }}
      >
        {question?.questionText}
      </Text>

      {/* Answers List */}
      <FlatList
        data={answers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Button
            className="mb-4"
            style={{ borderRadius: 16 }}
            onPress={handleNextQuestion}
          >
            <Text size="lg" style={{ color: "white" }}>
              {item.answerText}
            </Text>
          </Button>
        )}
      />

      {/* Next Button */}
      <Button
        className="mt-6"
        style={{ borderRadius: 16 }}
        onPress={handleNextQuestion}
      >
        <Text size="lg" style={{ color: "white", textAlign: "center" }}>
          Next
        </Text>
      </Button>
    </Box>
  );
};

export default QuestionScreen;
