import { db } from "@/firebase/admin";
import { getCurrentUser } from "@/lib/actions/auth.action";
import crypto from "crypto";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;

  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.NEXT_PUBLIC_RAZORPAY_LIVE_SECRET!)
    .update(sign)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    //update the order status in the database
    const ordersSnapshot = await db
      .collection("orders")
      .where("orderId", "==", razorpay_order_id)
      .get();
    const updatePromises = ordersSnapshot.docs.map((doc) =>
      doc.ref.update({
        paymentId: razorpay_payment_id,
        status: true,
        paid: true,
        updatedAt: new Date(),
      })
    );
    await Promise.all(updatePromises);

    const orderDocs = ordersSnapshot?.docs;
    if (orderDocs.length == 0) {
      return Response.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }
    const orderData = orderDocs[0]?.data();
    const userId = orderData?.userId;
    const credits = orderData?.amount === 900 ? 20 : 100;

    const userDataRef = await db.collection("users").doc(userId);
    const userSnapshot = await userDataRef.get();
    if (!userSnapshot.exists) {
      return Response.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    const userData = userSnapshot.data();
    userDataRef.update({
      credits: (userData?.credits || 0) + credits,
    });

    return Response.json(
      {
        success: true,
        amount: orderData?.amount,
        credits,
        orderId: orderData.orderId,
      },
      { status: 200 }
    );
  } else {
    return Response.json(
      {
        success: false,
      },
      { status: 400 }
    );
  }
}
