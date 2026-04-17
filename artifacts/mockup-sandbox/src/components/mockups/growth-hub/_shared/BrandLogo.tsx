import React from "react";
import { Leaf } from "lucide-react";

export function BrandLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-primary text-primary-foreground p-1.5 rounded-lg flex items-center justify-center">
        <Leaf className="w-5 h-5" />
      </div>
      <span className="font-display font-semibold text-lg tracking-tight">Growth Hub</span>
    </div>
  );
}
