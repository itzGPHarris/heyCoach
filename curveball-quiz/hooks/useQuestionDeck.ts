import { useState, useCallback } from 'react';
import { Question, QuestionDifficulty } from '../types';
import { getQuestionsByDifficulty, getRandomQuestion } from '../data/questions';

interface QuestionDeck {
  getQuestion: (difficulty: QuestionDifficulty) => Question | null;
  resetDeck: () => void;
  questionCounts: Record<QuestionDifficulty, number>;
  totalQuestions: number;
}

/**
 * Hook to manage a deck of questions for the game
 * - Prevents duplicate questions in a game
 * - Tracks how many questions of each difficulty have been used
 * - Provides a method to get a random question of specified difficulty
 */
export const useQuestionDeck = (): QuestionDeck => {
  // Store questions that have been used in the current game
  const [usedQuestionIds, setUsedQuestionIds] = useState<Set<string>>(new Set());
  
  // Track how many questions of each difficulty have been used
  const [questionCounts, setQuestionCounts] = useState<Record<QuestionDifficulty, number>>({
    Single: 0,
    Double: 0,
    Triple: 0,
    Homerun: 0,
  });
  
  // Get a random question of the specified difficulty that hasn't been used yet
  const getQuestion = useCallback((difficulty: QuestionDifficulty): Question | null => {
    // Get all questions of the specified difficulty
    const availableQuestions = getQuestionsByDifficulty(difficulty)
      .filter(q => !usedQuestionIds.has(q.id));
    
    if (availableQuestions.length === 0) {
      console.warn(`No more unused questions available for difficulty: ${difficulty}`);
      // Fall back to any random question of this difficulty
      const fallbackQuestion = getRandomQuestion(difficulty);
      
      if (fallbackQuestion) {
        // Update tracking
        setUsedQuestionIds(prev => new Set([...prev, fallbackQuestion.id]));
        setQuestionCounts(prev => ({
          ...prev,
          [difficulty]: prev[difficulty] + 1
        }));
        
        return fallbackQuestion;
      }
      
      return null;
    }
    
    // Get a random question from the available ones
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const selectedQuestion = availableQuestions[randomIndex];
    
    // Update tracking
    setUsedQuestionIds(prev => new Set([...prev, selectedQuestion.id]));
    setQuestionCounts(prev => ({
      ...prev,
      [difficulty]: prev[difficulty] + 1
    }));
    
    return selectedQuestion;
  }, [usedQuestionIds]);
  
  // Reset the deck, clearing used questions
  const resetDeck = useCallback(() => {
    setUsedQuestionIds(new Set());
    setQuestionCounts({
      Single: 0,
      Double: 0,
      Triple: 0,
      Homerun: 0,
    });
  }, []);
  
  // Calculate total questions used
  const totalQuestions = Object.values(questionCounts).reduce((sum, count) => sum + count, 0);
  
  return {
    getQuestion,
    resetDeck,
    questionCounts,
    totalQuestions,
  };
};