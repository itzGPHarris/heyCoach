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
    difficulty: 'Double'
  },
  {
    id: '2',
    question: 'Which MLB team has the most MVP winners?',
    year: 2023,
    league: 'MLB',
    category: 'Team Records',
    possibleAnswerA: 'Cardinals',
    possibleAnswerB: 'Athletics',
    possibleAnswerC: 'Yankees',
    possibleAnswerD: 'Dodgers',
    correctAnswer: 'Yankees',
    difficulty: 'Triple'
  },
  {
    id: '3',
    question: 'Who holds the MLB record for most career home runs?',
    year: 2022,
    league: 'MLB',
    category: 'Records',
    possibleAnswerA: 'Babe Ruth',
    possibleAnswerB: 'Hank Aaron',
    possibleAnswerC: 'Barry Bonds',
    possibleAnswerD: 'Alex Rodriguez',
    correctAnswer: 'Barry Bonds',
    difficulty: 'Single'
  },
  {
    id: '4',
    question: 'Which team won the first World Series in 1903?',
    year: 1903,
    league: 'MLB',
    category: 'History',
    possibleAnswerA: 'Boston Americans',
    possibleAnswerB: 'Pittsburgh Pirates',
    possibleAnswerC: 'New York Giants',
    possibleAnswerD: 'Chicago Cubs',
    correctAnswer: 'Boston Americans',
    difficulty: 'Homerun'
  },
  {
    id: '5',
    question: 'Who was the first player to hit 500 home runs?',
    year: 1929,
    league: 'MLB',
    category: 'Milestones',
    possibleAnswerA: 'Babe Ruth',
    possibleAnswerB: 'Lou Gehrig',
    possibleAnswerC: 'Jimmie Foxx',
    possibleAnswerD: 'Mel Ott',
    correctAnswer: 'Babe Ruth',
    difficulty: 'Double'
  },
  {
    id: '6',
    question: 'Which pitcher has the most career strikeouts?',
    year: 2022,
    league: 'MLB',
    category: 'Records',
    possibleAnswerA: 'Randy Johnson',
    possibleAnswerB: 'Roger Clemens',
    possibleAnswerC: 'Nolan Ryan',
    possibleAnswerD: 'Steve Carlton',
    correctAnswer: 'Nolan Ryan',
    difficulty: 'Single'
  },
  {
    id: '7',
    question: 'What year did the MLB designate the Negro Leagues as "Major League"?',
    year: 2020,
    league: 'MLB',
    category: 'History',
    possibleAnswerA: '2010',
    possibleAnswerB: '2015',
    possibleAnswerC: '2020',
    possibleAnswerD: '2022',
    correctAnswer: '2020',
    difficulty: 'Triple'
  },
  {
    id: '8',
    question: 'Who was the first player to have his number retired by any team?',
    year: 1939,
    league: 'MLB',
    category: 'History',
    possibleAnswerA: 'Babe Ruth',
    possibleAnswerB: 'Lou Gehrig',
    possibleAnswerC: 'Jackie Robinson',
    possibleAnswerD: 'Ted Williams',
    correctAnswer: 'Lou Gehrig',
    difficulty: 'Homerun'
  },
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
export const getDailyQuestions = (count: number = 27): Question[] => {
  const allQuestions = loadQuestionsFromCSV();
  
  // Shuffle the questions
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  
  // Take the requested number
  return shuffled.slice(0, count);
};

// Initialize the question database from a CSV file
export const initializeQuestionDatabase = async () => {
  try {
    // Try to load questions from CSV
    const questions = await loadQuestionsFromCSV('/questions.csv');
    
    if (questions && questions.length > 0) {
      questionDatabase = questions;
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