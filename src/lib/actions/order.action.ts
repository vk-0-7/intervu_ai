"use server";

import { db } from "@/firebase/admin";
import Razorpay from "razorpay";
import { getCurrentUser } from "./auth.action";
import { getAuth } from "firebase-admin/auth";

export const createOrder = async ({
  amount,
  userId,
}: {
  amount: number;
  userId: string;
}) => {
  const instance = new Razorpay({
    key_id: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_KEY,
    key_secret: process.env.NEXT_PUBLIC_RAZORPAY_LIVE_SECRET,
  });
  const options = {
    amount: Number(amount * 100), // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  try {
    const order = await instance.orders.create(options);

    await db.collection("orders").add({
      orderId: order.id,
      userId,
      amount: order.amount,
      currency: order.currency,
      status: false,
      paid: false,
      createdAt: new Date(),
    });

    // console.log("order", order);
    return order;
  } catch (error) {
    console.log("Error creating Razorpay order", error);
  }
};

