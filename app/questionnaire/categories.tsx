import React, { useContext, useEffect, useState, useCallback } from "react";
import { router } from "expo-router";
import { ArrowLeft, ChevronDown } from "lucide-react-native";
import { StatusBar, Image, FlatList, Animated } from "react-native";

import { useCategorySelectionStore, useSyncCategories } from "../../store/useCategorySelectionStore";
import { TranslationContext } from "../../contexts/TranslationContext";
import { Box } from "@/components/ui/box";
import { HStack } from "@/components/ui/hstack";
import { Icon } from "@/components/ui/icon";
import { Pressable } from "@/components/ui/pressable";
import { Text } from "@/components/ui/text";
import { TouchableOpacity } from 'react-native';
import { showToast } from "~/components/Toast/showToast";

/**
 * 📝 Type Definitions for CategoryItem Props
 */
interface Category {
  id: number;
  categoryName: string;
  categoryDescription: string;
}

interface CategoryItemProps {
  item: Category;
  isSelected: boolean;
  expandedCategory: number | null;
  onToggleCategory: (id: number) => void;
  onToggleExpand: (id: number) => void;
}

/**
 * 📝 Optimized Category Item
 */
const CategoryItem: React.FC<CategoryItemProps> = React.memo(
  ({ item, isSelected, expandedCategory, onToggleCategory, onToggleExpand }) => {
    const handlePressCategory = () => onToggleCategory(item.id);
    const handlePressExpand = () => onToggleExpand(item.id);
    const isExpanded = expandedCategory === item.id;

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
                  ? require("../../assets/check-circle.png")
                  : require("../../assets/x-circle.png")
              }
              style={{ width: 22, height: 22, marginRight: 10 }}
            />
            <Text size="xl" style={{ color: "black", fontWeight: "bold", flex: 1, flexShrink: 1 }}>
              {item.categoryName}
            </Text>
            <Pressable hitSlop={20} onPress={handlePressExpand}>
              <Icon as={ChevronDown} size="lg" color="black" />
            </Pressable>
          </HStack>
        </Pressable>

        {isExpanded && (
          <Box className="p-4 bg-white" style={{ borderBottomLeftRadius: 18, borderBottomRightRadius: 18 }}>
            <Text size="md" style={{ color: "black", alignSelf: "center" }}>
              {item.categoryDescription}
            </Text>
          </Box>
        )}
      </Animated.View>
    );
  },
  (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected && prevProps.expandedCategory === nextProps.expandedCategory
);

function CategoriesScreen() {
  useEffect(() => {
    console.log("✅ [MOUNT] CategoriesScreen Mounted!");
    return () => console.log("❌ [UNMOUNT] CategoriesScreen Unmounted!");
  }, []);

  // ✅ Ensure categories are fetched into Zustand
  useSyncCategories(); // 🚀 THIS ENSURES `useCategorySelectionStore` HAS DATA!

  const { categories, selectedCategories, toggleCategory } = useCategorySelectionStore();
  const translationContext = useContext(TranslationContext);
  const translate = translationContext ? translationContext.translate : (t: string) => t;
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  // Memoized functions to prevent unnecessary re-renders
  const handleToggleCategory = useCallback((id: number) => toggleCategory(id), [toggleCategory]);
  const handleToggleExpand = useCallback((id: number) => setExpandedCategory((prev) => (prev === id ? null : id)), []);

  const goToQuestionsScreen = () => {
    if (selectedCategories.size === 0) {
      showToast(
        'error',                     // toast type
        translate('errOneCategory'), // title (translated)
        ''                           // optional subtitle (you can pass additional info or leave empty)
      );
      
      return;
    }

    console.log("🚀 Navigating to QuestionsScreen with selected categories.");

    // ✅ Navigate to `QuestionsScreen.tsx` (NOT directly to a question)
    router.replace({
      pathname: "/questionnaire/questions",
    });
  };

  // Display loading if categories are still empty
  if (!categories || categories.length === 0) {
    return <Text size="lg" style={{ textAlign: "center", marginTop: 20 }}>Loading categories...</Text>;
  }

  return (
    <Box className="align-center flex-1 justify-center p-4 pt-14" style={{ backgroundColor: "#FFFFFF" }}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />

      {/* Back button */}
      <Box className="absolute left-2 right-0 top-2 p-4">
        <HStack space="lg">
          <Pressable onPress={() => router.back()}>
            <Icon as={ArrowLeft} size="xl" color="black" style={{ width: 35, height: 35 }} />
          </Pressable>
        </HStack>
      </Box>

      {/* Header */}
      <Image source={require("../../assets/JUNG.png")} style={{ width: 120, height: 30, marginVertical: 25, alignSelf: "center" }} />
      <Text size="3xl" style={{ color: "black", alignSelf: "center", marginVertical: 20, fontWeight: "bold" }}>
        {translate("chooseCategory")}
      </Text>

      {/* Category List */}
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        extraData={{ expandedCategory, selectedCategories }}
        renderItem={({ item }: { item: Category }) => (
          <CategoryItem
            item={item}
            isSelected={selectedCategories.has(item.id)}
            expandedCategory={expandedCategory}
            onToggleCategory={handleToggleCategory}
            onToggleExpand={handleToggleExpand}
          />
        )}
      />

      {/* Next Button */}
      <TouchableOpacity
        onPress={goToQuestionsScreen}
        activeOpacity={0.85}
        style={{
          backgroundColor: '#18181B',
          borderRadius: 12,
          paddingVertical: 12,
          alignItems: 'center',
          marginTop: 12, // same as Tailwind's mt-3
        }}
      >
        <Text className="color-white font-semibold text-xl">
          {translate('next')}
        </Text>
      </TouchableOpacity>
    </Box>
  );
}

export default CategoriesScreen;
