"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { User, Settings, CreditCard, Info, LogOut } from "lucide-react";
import ProfileInformation from "@/components/profile/profileInformation";
import AccountSettings from "@/components/profile/accountSettings";
import SubscriptionPlans from "@/components/profile/subscriptionPlans";
import BillingHistory from "@/components/profile/BillingHistory";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/client";
import { useRouter } from "next/navigation";

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await fetch("/api/logout", { method: "POST" });
      router.push("/sign-in");
      router.refresh();
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error signing out:", error);
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="container max-w-5xl mx-auto py-8 px-4">
      <div className="mb-6 flex justify-between items-start">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Account Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and subscription
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleLogout}
          className="flex items-center gap-2 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          <LogOut size={16} />
          Log Out
        </Button>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-2 max-w-lg">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User size={16} />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          {/* <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings size={16} />
            <span className="hidden sm:inline">Settings</span>
          </TabsTrigger> */}
          <TabsTrigger value="subscription" className="flex items-center gap-2">
            <CreditCard size={16} />
            <span className="hidden sm:inline">Plans</span>
          </TabsTrigger>
          {/* <TabsTrigger value="billing" className="flex items-center gap-2">
            <Info size={16} />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger> */}
        </TabsList>

        <div className="p-1">
          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  Update your profile information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ProfileInformation />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AccountSettings />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plans</CardTitle>
                <CardDescription>
                  View and manage your subscription
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SubscriptionPlans />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
                <CardDescription>
                  View your billing history and payment methods
                </CardDescription>
              </CardHeader>
              <CardContent>
                <BillingHistory />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Profile;
