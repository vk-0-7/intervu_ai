import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const auth = await isAuthenticated();
  if (!auth) {
    redirect("/sign-in");
  }

  return <>{children}</>;
};

export default Layout;
