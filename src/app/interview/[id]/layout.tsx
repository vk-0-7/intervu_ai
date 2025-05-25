import { getCurrentUser } from "@/lib/actions/auth.action";
import React from "react";

const InterviewLayout: React.FC = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">
          You need to be logged in to access this page.
        </h1>
      </div>
    );
  }
  if (currentUser?.credits === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-2xl font-bold">You have no credits left.</h1>
      </div>
    );
  }
  return <>{children}</>;
};

export default InterviewLayout;
