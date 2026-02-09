"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StepIndex } from "@/types/booking";

interface Step {
  label: string;
  description: string;
}

const steps: Step[] = [
  { label: "Room & Dates", description: "Choose your stay" },
  { label: "Guest Details", description: "Your information" },
  { label: "Payment", description: "Complete booking" },
];

interface BookingStepperProps {
  currentStep: StepIndex;
  className?: string;
}

export function BookingStepper({ currentStep, className }: BookingStepperProps) {
  return (
    <nav aria-label="Booking progress" className={className}>
      <ol className="flex items-center gap-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <React.Fragment key={step.label}>
              <li className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-all",
                    isCompleted &&
                      "border-primary bg-primary text-primary-foreground",
                    isCurrent &&
                      "border-primary text-primary",
                    !isCompleted &&
                      !isCurrent &&
                      "border-muted-foreground/30 text-muted-foreground"
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    index + 1
                  )}
                </div>
                <div className="hidden md:block">
                  <p
                    className={cn(
                      "text-sm font-medium",
                      (isCompleted || isCurrent) ? "text-foreground" : "text-muted-foreground"
                    )}
                  >
                    {step.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </li>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "h-px flex-1 min-w-[2rem]",
                    isCompleted ? "bg-primary" : "bg-border"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
