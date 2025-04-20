import Agent from "@/components/Interview/agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { getInterviewById } from "@/lib/actions/interview.action";
import Link from "next/link";
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

  // Check if user credits are 0
  if (user?.credits === 0) {
    return (
      <div className="relative bg-gradient-to-br from-[#767575] via-black to-gray-900 text-white h-screen flex items-center justify-center">
        {/* Blurred Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md z-10 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg shadow-lg text-center max-w-md">
            <h2 className="text-2xl font-bold text-red-500 mb-4">
              Your Credits Are Over!
            </h2>
            <p className="text-gray-300 mb-6">
              You have used all your available credits. To continue using our
              services, please purchase additional credits or explore our
              pricing plans.
            </p>
            <div className="flex gap-4 justify-center">
              <Link
                href={"/"}
                className="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                Back
              </Link>
              <Link
                href={"/pricing"}
                className="bg-gradient-to-r from-green-400 to-blue-500 text-black px-6 py-2 rounded-lg font-semibold hover:shadow-lg transition"
              >
                Pricing Page
              </Link>
            </div>
          </div>
        </div>

        {/* Main Page Content */}
        <div className="absolute inset-0 z-0">
          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            {interview?.role}
          </h1>
          <p className="text-gray-500 text-lg mb-4 text-center">
            {interview?.level}
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-br from-[#767575] via-black to-gray-900 text-white h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold text-white mb-2">
          {interview?.role}
        </h1>
        <p className="text-gray-500 text-lg mb-4">{interview?.level}</p>

        <Agent
          userid={user?.id}
          username={user?.name}
          type="interview"
          interviewid={id}
          questions={interview.questions}
        />
      </div>
    </>
  );
};

export default InterviewDetails;
