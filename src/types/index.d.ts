export type UserProps = {
  name: string;
  email: string;
  id: string;
};
interface Interview {
  _id?: string;
  id?: string;
  role: string;
  level: string;
  questions: string[];
  techstack: string[];
  createdAt: string;
  userId: string;
  type: string;
  finalized: boolean;
}
