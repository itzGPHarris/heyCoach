import { Question, QuestionDifficulty } from '../types';
import { loadQuestionsFromCSV } from '../utils/csvLoader';

// Questions storage
let questionDatabase: Question[] = [];

// Sample questions data - used as fallback if CSV loading fails
const sampleQuestions: Question[] = [
  {
    id: '1',
    question: 'Who was the NL MVP in 2004?',
    year: 2004,
    league: 'NL',
    category: 'Awards',
    possibleAnswerA: 'Adrian Beltre',
    possibleAnswerB: 'Albert Pujols',
    possibleAnswerC: 'Scott Rolen',
    possibleAnswerD: 'Barry Bonds',
    correctAnswer: 'Barry Bonds',
    difficulty: 'Double',
    options: ['Adrian Beltre', 'Albert Pujols', 'Scott Rolen', 'Barry Bonds'],
    correctOption: 3,
    selectedAnswer: undefined
  }
];

// Function to load questions from the database
export const loadQuestions = (): Question[] => {
  // Return the current question database, or sample questions if empty
  return questionDatabase.length > 0 
    ? questionDatabase 
    : sampleQuestions;
};

// Function to filter questions by difficulty
export const getQuestionsByDifficulty = (
  difficulty: QuestionDifficulty
): Question[] => {
  const allQuestions = loadQuestions();
  return allQuestions.filter(q => q.difficulty === difficulty);
};

// Function to get a random question of specified difficulty
export const getRandomQuestion = (
  difficulty: QuestionDifficulty
): Question | null => {
  const questions = getQuestionsByDifficulty(difficulty);
  
  if (questions.length === 0) {
    console.error(`No questions found for difficulty: ${difficulty}`);
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * questions.length);
  return { ...questions[randomIndex] };
};

// Function to get a set of questions for a daily game
// In a real implementation, this would be seeded by date
export const getDailyQuestions = async (count: number = 27): Promise<Question[]> => {
  const allQuestions = await loadQuestionsFromCSV('/questions.csv');
  
  // Shuffle the questions
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  
  // Take the requested number
  return shuffled.slice(0, count);
};

// Function to prepare CSV loaded questions to match the expected format
export const prepareQuestions = (questions: Question[]): Question[] => {
  return questions.map(q => {
    // If options array is empty, populate it from possible answers
    if (!q.options || q.options.length === 0) {
      q.options = [
        q.possibleAnswerA || '',
        q.possibleAnswerB || '',
        q.possibleAnswerC || '',
        q.possibleAnswerD || ''
      ].filter(option => option !== '');
    }
    
    // If correctOption is not set, find it from the correctAnswer
    if (q.correctOption === undefined && q.correctAnswer) {
      const correctIndex = q.options.findIndex(
        option => option === q.correctAnswer
      );
      q.correctOption = correctIndex >= 0 ? correctIndex : 0;
    }
    
    // Ensure year is a number
    if (typeof q.year === 'string') {
      q.year = parseInt(q.year, 10) || new Date().getFullYear();
    }
    
    // Initialize selectedAnswer as undefined if it doesn't exist
    // This is the line that needs fixing - we shouldn't reassign undefined to undefined
    // Just leave it as is since it's an optional property
    
    return q;
  });
};


// Initialize the question database from a CSV file
export const initializeQuestionDatabase = async () => {
  try {
    // Try to load questions from CSV
    const questions = await loadQuestionsFromCSV('/questions.csv');
    
    if (questions && questions.length > 0) {
      // Prepare questions to match the expected format
      questionDatabase = prepareQuestions(questions);
      console.log(`Successfully loaded ${questions.length} questions from CSV`);
    } else {
      // Fall back to sample questions
      questionDatabase = sampleQuestions;
      console.log('Using sample questions as fallback');
    }
  } catch (error) {
    console.error('Error initializing question database:', error);
    // Fall back to sample questions
    questionDatabase = sampleQuestions;
    console.log('Using sample questions as fallback due to error');
  }
  
  // Log difficulty distribution
  const singles = questionDatabase.filter(q => q.difficulty === 'Single').length;
  const doubles = questionDatabase.filter(q => q.difficulty === 'Double').length;
  const triples = questionDatabase.filter(q => q.difficulty === 'Triple').length;
  const homeruns = questionDatabase.filter(q => q.difficulty === 'Homerun').length;
  
  console.log(`Question distribution: Singles: ${singles}, Doubles: ${doubles}, Triples: ${triples}, Homeruns: ${homeruns}`);
};