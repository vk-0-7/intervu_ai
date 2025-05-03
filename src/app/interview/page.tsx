import Agent from "@/components/Interview/agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { UserProps } from "@/types";
import React from "react";

const Interview = async () => {
  const user = await getCurrentUser();

  console.log(user);

  return (
    <div className="bg-gradient-to-br from-[#767575] via-black to-gray-900 text-white h-screen flex flex-col items-center justify-center">
      {/* Header */}
      <Agent username={user?.name} userid={user?.id} type={"generate"} />
    </div>
  );
};

export default Interview;
