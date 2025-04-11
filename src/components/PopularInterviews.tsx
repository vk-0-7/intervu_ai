import React from "react";
import Link from "next/link";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Code, Users, ArrowRight } from "lucide-react";

interface InterviewTemplateProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: "Easy" | "Medium" | "Hard";
  questions: number;
  duration: string;
  type: string;
  linkTo: string;
}

const InterviewTemplate: React.FC<InterviewTemplateProps> = ({
  title,
  description,
  icon,
  difficulty,
  questions,
  duration,
  type,
  linkTo,
}) => {
  const difficultyColor = {
    Easy: "bg-green-100 text-green-800",
    Medium: "bg-amber-100 text-amber-800",
    Hard: "bg-red-100 text-red-800",
  }[difficulty];

  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="pt-6 flex-grow">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 rounded-md bg-primary/10 text-primary">
            {icon}
          </div>
          <Badge variant="outline" className={`${difficultyColor} border-0`}>
            {difficulty}
          </Badge>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <span className="font-medium">Questions:</span> {questions}
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">Duration:</span> {duration}
          </div>
          <div className="flex items-center gap-1 col-span-2">
            <span className="font-medium">Type:</span> {type}
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 pb-6">
        <Button asChild className="w-full">
          <Link href={linkTo} className="group">
            Start Interview{" "}
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

const PopularInterviews: React.FC = () => {
  const interviews = [
    {
      title: "React Developer",
      description:
        "Frontend interview focused on React concepts, hooks, and best practices",
      icon: <Code className="h-5 w-5" />,
      difficulty: "Medium" as const,
      questions: 15,
      duration: "45 min",
      type: "Technical",
      linkTo: "/create-interview?template=react-developer",
    },
    {
      title: "JavaScript Fundamentals",
      description:
        "Core JavaScript concepts including closures, promises, and ES6+ features",
      icon: <FileText className="h-5 w-5" />,
      difficulty: "Medium" as const,
      questions: 12,
      duration: "30 min",
      type: "Technical",
      linkTo: "/create-interview?template=javascript",
    },
    {
      title: "HR Screening",
      description:
        "Common HR questions focusing on soft skills and cultural fit",
      icon: <Users className="h-5 w-5" />,
      difficulty: "Easy" as const,
      questions: 10,
      duration: "25 min",
      type: "Non-Technical",
      linkTo: "/create-interview?template=hr-screening",
    },
    {
      title: "System Design",
      description:
        "Advanced system architecture and design principles for senior roles",
      icon: <BookOpen className="h-5 w-5" />,
      difficulty: "Hard" as const,
      questions: 8,
      duration: "60 min",
      type: "Technical",
      linkTo: "/create-interview?template=system-design",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {interviews.map((interview, index) => (
        <InterviewTemplate key={index} {...interview} />
      ))}
    </div>
  );
};

export default PopularInterviews;
