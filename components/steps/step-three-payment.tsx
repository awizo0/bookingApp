"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { format } from "date-fns";
import { CreditCard, Building2, Landmark } from "lucide-react";

import type { StepThreeFormData } from "@/lib/schemas";
import type { PaymentMethod, SelectOption } from "@/types/booking";
import { formatBookingPrice } from "@/types/booking";
import { rooms } from "@/lib/data";

import { SelectField } from "@/components/select-field";
import { MockRecaptcha } from "@/components/mock-recaptcha";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";

const paymentOptions: SelectOption<PaymentMethod>[] = [
  { label: "Credit Card", value: "credit-card" },
  { label: "Debit Card", value: "debit-card" },
  { label: "Bank Transfer", value: "bank-transfer" },
];

const paymentIcons: Record<PaymentMethod, React.ReactNode> = {
  "credit-card": <CreditCard className="h-5 w-5" />,
  "debit-card": <Building2 className="h-5 w-5" />,
  "bank-transfer": <Landmark className="h-5 w-5" />,
};

interface StepThreePaymentProps {
  bookingData: {
    roomId: string;
    checkIn: Date;
    checkOut: Date;
    guests: number;
    firstName: string;
    lastName: string;
  };
}

export function StepThreePayment({ bookingData }: StepThreePaymentProps) {
  const form = useFormContext<StepThreeFormData>();
  const paymentMethod = form.watch("paymentMethod");

  const selectedRoom = rooms.find((r) => r.id === bookingData.roomId);
  const nights = selectedRoom && bookingData.checkIn && bookingData.checkOut
    ? Math.ceil(
        (bookingData.checkOut.getTime() - bookingData.checkIn.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0;
  const totalPrice = selectedRoom ? selectedRoom.pricePerNight * nights : 0;

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div>
        <h3 className="mb-1 text-lg font-semibold text-foreground">
          Summary & Payment
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Review your booking and complete payment
        </p>
      </div>

      {/* Booking Summary */}
      <div className="rounded-lg border bg-secondary/50 p-4 md:p-6">
        <h4 className="mb-3 font-semibold text-foreground">Booking Summary</h4>
        <div className="grid gap-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Room</span>
            <span className="font-medium text-foreground">
              {selectedRoom?.name ?? "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Guest</span>
            <span className="font-medium text-foreground">
              {bookingData.firstName} {bookingData.lastName}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Check-in</span>
            <span className="font-medium text-foreground">
              {bookingData.checkIn ? format(bookingData.checkIn, "PPP") : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Check-out</span>
            <span className="font-medium text-foreground">
              {bookingData.checkOut ? format(bookingData.checkOut, "PPP") : "N/A"}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Guests</span>
            <span className="font-medium text-foreground">{bookingData.guests}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Duration</span>
            <span className="font-medium text-foreground">
              {nights} {nights === 1 ? "night" : "nights"}
            </span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between">
            <span className="text-muted-foreground">
              {formatBookingPrice(selectedRoom?.pricePerNight ?? 0)} x {nights} nights
            </span>
            <span className="text-lg font-bold text-foreground">
              {formatBookingPrice(totalPrice)}
            </span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <FormField
        control={form.control}
        name="paymentMethod"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Payment Method</FormLabel>
            <FormControl>
              <SelectField<PaymentMethod>
                options={paymentOptions}
                value={field.value}
                onValueChange={field.onChange}
                placeholder="Select payment method"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {paymentMethod && (
        <div className="animate-fade-in flex items-center gap-2 rounded-lg border bg-card p-3">
          {paymentIcons[paymentMethod]}
          <span className="text-sm font-medium text-foreground capitalize">
            {paymentMethod.replace("-", " ")}
          </span>
        </div>
      )}

      {/* Card Details */}
      <div className="grid gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem className="md:col-span-3">
              <FormLabel>Card Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="1234 5678 9012 3456"
                  className="focus:ring-2 focus:ring-ring"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expiryDate"
          render={({ field }) => (
            <FormItem className="md:col-span-2">
              <FormLabel>Expiry Date</FormLabel>
              <FormControl>
                <Input
                  placeholder="MM/YY"
                  className="focus:ring-2 focus:ring-ring"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cvv"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CVV</FormLabel>
              <FormControl>
                <Input
                  placeholder="123"
                  type="password"
                  className="focus:ring-2 focus:ring-ring"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Terms & reCAPTCHA */}
      <FormField
        control={form.control}
        name="acceptTerms"
        render={({ field }) => (
          <FormItem className="flex flex-row items-start gap-3">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="leading-none">
              <FormLabel className="text-sm">
                I accept the terms and conditions and privacy policy
              </FormLabel>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="recaptchaToken"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <MockRecaptcha
                onVerify={(token) => field.onChange(token)}
                verified={!!field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
