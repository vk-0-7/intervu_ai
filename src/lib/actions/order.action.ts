"use server";

import { db } from "@/firebase/admin";
import Razorpay from "razorpay";

export const createOrder = async ({ amount }: { amount: number }) => {
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
  const options = {
    amount: Number(amount * 100), // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  try {
    const order = await instance.orders.create(options);
    // console.log("order", order);
    return order;
  } catch (error) {
    console.log("Error creating Razorpay order", error);
  }
};

