"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight, Send } from "lucide-react";

import type { StepIndex } from "@/types/booking";
import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchema,
  type StepOneFormData,
  type StepTwoFormData,
  type StepThreeFormData,
} from "@/lib/schemas";

import { BookingStepper } from "@/components/booking-stepper";
import { StepOneRoom } from "@/components/steps/step-one-room";
import { StepTwoGuest } from "@/components/steps/step-two-guest";
import { StepThreePayment } from "@/components/steps/step-three-payment";
import { BookingSuccessDialog } from "@/components/booking-success-dialog";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

// ─── Typed useRef ───
type FormRef = HTMLFormElement | null;

export function BookingForm() {
  const [currentStep, setCurrentStep] = React.useState<StepIndex>(0);
  const [showSuccess, setShowSuccess] = React.useState<boolean>(false);
  const formRef = React.useRef<FormRef>(null);

  // Accumulated data across steps
  const [stepOneData, setStepOneData] = React.useState<StepOneFormData | null>(null);
  const [stepTwoData, setStepTwoData] = React.useState<StepTwoFormData | null>(null);

  // Step 1 form
  const stepOneForm = useForm<StepOneFormData>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      roomId: "",
      roomType: undefined,
      checkIn: undefined,
      checkOut: undefined,
      guests: undefined,
    },
  });

  // Step 2 form
  const stepTwoForm = useForm<StepTwoFormData>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      postalCode: "",
      specialRequests: "",
    },
  });

  // Step 3 form
  const stepThreeForm = useForm<StepThreeFormData>({
    resolver: zodResolver(stepThreeSchema),
    defaultValues: {
      paymentMethod: undefined,
      cardNumber: "",
      expiryDate: "",
      cvv: "",
      acceptTerms: false,
      recaptchaToken: "",
    },
  });

  const handleNextStep = async () => {
    if (currentStep === 0) {
      const isValid = await stepOneForm.trigger();
      if (isValid) {
        setStepOneData(stepOneForm.getValues() as StepOneFormData);
        setCurrentStep(1);
      }
    } else if (currentStep === 1) {
      const isValid = await stepTwoForm.trigger();
      if (isValid) {
        setStepTwoData(stepTwoForm.getValues());
        setCurrentStep(2);
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => (prev - 1) as StepIndex);
    }
  };

  const handleSubmit = async () => {
    const isValid = await stepThreeForm.trigger();
    if (isValid) {
      // Simulate API call
      setShowSuccess(true);
    }
  };

  const handleReset = () => {
    setShowSuccess(false);
    setCurrentStep(0);
    setStepOneData(null);
    setStepTwoData(null);
    stepOneForm.reset();
    stepTwoForm.reset();
    stepThreeForm.reset();
  };

  const currentForm =
    currentStep === 0
      ? stepOneForm
      : currentStep === 1
      ? stepTwoForm
      : stepThreeForm;

  return (
    <section className="animate-fade-in">
      <BookingStepper currentStep={currentStep} className="mb-8" />

      <div className="rounded-xl border bg-card p-4 md:p-8">
        <form ref={formRef} onSubmit={(e) => e.preventDefault()}>
          {/* @ts-expect-error - form type varies by step */}
          <Form {...currentForm}>
            {currentStep === 0 && <StepOneRoom />}
            {currentStep === 1 && <StepTwoGuest />}
            {currentStep === 2 && stepOneData && stepTwoData && (
              <StepThreePayment
                bookingData={{
                  roomId: stepOneData.roomId,
                  checkIn: stepOneData.checkIn,
                  checkOut: stepOneData.checkOut,
                  guests: stepOneData.guests,
                  firstName: stepTwoData.firstName,
                  lastName: stepTwoData.lastName,
                }}
              />
            )}
          </Form>
        </form>

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between border-t pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            className="gap-2 bg-transparent"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden md:inline">Previous</span>
          </Button>

          <div className="flex items-center gap-1">
            {[0, 1, 2].map((step) => (
              <div
                key={step}
                className={`h-2 w-2 rounded-full transition-colors ${
                  step === currentStep
                    ? "bg-primary"
                    : step < currentStep
                    ? "bg-primary/50"
                    : "bg-muted-foreground/20"
                }`}
              />
            ))}
          </div>

          {currentStep < 2 ? (
            <Button
              type="button"
              onClick={handleNextStep}
              className="gap-2"
            >
              <span className="hidden md:inline">Next</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              className="gap-2"
            >
              <Send className="h-4 w-4" />
              <span className="hidden md:inline">Complete Booking</span>
            </Button>
          )}
        </div>
      </div>

      <BookingSuccessDialog
        open={showSuccess}
        onClose={handleReset}
      />
    </section>
  );
}
