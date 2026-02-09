"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

// ─── Compound Component: BookingCard ───

interface BookingCardContextValue {
  isSelected: boolean;
}

const BookingCardContext = React.createContext<BookingCardContextValue>({
  isSelected: false,
});

// Root
interface BookingCardProps extends React.HTMLAttributes<HTMLDivElement> {
  isSelected?: boolean;
}

function BookingCardRoot({
  isSelected = false,
  className,
  children,
  ...props
}: BookingCardProps) {
  return (
    <BookingCardContext.Provider value={{ isSelected }}>
      <div
        className={cn(
          "group @container/card relative overflow-hidden rounded-lg border bg-card text-card-foreground transition-all",
          "hover:shadow-lg hover:-translate-y-1",
          "focus-within:ring-2 focus-within:ring-ring",
          "active:translate-y-0 active:shadow-md",
          isSelected && "ring-2 ring-primary border-primary",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </BookingCardContext.Provider>
  );
}

// Header
function BookingCardHeader({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      {children}
    </div>
  );
}

// Image
function BookingCardImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={cn("aspect-[16/10] overflow-hidden", className)}>
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  );
}

// Body
function BookingCardBody({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("p-4 @[20rem]/card:p-6", className)} {...props}>
      {children}
    </div>
  );
}

// Footer
function BookingCardFooter({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { isSelected } = React.useContext(BookingCardContext);

  return (
    <div
      className={cn(
        "flex items-center justify-between border-t p-4 @[20rem]/card:p-6",
        isSelected && "bg-primary/5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

// Badge inside card
function BookingCardBadge({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "absolute right-3 top-3 z-10 rounded-md bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}

// Compose the compound component
export const BookingCard = Object.assign(BookingCardRoot, {
  Header: BookingCardHeader,
  Image: BookingCardImage,
  Body: BookingCardBody,
  Footer: BookingCardFooter,
  Badge: BookingCardBadge,
});
