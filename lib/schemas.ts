import { z } from "zod";

// ─── Step 1: Room & Dates ───
export const stepOneSchema = z
  .object({
    roomId: z.string().min(1, "Please select a room"),
    roomType: z.enum(["standard", "premium", "apartment"], {
      required_error: "Please select a room type",
    }),
    checkIn: z.date({ required_error: "Check-in date is required" }),
    checkOut: z.date({ required_error: "Check-out date is required" }),
    guests: z
      .number({ required_error: "Number of guests is required" })
      .min(1, "At least 1 guest required")
      .max(10, "Maximum 10 guests"),
  })
  .refine((data) => data.checkOut > data.checkIn, {
    message: "Check-out date must be after check-in date",
    path: ["checkOut"],
  });

// ─── Step 2: Guest Information ───
export const stepTwoSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters"),
  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .regex(
      /^\+?[1-9]\d{1,14}$/,
      "Please enter a valid phone number (e.g. +48123456789)"
    ),
  postalCode: z
    .string()
    .regex(
      /^\d{2}-\d{3}$/,
      "Please enter a valid postal code (e.g. 00-001)"
    ),
  specialRequests: z.string().max(500, "Maximum 500 characters").optional().default(""),
});

// ─── Step 3: Payment ───
export const stepThreeSchema = z.object({
  paymentMethod: z.enum(["credit-card", "debit-card", "bank-transfer"], {
    required_error: "Please select a payment method",
  }),
  cardNumber: z
    .string()
    .regex(/^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/, "Please enter a valid 16-digit card number"),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Please enter a valid expiry date (MM/YY)"),
  cvv: z.string().regex(/^\d{3,4}$/, "CVV must be 3 or 4 digits"),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
  recaptchaToken: z.string().min(1, "Please complete the reCAPTCHA verification"),
});

// ─── Full Booking Schema ───
export const fullBookingSchema = stepOneSchema
  .innerType()
  .merge(stepTwoSchema)
  .merge(stepThreeSchema);

export type StepOneFormData = z.infer<typeof stepOneSchema>;
export type StepTwoFormData = z.infer<typeof stepTwoSchema>;
export type StepThreeFormData = z.infer<typeof stepThreeSchema>;
export type FullBookingFormData = z.infer<typeof fullBookingSchema>;
