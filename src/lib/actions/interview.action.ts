"use server";

import { db } from "@/firebase/admin";
import { Interview } from "@/types";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { feedbackSchema } from "@/constants";

export const getInterviewsById = async (userId: string) => {
  try {
    const interviewData = await db
      .collection("interview")
      .where("userId", "==", userId)
      .get();

    return interviewData.docs?.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    }) as Interview[];
  } catch (error) {
    console.log(error);
  }

  //   console.log(abs);
};

export const getOtherUsersInterviews = async (userId: string) => {
  try {
    const interview = await db
      .collection("interview")
      .where("userId", "!=", userId)
      .get();

    return interview.docs?.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    }) as Interview[];
  } catch (error) {
    console.log("Error getting Interviews", error);
  }
};

export const getInterviewById = async (id: string) => {
  try {
    const interviewData = await db.collection("interview").doc(id).get();

    return interviewData.data() as Interview | null;
  } catch (error) {
    console.log(error);
  }
};

type FeedbackProps = {
  interviewId: string;
  userId: string;
  transcript: Record<string, string>[];
  feedbackId?: string;
};

export const createFeedback = async (props: FeedbackProps) => {
  console.log("props", props);
  const { interviewId, userId, transcript, feedbackId } = props;

  try {
    // Validate required inputs
    if (
      !interviewId ||
      !userId ||
      !transcript ||
      !Array.isArray(transcript) ||
      transcript.length === 0
    ) {
      throw new Error(
        "Missing required fields: interviewId, userId, or transcript"
      );
    }

    // Safely format transcript
    const structuredTranscript = transcript
      .map((item) =>
        item?.role && item?.content
          ? `- ${item.role.toUpperCase()}: ${item.content.trim()}`
          : ""
      )
      .join("\n");

    // Generate structured feedback
    const { object } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${structuredTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
      `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories.",
    });

    if (!object) {
      throw new Error(
        "Feedback generation failed or returned an invalid structure."
      );
    }

    // console.log("object created", object);

    // Create feedback object
    const feedback = {
      interviewId,
      userId,
      totalScore: object?.totalScore || 0,
      categoryScores: object?.categoryScores || {},
      strengths: object?.strengths || [],
      areasForImprovement: object?.areasForImprovement || [],
      finalAssessment: object?.finalAssessment || "",
      createdAt: new Date().toISOString(),
    };

    // Store feedback in Firestore
    const feedbackRef = feedbackId
      ? db.collection("feedback").doc(feedbackId)
      : db.collection("feedback").doc();

    await feedbackRef.set(feedback);

    return { success: true, feedbackId: feedbackRef.id };
  } catch (error) {
    console.log("Error creating feedback", error);
    return { success: false, error };
  }
};

export const getFeedbackByInterviewId = async ({
  interviewId,
  userId,
}: {
  interviewId: string;
  userId: string;
}) => {
  try {
    const feedbackData = await db
      .collection("feedback")
      .where("interviewId", "==", interviewId)
      .where("userId", "==", userId)
      .get();
    

    return feedbackData.docs?.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
      };
    });
  } catch (error) {
    console.log(error);
  }

  //   console.log(abs);
};
