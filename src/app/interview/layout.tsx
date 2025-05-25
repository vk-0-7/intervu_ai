import { getCurrentUser } from "@/lib/actions/auth.action";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/sign-in");
  }

  if (user?.credits === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="bg-white shadow-lg rounded-xl p-10 flex flex-col items-center max-w-md w-full">
          <h1 className="text-2xl font-bold mb-2 text-gray-800 text-center">
            Out of Credits
          </h1>
          <p className="text-gray-600 mb-6 text-center">
            You have used all your available credits. Please purchase more to
            continue using our services.
          </p>
          <Link
            href="/pricing"
            className="inline-block px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
          >
            Purchase Credits
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {!user ? (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-lg font-medium text-gray-600">Loading...</p>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default Layout;
