"use server";

import { db } from "@/firebase/admin";
import { Interview } from "@/types";

export const getInterviewsById = async (userId: string) => {
  try {
    const interviewData = await db
      .collection("interview")
      .where("userId", "==", userId)
      .get();
    console.log(interviewData?.docs);

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
