import { Brain } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="border-t py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <Brain className="h-5 w-5 text-primary" />
            <span className="font-bold">Intervu</span>
          </div>
          <div className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Intervu. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
