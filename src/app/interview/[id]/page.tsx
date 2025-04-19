import Agent from "@/components/Interview/agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewById } from "@/lib/actions/interview.action";
import { redirect } from "next/navigation";
import React from "react";

type RouteParams = {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
};

const InterviewDetails = async ({ params }: RouteParams) => {
  const { id } = await params;
  const user = await getCurrentUser();

  const interview = await getInterviewById(id);

  console.log(interview);

  if (!interview) redirect("/interview");

  return (
    <div className="bg-gradient-to-br from-[#767575] via-black to-gray-900 text-white h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white mb-2">{interview?.role}</h1>
      <p className="text-gray-500 text-lg mb-4">{interview?.level}</p>

      <Agent
        userid={user?.id}
        username={user?.name}
        type="interview"
        interviewid={id}
        questions={interview.questions}
      />
    </div>
  );
};

export default InterviewDetails;
