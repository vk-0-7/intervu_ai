"use client";

import React, { useState } from "react";

import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check, Code, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

interface Topic {
  id: string;
  name: string;
  category: "technical" | "non-technical";
}

const technicalTopics: Topic[] = [
  { id: "javascript", name: "JavaScript", category: "technical" },
  { id: "react", name: "React", category: "technical" },
  { id: "nodejs", name: "Node.js", category: "technical" },
  { id: "python", name: "Python", category: "technical" },
  { id: "java", name: "Java", category: "technical" },
  { id: "data-structures", name: "Data Structures", category: "technical" },
  { id: "algorithms", name: "Algorithms", category: "technical" },
  { id: "system-design", name: "System Design", category: "technical" },
  { id: "databases", name: "Databases", category: "technical" },
  { id: "aws", name: "AWS", category: "technical" },
];

const nonTechnicalTopics: Topic[] = [
  { id: "leadership", name: "Leadership", category: "non-technical" },
  { id: "teamwork", name: "Teamwork", category: "non-technical" },
  { id: "communication", name: "Communication", category: "non-technical" },
  { id: "problem-solving", name: "Problem Solving", category: "non-technical" },
  {
    id: "conflict-resolution",
    name: "Conflict Resolution",
    category: "non-technical",
  },
  { id: "time-management", name: "Time Management", category: "non-technical" },
  { id: "adaptability", name: "Adaptability", category: "non-technical" },
  { id: "creativity", name: "Creativity", category: "non-technical" },
  { id: "work-ethic", name: "Work Ethic", category: "non-technical" },
  { id: "cultural-fit", name: "Cultural Fit", category: "non-technical" },
];

const CreateInterview: React.FC = () => {
  const searchParams = useSearchParams();
  const initialTab =
    searchParams.get("type") === "non-technical"
      ? "non-technical"
      : "technical";

  const [tab, setTab] = useState<"technical" | "non-technical">(
    initialTab as "technical" | "non-technical"
  );
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [interviewName, setInterviewName] = useState("");
  const [numQuestions, setNumQuestions] = useState("5");
  const [difficulty, setDifficulty] = useState("medium");

  const router = useRouter();

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((id) => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleSubmit = () => {
    if (!interviewName.trim()) {
      toast("Interview name required");
      return;
    }

    if (selectedTopics.length === 0) {
      toast("Topics required");
      return;
    }

    // Create a unique ID for the interview
    const interviewId = Date.now().toString();

    // In a real app, we would send this to a backend
    const interviewData = {
      id: interviewId,
      name: interviewName,
      type: tab,
      topics: selectedTopics,
      numQuestions: parseInt(numQuestions),
      difficulty,
      createdAt: new Date().toISOString(),
    };

    // For now, store in localStorage as a mock database
    const savedInterviews = JSON.parse(
      localStorage.getItem("interviews") || "[]"
    );
    localStorage.setItem(
      "interviews",
      JSON.stringify([...savedInterviews, interviewData])
    );

    toast("Interview created");

    // Navigate to the interview page
    router.push(`/interview/${interviewId}`);
  };

  return (
    <>
      <Toaster />
      <div className="py-12 container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">Create New Interview</h1>
          <p className="text-muted-foreground mb-8">
            Configure your interview settings and select topics
          </p>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Interview Details</CardTitle>
              <CardDescription>
                Name your interview and set basic parameters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="interview-name">Interview Name</Label>
                <Input
                  id="interview-name"
                  placeholder="e.g., Frontend Developer Practice"
                  value={interviewName}
                  onChange={(e) => setInterviewName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="num-questions">Number of Questions</Label>
                  <select
                    id="num-questions"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(e.target.value)}
                  >
                    <option value="3">3 Questions</option>
                    <option value="5">5 Questions</option>
                    <option value="10">10 Questions</option>
                    <option value="15">15 Questions</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty Level</Label>
                  <select
                    id="difficulty"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Select Interview Type and Topics</CardTitle>
              <CardDescription>
                Choose the types of questions you want to practice
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs
                value={tab}
                onValueChange={(value: string) =>
                  setTab(value as "technical" | "non-technical")
                }
              >
                <TabsList className="grid grid-cols-2 mb-8">
                  <TabsTrigger
                    value="technical"
                    className="flex items-center gap-2"
                  >
                    <Code className="h-4 w-4" /> Technical
                  </TabsTrigger>
                  <TabsTrigger
                    value="non-technical"
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" /> Non-Technical
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="technical" className="mt-0">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {technicalTopics.map((topic) => (
                      <TopicButton
                        key={topic.id}
                        topic={topic}
                        isSelected={selectedTopics.includes(topic.id)}
                        onToggle={handleTopicToggle}
                      />
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="non-technical" className="mt-0">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {nonTechnicalTopics.map((topic) => (
                      <TopicButton
                        key={topic.id}
                        topic={topic}
                        isSelected={selectedTopics.includes(topic.id)}
                        onToggle={handleTopicToggle}
                      />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={handleSubmit}>
                Create Interview
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </>
  );
};

interface TopicButtonProps {
  topic: Topic;
  isSelected: boolean;
  onToggle: (topicId: string) => void;
}

const TopicButton: React.FC<TopicButtonProps> = ({
  topic,
  isSelected,
  onToggle,
}) => {
  return (
    <button
      className={`flex items-center justify-between p-3 rounded-md border transition-all ${
        isSelected
          ? "border-primary bg-primary/10 text-primary"
          : "border-border bg-background hover:bg-accent hover:text-accent-foreground"
      }`}
      onClick={() => onToggle(topic.id)}
    >
      <span>{topic.name}</span>
      {isSelected && <Check className="h-4 w-4 text-primary" />}
    </button>
  );
};

export default CreateInterview;
