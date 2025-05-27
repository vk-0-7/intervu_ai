export type UserProps = {
  name: string;
  email: string;
  id: string;
  credits?: number;
  activePlans?: string;
};
interface Interview {
  id: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
}
interface FeedbackProps {
  userId: string;
  id?: string;
  interviewId: string;
  id: string;
  totalScore: number;
  categoryScores: Array<{
    name: string;
    score: number;
    comment: string;
  }>;
  strengths: string[];
  areasForImprovement: string[];
  finalAssessment: string;
  createdAt: string;
}
