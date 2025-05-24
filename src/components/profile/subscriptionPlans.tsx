"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { createOrder } from "@/lib/actions/order.action";

interface PlanFeature {
  title: string;
  included: boolean;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: PlanFeature[];
  recommended?: boolean;
}
declare global {
  interface Window {
    Razorpay: any;
  }
}

const plans: Plan[] = [
  {
    id: "basic",
    name: "Basic",
    price: "₹ 0",
    description: "Essential features for individuals",
    features: [
      { title: "2 interview sessions", included: true },
      { title: "Basic question templates", included: true },
      { title: "Export as PDF", included: false },
      { title: "AI-powered feedback", included: false },
      { title: "Improvement Guide", included: false },
      { title: "Priority support", included: false },
    ],
  },
  {
    id: "beginer",
    name: "Beginer",
    price: "₹ 99",
    description: "Enhanced features for professionals",
    features: [
      { title: "20 interview sessions", included: true },
      { title: "Advanced question templates", included: true },
      { title: "Export as PDF", included: true },
      { title: "AI-powered feedback", included: true },
      { title: "Improvement Guide", included: true },
      { title: "Priority support", included: false },
    ],
    recommended: true,
  },
  {
    id: "professional",
    name: "Professional",
    price: "₹ 599",
    description: "Complete solution for You",
    features: [
      { title: "100 interview sessions", included: true },
      { title: "Custom question templates", included: true },
      { title: "Export as PDF", included: true },
      { title: "Advanced AI-powered feedback", included: true },
      { title: "Improvement Guide", included: true },
      { title: "24/7 Priority support", included: true },
    ],
  },
];

const PRICE = {
  basic: 0,
  beginer: 99,
  professional: 599,
};

const SubscriptionPlans: React.FC = () => {
  const [currentPlan, setCurrentPlan] = React.useState("beginer");
  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePlanChange = (value: string) => {
    setCurrentPlan(value);
  };

  const handleSubscribe = async () => {
    try {
      const response = await createOrder({ amount: PRICE[currentPlan] });

      const options = {
        key: "rzp_test_2IHiVuu6jwO1LE",
        amount: response.amount,
        currency: "INR",
        name: "Intervue ",
        description: "Subscription Purchased",
        image: "your_logo_url",
        order_id: response.id,
        callback_url: "http://localhost:3002/api/razorpay",
        prefill: {
          name: "Vivek",
          email: "vivek@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      console.log(response);

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      toast.error("Error creating order. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Current Plan</h3>
        <p className="text-sm text-muted-foreground mb-4">
          You are currently on the{" "}
          <strong>{plans.find((p) => p.id === currentPlan)?.name}</strong> plan.
        </p>
      </div>

      <RadioGroup value={currentPlan} onValueChange={handlePlanChange}>
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`rounded-lg border p-5 relative ${
                plan.recommended ? "border-primary" : "border-border"
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs py-1 px-3 rounded-full">
                  Recommended
                </div>
              )}
              <div className="flex items-center space-x-2">
                <RadioGroupItem value={plan.id} id={plan.id} />
                <Label htmlFor={plan.id} className="text-base font-medium">
                  {plan.name}
                </Label>
              </div>

              <div className="mt-3">
                <div className="text-2xl font-bold">
                  {plan.price}
                  <span className="text-sm font-normal text-muted-foreground">
                    /month
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {plan.description}
                </p>
              </div>

              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex text-sm">
                    {feature.included ? (
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                    ) : (
                      <span className="mr-2 h-4 w-4 text-muted-foreground">
                        -
                      </span>
                    )}
                    <span
                      className={
                        feature.included ? "" : "text-muted-foreground"
                      }
                    >
                      {feature.title}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </RadioGroup>

      <div className="pt-4 flex justify-end">
        <Button onClick={handleSubscribe} disabled={currentPlan == "basic"}>
          Update Subscription
        </Button>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
