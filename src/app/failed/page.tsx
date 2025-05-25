import React from "react";
import { XCircle, RefreshCw, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

const PaymentFailure = () => {
  //   const handleRetryPayment = () => {
  //     // This would typically redirect to the payment page or retry the payment
  //     console.log("Retrying payment...");
  //   };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-rose-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card className="border-0 shadow-2xl">
          <CardContent className="p-8 text-center">
            {/* Failure Icon with Animation */}
            <div className="mb-6">
              <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center animate-scale-in">
                <XCircle className="w-12 h-12 text-red-600" />
              </div>
            </div>

            {/* Failure Message */}
            <div className="mb-6 animate-fade-in">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Payment Failed
              </h1>
              <p className="text-gray-600 mb-4">
                We couldn't process your payment. Don't worry, no charges were
                made to your account.
              </p>
            </div>

            {/* Error Details */}
            <Alert className="mb-6 animate-fade-in">
              <AlertDescription className="text-left">
                <strong>Common reasons for payment failure:</strong>
                <ul className="mt-2 space-y-1 text-sm">
                  <li>• Insufficient funds</li>
                  <li>• Incorrect card details</li>
                  <li>• Card expired or blocked</li>
                  <li>• Network connection issues</li>
                </ul>
              </AlertDescription>
            </Alert>

            {/* Failed Order Details */}
            {/* <div className="bg-gray-50 rounded-lg p-4 mb-6 animate-fade-in">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Attempted Amount</span>
                <span className="text-sm font-semibold text-gray-900">
                  $49.99
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-600">Date</span>
                <span className="text-sm text-gray-900">
                  {new Date().toLocaleDateString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Status</span>
                <span className="text-sm text-red-600 font-medium">Failed</span>
              </div>
            </div> */}

            {/* Action Buttons */}
            <div className="space-y-3 animate-fade-in">
              {/* <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={handleRetryPayment}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Payment Again
              </Button> */}

              <Button variant="outline" className="w-full" asChild>
                <Link
                  href="/contact-us"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Contact Support
                </Link>
              </Button>

              <Button variant="ghost" className="w-full" asChild>
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Home
                </Link>
              </Button>
            </div>

            {/* Help Message */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg animate-fade-in">
              <p className="text-sm text-blue-800">
                <strong>Need immediate help?</strong>
                <br />
                Our support team is available 24/7 to assist you with payment
                issues.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PaymentFailure;
