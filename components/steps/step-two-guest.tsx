"use client";

import { useFormContext } from "react-hook-form";
import type { StepTwoFormData } from "@/lib/schemas";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function StepTwoGuest() {
  const form = useFormContext<StepTwoFormData>();

  return (
    <div className="animate-fade-in flex flex-col gap-6">
      <div>
        <h3 className="mb-1 text-lg font-semibold text-foreground">
          Guest Information
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Please provide your personal details
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Jan"
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Kowalski"
                  className="focus:ring-2 focus:ring-ring"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email Address</FormLabel>
            <FormControl>
              <Input
                type="email"
                placeholder="jan.kowalski@email.com"
                className="focus:ring-2 focus:ring-ring"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Booking confirmation will be sent to this email
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="tel"
                  placeholder="+48123456789"
                  className="focus:ring-2 focus:ring-ring"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                International format (e.g. +48123456789)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Postal Code</FormLabel>
              <FormControl>
                <Input
                  placeholder="00-001"
                  className="focus:ring-2 focus:ring-ring"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Format: XX-XXX (e.g. 00-001)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="specialRequests"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Special Requests</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Any special requests or preferences for your stay..."
                className="min-h-[100px] resize-none focus:ring-2 focus:ring-ring"
                {...field}
              />
            </FormControl>
            <FormDescription>
              Optional - Let us know about any special requirements
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
