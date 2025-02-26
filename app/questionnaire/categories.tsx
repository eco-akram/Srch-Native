import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import { ArrowLeft, ChevronDown } from "lucide-react-native";
import { StatusBar, Image, FlatList, Animated } from "react-native";

import { useSync } from "@/hooks/useSync"; // ✅ Fetch Categories globally
import { useCategorySelectionStore } from "../../store/useCategorySelectionStore"; // ✅ Zustand store for category selection

import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";

const CategoriesScreen = () => {
  const { data } = useSync(); // ✅ Fetch categories from Zustand
  const { categories, setCategories, selectedCategories, toggleCategory } =
    useCategorySelectionStore(); // ✅ Zustand store

  // ✅ Expanded category state for dropdown effect
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  // ✅ Sync categories from `useSync` to Zustand on mount
  useEffect(() => {
    if (data.Categories && data.Categories.length > 0) {
      setCategories(data.Categories);
    }
  }, [data.Categories, setCategories]);

  // ✅ Toggle category expansion
  const toggleExpand = (id: number) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  // ✅ Navigate to questions page while preserving selected categories
  const goToQuestionsScreen = () => {
    if (selectedCategories.size === 0) {
      alert("Pasirinkite bent vieną kategoriją.");
      return;
    }
    router.push("/questionnaire/questions");
  };

  if (!categories || categories.length === 0) {
    return (
      <Text size="lg" style={{ textAlign: "center", marginTop: 20 }}>
        Loading categories...
      </Text>
    );
  }

  return (
    <Box className="align-center flex-1 justify-center p-4" style={{ backgroundColor: "#F1EBE5" }}>
      <StatusBar backgroundColor="#C2C2C2" barStyle="dark-content" />

      {/* Back Button */}
      <Box className="absolute left-2 right-0 top-2 p-4">
        <HStack space="lg">
          <Pressable onPress={() => router.back()}>
            <Icon as={ArrowLeft} size="xl" color="black" style={{ width: 35, height: 35 }} />
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

      <Text size="3xl" style={{ color: "black", alignSelf: "center", marginVertical: 20, fontWeight: "bold" }}>
        Pasirinkite kategorijas
      </Text>

      {/* ✅ Category List */}
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
                borderColor: isSelected ? "#1EB20A" : "#D3D3D3",
                marginBottom: 10,
                backgroundColor: "white",
                shadowColor: "#000",
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
                  borderBottomRightRadius: expandedCategory === item.id ? 0 : 18,
                }}
              >
                <HStack className="justify-between items-center">
                  <Image
                    source={
                      isSelected
                        ? require("../../assets/check-circle.png")
                        : require("../../assets/x-circle.png")
                    }
                    style={{ width: 22, height: 22, marginRight: 10 }}
                  />
                  <Text size="xl" style={{ color: "black", fontWeight: "bold", flex: 1, flexShrink: 1 }}>
                    {item.categoryName}
                  </Text>
                  <Pressable hitSlop={20} onPress={() => toggleExpand(item.id)}>
                    <Icon as={ChevronDown} size="lg" color="black" />
                  </Pressable>
                </HStack>
              </Pressable>
              {expandedCategory === item.id && (
                <Box className="p-4 bg-white" style={{ borderBottomLeftRadius: 18, borderBottomRightRadius: 18 }}>
                  <Text size="md" style={{ color: "black", alignSelf: "center" }}>
                    {item.categoryDescription}
                  </Text>
                </Box>
              )}
            </Animated.View>
          );
        }}
      />

      {/* Next Button */}
      <Button className="mt-4" style={{ borderRadius: 24 }} onPress={goToQuestionsScreen}>
        <Text size="md" style={{ color: "white", fontWeight: "bold" }}>Toliau</Text>
      </Button>
    </Box>
  );
};

export default CategoriesScreen;
