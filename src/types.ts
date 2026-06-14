export interface Question {
  id: string;
  text: string;
  textGuj?: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  optionsGuj?: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctOption: 'A' | 'B' | 'C' | 'D';
  explanation: string;
  explanationGuj?: string;
  subject: string;
}

export interface MockTest {
  id: string;
  title: string;
  titleGuj?: string;
  category: string; // e.g. "GPSC Class 1-2", "GSSSB Clerk", "Talati", "PSI / Constable"
  durationMinutes: number;
  totalMarks: number;
  isFree: boolean;
  questions: Question[];
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface VideoLesson {
  id: string;
  title: string;
  duration: string;
  instructor: string;
  videoUrlSimulated: string;
  isFree: boolean;
}

export interface Course {
  id: string;
  title: string;
  titleGuj?: string;
  subject: string;
  instructor: string;
  lessons: VideoLesson[];
  isFree: boolean;
  enrollmentCount: number;
  rating: number;
  thumbnailUrl: string;
}

export interface JobAlert {
  id: string;
  title: string;
  titleGuj?: string;
  dept: string;
  advertisementNo: string;
  startDate: string;
  endDate: string;
  totalPosts: number;
  examDateSimulated: string;
  syllabusTopics: string[];
}

export interface QuizAttempt {
  testId: string;
  answers: Record<string, 'A' | 'B' | 'C' | 'D' | null>;
  score: number;
  correctAnswers: number;
  wrongAnswers: number;
  unattempted: number;
  totalTimeTaken: number; // in seconds
  percentage: number;
  timestamp: string;
}

export interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  score: number;
  testsGiven: number;
  badge: string;
  isCurrentUser?: boolean;
}
