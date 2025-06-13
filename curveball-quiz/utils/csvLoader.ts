import { Question, QuestionDifficulty } from '../types';

/**
 * Convert a string difficulty level to the appropriate QuestionDifficulty type
 */
const normalizeDifficulty = (difficultyStr: string): QuestionDifficulty => {
  const normalized = difficultyStr.trim().toLowerCase();
  
  if (normalized === 'single' || normalized === '1') {
    return 'Single';
  } else if (normalized === 'double' || normalized === '2') {
    return 'Double';
  } else if (normalized === 'triple' || normalized === '3') {
    return 'Triple';
  } else if (
    normalized === 'homerun' || 
    normalized === 'home run' || 
    normalized === '4'
  ) {
    return 'Homerun';
  }
  
  // Default to Single if invalid
  console.warn(`Invalid difficulty value "${difficultyStr}", defaulting to "Single"`);
  return 'Single';
};

/**
 * Process CSV data into Question objects
 * @param csvText The CSV content as text
 * @returns Array of Question objects
 */
export const processCSV = (csvText: string): Question[] => {
  // Split the CSV into rows
  const rows = csvText.split('\n').filter(row => row.trim() !== '');
  
  // Skip the header row - we're not using it currently
  // First row (index 0) contains headers
  
  // Create questions from each subsequent row
  const questions: Question[] = [];
  
  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const values = row.split(',').map(value => value.trim());
    
    // Skip if we don't have enough values
    if (values.length < 9) {
      console.warn(`Skipping row ${i+1}: insufficient values`);
      continue;
    }
    
    // Map CSV columns to Question properties
    const question: Question = {
      id: `q${i}`,
      question: values[0],
      year: parseInt(values[1], 10) || new Date().getFullYear(),
      league: values[2],
      category: values[3],
      possibleAnswerA: values[4],
      possibleAnswerB: values[5],
      possibleAnswerC: values[6],
      possibleAnswerD: values[7],
      correctAnswer: values[8],
      difficulty: normalizeDifficulty(values[9] || 'Single'),
      options: [],
      correctOption: 0
    };
    
    // Validate that the correct answer is among the possible answers
    const possibleAnswers = [
      question.possibleAnswerA,
      question.possibleAnswerB,
      question.possibleAnswerC,
      question.possibleAnswerD
    ];
    
    if (!possibleAnswers.includes(question.correctAnswer)) {
      console.warn(
        `Correct answer "${question.correctAnswer}" not found in possible answers for question: ${question.question}`
      );
      // Set the correct answer to the first possible answer as a fallback
      question.correctAnswer = question.possibleAnswerA;
    }
    
    questions.push(question);
  }
  
  return questions;
};

/**
 * Load questions from a CSV file
 * @param filePath Path to the CSV file
 * @returns Promise resolving to an array of Question objects
 */
export const loadQuestionsFromCSV = async (filePath: string): Promise<Question[]> => {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Failed to load CSV: ${response.status} ${response.statusText}`);
    }
    
    const csvText = await response.text();
    return processCSV(csvText);
  } catch (error) {
    console.error('Error loading questions from CSV:', error);
    return [];
  }
};