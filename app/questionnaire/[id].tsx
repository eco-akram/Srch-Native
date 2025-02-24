import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList } from "react-native";

import { useQuestionStore } from "@/store/useQuestionStore";
import { supabase } from "@/utils/supabase";

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";

const QuestionScreen = () => {
  const { id } = useLocalSearchParams(); // ✅ Get question ID from URL
  const router = useRouter();
  const { questions } = useQuestionStore(); // ✅ Get stored questions
  const [categoryName, setCategoryName] = useState<string | null>(null);
  const [question, setQuestion] = useState<any>(null);
  const [answers, setAnswers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    // Find the question in Zustand (faster) or fetch from Supabase
    const currentQuestion = questions.find((q) => q.id === Number(id));
    if (currentQuestion) {
      setQuestion(currentQuestion);
      fetchAnswers(currentQuestion.id);
    } else {
      fetchQuestion(Number(id));
    }
  }, [id, questions]);

  const fetchCategory = async (categoryId: number) => {
    const { data, error } = await supabase
      .from("Categories")
      .select("categoryName")
      .eq("id", categoryId)
      .single();
    if (error) console.error(error);
    setCategoryName(data?.categoryName || "Unknown Category");
  };

  // Fetch question if not in Zustand
  const fetchQuestion = async (questionId: number) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Questions")
      .select("*")
      .eq("id", questionId)
      .single();
    if (error) console.error(error);
    setQuestion(data);
    fetchAnswers(questionId);
  };

  // Fetch answers for the question
  const fetchAnswers = async (questionId: number) => {
    const { data, error } = await supabase
      .from("Answers")
      .select("*")
      .eq("questionsId", questionId);
    if (error) console.error(error);
    setAnswers(data || []);
    setLoading(false);
  };

  // Handle answer selection
  const handleAnswerSelect = () => {
    const currentIndex = questions.findIndex((q) => q.id === Number(id));
    const nextQuestion = questions[currentIndex + 1];

    if (nextQuestion) {
      router.push({
        pathname: "/questionnaire/[id]",
        params: { id: nextQuestion.id },
      }); // ✅ Go to next question
    } else {
      router.push("/questionnaire/categories"); // ✅ Redirect to results page (or summary)
    }
  };

  // Handle answer selection
  const handleNextQuestion = () => {
    const currentIndex = questions.findIndex((q) => q.id === Number(id));
    const nextQuestion = questions[currentIndex + 1];

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
            onPress={handleAnswerSelect}
          >
            <Text size="lg" style={{ color: "white" }}>
              {item.answerText}
            </Text>
          </Button>
        )}
      />
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
