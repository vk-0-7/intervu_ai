"use server";

import { db } from "@/firebase/admin";

export const createOrder = async ({ amount }: { amount: number }) => {
  console.log("amount", amount);
  try {
    const orderRef = await db.collection("orders").add({
      amount: amount,
      paid: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: "pending",
      paymentMethod: "razorpay",
      razorpayOrderId: null,
      razorpayPaymentId: null,
      razorpaySignature: null,
      userId: null,
    });
    const orderData = await orderRef.get();
    // console.log("orderData.data", orderData.data());
    return { id: orderRef?.id, ...orderData.data() };
  } catch (error) {
    console.log("Error creating order", error);
  }
};
