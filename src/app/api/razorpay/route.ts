export async function POST(request: Request) {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    await request.json();

  console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature);
}
