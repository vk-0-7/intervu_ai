"use client";

import React from "react";
import { CheckCircle, Download, ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const PaymentSuccess = () => {
  const parasm = useSearchParams();
  const orderId = parasm.get("orderId"); // Fallback to a default order ID
  const amount = parasm.get("amount"); // Fallback to a default amount
  const paymentId = parasm.get("paymentId"); // Fallback to a default payment ID

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            {/* Success Icon with Animation */}
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-scale-in">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
            </div>

            {/* Success Message */}
            <div className="mb-8 animate-fade-in">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Successful!
              </h1>
              <p className="text-gray-600">
                Thank you for your purchase. Your payment has been processed
                successfully.
              </p>
            </div>

            {/* Order Details */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 animate-fade-in">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Order #</span>
                <span className="text-sm font-mono text-gray-900">
                  {orderId}
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Amount</span>
                <span className="text-sm font-semibold text-gray-900">
                  ₹ {amount}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Date</span>
                <span className="text-sm text-gray-900">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 animate-fade-in">
              <Button className="w-full" asChild>
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2"
                >
                  <ArrowRight className="w-4 h-4" />
                  Continue to Dashboard
                </Link>
              </Button>

              {/* <Button variant="outline" className="w-full" asChild>
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Receipt
                </Link>
              </Button> */}

              <Button variant="ghost" className="w-full" asChild>
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2"
                >
                  <Home className="w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
            </div>

            {/* Support Message */}
            <p className="text-xs text-gray-500 mt-6">
              Need help?{" "}
              <Link href="/contact-us" className="text-primary hover:underline">
                Contact our support team
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentSuccess;
