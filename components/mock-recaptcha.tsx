"use client";

import * as React from "react";
import { Check, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface MockRecaptchaProps {
  onVerify: (token: string) => void;
  verified: boolean;
  className?: string;
}

export function MockRecaptcha({
  onVerify,
  verified,
  className,
}: MockRecaptchaProps) {
  const [isVerifying, setIsVerifying] = React.useState<boolean>(false);

  const handleClick = () => {
    if (verified || isVerifying) return;
    setIsVerifying(true);

    // Simulate verification delay
    setTimeout(() => {
      const mockToken = `mock-recaptcha-token-${Date.now()}`;
      onVerify(mockToken);
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-lg border bg-card p-4",
        className
      )}
    >
      <button
        type="button"
        onClick={handleClick}
        disabled={verified || isVerifying}
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded border-2 transition-all",
          verified
            ? "border-primary bg-primary"
            : isVerifying
            ? "animate-pulse border-muted-foreground"
            : "border-muted-foreground hover:border-primary cursor-pointer"
        )}
        aria-label="Verify reCAPTCHA"
      >
        {verified && <Check className="h-4 w-4 text-primary-foreground" />}
      </button>
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-foreground">
          {isVerifying
            ? "Verifying..."
            : verified
            ? "Verified"
            : "I'm not a robot"}
        </span>
      </div>
      <div className="ml-auto flex flex-col items-center gap-0.5">
        <ShieldCheck className="h-6 w-6 text-muted-foreground" />
        <span className="text-[10px] text-muted-foreground">reCAPTCHA</span>
      </div>
    </div>
  );
}
