import { useEffect, useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { useSync } from "@/hooks/useSync";
import { useCategorySelectionStore } from "../store/useCategorySelectionStore";
import { useAnswerStore } from "../store/useAnswerStore";

export interface Question {
  id: number;
  questionText: string;
  categoryId: number;
}

export interface Answer {
  id: number;
  answerText: string;
  questionsId: number;
}

// A doubly-linked list node for your Question
interface QuestionNode {
  question: Question;
  prev: QuestionNode | null;
  next: QuestionNode | null;
}

function buildLinkedList(questions: Question[]): QuestionNode | null {
  if (questions.length === 0) return null;

  // Create nodes for each question
  const nodes: QuestionNode[] = questions.map((question) => ({
    question,
    prev: null,
    next: null,
  }));

  // Link them (doubly)
  for (let i = 0; i < nodes.length - 1; i++) {
    nodes[i].next = nodes[i + 1];
    nodes[i + 1].prev = nodes[i];
  }

  // Return head of the linked list
  return nodes[0];
}

function findNodeByQuestionId(head: QuestionNode | null, id: number): QuestionNode | null {
  let current = head;
  while (current) {
    if (current.question.id === id) return current;
    current = current.next;
  }
  return null;
}

export function useQuestionFlow(questionId: string) {
  const router = useRouter();
  const { selectedCategories, categories } = useCategorySelectionStore();
  const { setAnswer, getAnswer, calculateRecommendation, setLastQuestionId, lastQuestionId } = useAnswerStore();
  const { data } = useSync();

  // Store the entire filtered list separately (for wherever it's still needed).
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

  // Linked list tracking
  const [questionListHead, setQuestionListHead] = useState<QuestionNode | null>(null);
  const [currentNode, setCurrentNode] = useState<QuestionNode | null>(null);

  // State for the currently displayed question
  const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Make sure we have the data we need
    if (!data.Questions || !data.Answers) {
      setLoading(false);
      return;
    }

    // Determine the order of selected categories
    const orderedCategories = Array.from(selectedCategories)
      .map((catId) => data.Categories.find((cat) => cat.id === catId))
      .filter(Boolean)
      .map((cat) => cat!.id);

    // Combine all the questions from the selected categories, in order
    let combinedQuestions: Question[] = [];
    for (const catId of orderedCategories) {
      const catQuestions = data.Questions
        .filter((q) => q.categoryId === catId)
        .sort((a, b) => a.id - b.id);
      combinedQuestions.push(...catQuestions);
    }

    // Save them so you can still access them in your component if needed
    setFilteredQuestions(combinedQuestions);

    // Build the linked list from the combinedQuestions array
    const head = buildLinkedList(combinedQuestions);
    setQuestionListHead(head);

    // Decide which question ID to start on
    let desiredId = Number(questionId);
    // If no valid questionId or question not in the list, default to the first (head)
    if (!desiredId || !findNodeByQuestionId(head, desiredId)) {
      desiredId = head?.question.id ?? 0; // fallback if there's at least one question
      if (desiredId) {
        router.replace({ pathname: "/questionnaire/[id]", params: { id: String(desiredId) } });
        return;
      }
    }

    // Now find the node in the linked list for the current question ID
    const node = findNodeByQuestionId(head, desiredId);
    setCurrentNode(node || null);

    if (node) {
      // Set up the question/answers in state
      setCurrentCategory(
        categories.find((cat) => cat.id === node.question.categoryId)?.categoryName || null
      );
      setCurrentAnswers(data.Answers.filter((ans) => ans.questionsId === node.question.id));
      setSelectedAnswers(new Set(getAnswer(String(node.question.id))));
      setLastQuestionId(String(node.question.id));
    }

    setLoading(false);
  }, [
    questionId,
    data.Questions,
    data.Answers,
    selectedCategories,
    categories,
    getAnswer,
    setLastQuestionId,
    lastQuestionId,
    router,
  ]);

  const goToNextQuestion = useCallback(async () => {
    if (!currentNode) return;

    // Save the current question's selected answers
    setAnswer(String(currentNode.question.id), Array.from(selectedAnswers));

    // If there's a "next" node, navigate to that question. Otherwise, we're done.
    if (currentNode.next) {
      router.replace({
        pathname: "/questionnaire/[id]",
        params: { id: String(currentNode.next.question.id) },
      });
    } else {
      // Reached the end, calculate recommendation
      await calculateRecommendation();
      router.replace("/questionnaire/result");
    }
  }, [currentNode, selectedAnswers, setAnswer, calculateRecommendation, router]);

  const goToPreviousQuestion = useCallback(() => {
    if (!currentNode) return;

    // Save the current question's selected answers
    setAnswer(String(currentNode.question.id), Array.from(selectedAnswers));

    // If there's a "prev" node, navigate to that question; otherwise, go back to categories
    if (currentNode.prev) {
      router.replace({
        pathname: "/questionnaire/[id]",
        params: { id: String(currentNode.prev.question.id) },
      });
    } else {
      router.replace("/questionnaire/categories");
    }
  }, [currentNode, selectedAnswers, setAnswer, router]);

  // Each time the questionId changes (via router), re-locate the node and re-init answers
  useEffect(() => {
    if (!questionListHead || !questionId) return;
    const node = findNodeByQuestionId(questionListHead, Number(questionId));
    if (node) {
      setCurrentNode(node);
      setCurrentCategory(
        categories.find((cat) => cat.id === node.question.categoryId)?.categoryName || null
      );
      setCurrentAnswers(data.Answers.filter((ans) => ans.questionsId === node.question.id));
      setSelectedAnswers(new Set(getAnswer(String(node.question.id))));
      setLastQuestionId(String(node.question.id));
    }
  }, [
    questionId,
    questionListHead,
    categories,
    data.Answers,
    getAnswer,
    setLastQuestionId,
  ]);

  const handleAnswerSelection = useCallback(
    (answerId: string) => {
      setSelectedAnswers((prev) => {
        const newSet = new Set(prev);
        newSet.has(answerId) ? newSet.delete(answerId) : newSet.add(answerId);
        return newSet;
      });
    },
    [setSelectedAnswers]
  );

  return {
    loading,
    currentQuestion: currentNode?.question || null,
    currentAnswers,
    currentCategory,
    selectedAnswers,
    filteredQuestions,

    handleAnswerSelection,
    goToNextQuestion,
    goToPreviousQuestion,
  };
}
