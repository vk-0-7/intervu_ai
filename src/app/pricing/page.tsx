import SubscriptionPlans from "@/components/profile/subscriptionPlans";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";

const Pricing = () => {
  return (
    <div className="my-8 flex items-center justify-center">
      <Card className="w-3/5">
        <CardHeader>
          <CardTitle>Subscription Plans</CardTitle>
          <CardDescription>View and manage your subscription</CardDescription>
        </CardHeader>
        <CardContent>
          <SubscriptionPlans />
        </CardContent>
      </Card>
    </div>
  );
};

export default Pricing;
