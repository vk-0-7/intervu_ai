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
