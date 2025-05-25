"use server";

import { auth, db } from "@/firebase/admin";
import { UserProps } from "@/types";
import { getAuth } from "firebase/auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function signUP(params: {
  uid: string;
  name: string;
  email: string;
  password?: string;
  credits?: number;
  activePlan?: string;
}) {
  const { uid, name, email, credits, activePlan } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists",
      };
    }
    await db.collection("users").doc(uid).set({
      name,
      email,
      credits,
      activePlan,
    });
    return {
      success: true,
      message: "Account Created  successfully",
    };
  } catch (error) {
    console.error("Error signing up user:", error);

    return {
      success: false,
      message: "User sign-up failed",
    };
  }
}

export async function signIN(params: { email: string; idToken: string }) {
  const { email, idToken } = params;
  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message: "User not found",
      };
    }
    await setSessionCookie(idToken);
  } catch (error) {
    console.error("Error signing in user:", error);
    return {
      success: false,
      message: "User sign-in failed",
    };
  }
}

export async function updateUserById({
  userId,
  data,
}: {
  userId: string;
  data: Partial<UserProps>;
}) {
  try {
    // console.log("data send to update user", data);
    const { credits } = data;
    const userRef = db.collection("users").doc(userId);
    await userRef.update({ credits });
    return {
      success: true,
      message: "User updated successfully",
    };
  } catch (error) {
    console.error("Error updating user:", error);
    return {
      success: false,
      message: "User update failed",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: 60 * 60 * 24 * 5 * 1000, // 5 days in milliseconds
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: 60 * 60 * 24 * 5, // 5 days in seconds
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
}

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value || null;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();

    if (!userRecord.exists) {
      return null;
    }
    return { ...userRecord.data(), id: userRecord.id } as UserProps;
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();

  return !!user;
}

