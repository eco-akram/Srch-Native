import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import React, { useState } from "react";
import { StatusBar, Image, FlatList, ActivityIndicator } from "react-native";

import { useCategorySelectionStore } from "../../store/useCategorySelectionStore"; // ✅ Zustand for selected categories
import { useSync } from "@/hooks/useSync"; // ✅ Fetch categories from Zustand storage

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

const QuestionsScreen = () => {
  const { selectedCategories } = useCategorySelectionStore(); // ✅ Read selected categories from Zustand
  const { data } = useSync(); // ✅ Fetch categories from global Zustand store
  const [loading, setLoading] = useState(false);

  // ✅ Get the selected categories from `useSync`
  const selectedCategoryList = data.Categories
    ? data.Categories.filter((category) => selectedCategories.has(category.id))
    : [];

  // ✅ Fetch Questions based on selected categories
  const fetchQuestions = async () => {
    setLoading(true);
  
    // ✅ Fetch filtered questions from useSync() directly
    const filteredQuestions = data.Questions
      ? data.Questions.filter((q) => selectedCategories.has(q.categoryId))
      : [];
  
    setLoading(false);
  
    if (filteredQuestions.length > 0) {
      router.push({
        pathname: "/questionnaire/[id]",
        params: { id: filteredQuestions[0].id }, // ✅ Start with first question
      });
    } else {
      alert("No questions found for the selected categories.");
    }
  };
  

  return (
    <Box
      className="align-center flex-1 justify-center p-4"
      style={{ backgroundColor: "#F1EBE5" }}
    >
      <StatusBar backgroundColor="#C2C2C2" barStyle="dark-content" />

      {/* Back Button */}
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

      {/* Logo */}
      <Image
        source={require("../../assets/JUNG.png")}
        style={{
          width: 120,
          height: 30,
          marginVertical: 25,
          alignSelf: "center",
        }}
      />

      {/* Title */}
      <Text
        size="3xl"
        style={{
          color: "black",
          alignSelf: "center",
          marginVertical: 20,
          fontWeight: "bold",
        }}
      >
        Pasirinktos kategorijos
      </Text>

      {/* Selected Category List */}
      <FlatList
        data={selectedCategoryList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Box className="p-4 bg-white mb-4" style={{ borderRadius: 18 }}>
            <Text
              size="xl"
              style={{ color: "black", fontWeight: "bold", textAlign: "left" }}
            >
              {item.categoryName}
            </Text>
            <Text
              size="md"
              style={{ color: "black", textAlign: "left", marginTop: 4 }}
            >
              {item.categoryDescription}
            </Text>
          </Box>
        )}
      />

      {/* Next Button */}
      <Button
        className="mt-4"
        style={{ borderRadius: 24 }}
        onPress={fetchQuestions}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text size="md" style={{ color: "white", fontWeight: "bold" }}>
            Toliau
          </Text>
        )}
      </Button>
    </Box>
  );
};

export default QuestionsScreen;
