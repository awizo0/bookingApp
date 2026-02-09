"use client";

import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface BookingSuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

export function BookingSuccessDialog({
  open,
  onClose,
}: BookingSuccessDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <DialogTitle className="text-center text-xl">
            Booking Confirmed!
          </DialogTitle>
          <DialogDescription className="text-center">
            Your reservation has been successfully placed. A confirmation email
            will be sent to your inbox shortly.
          </DialogDescription>
        </DialogHeader>
        <div className="rounded-lg border bg-secondary/50 p-4">
          <p className="text-center text-sm text-muted-foreground">
            Reservation ID:{" "}
            <span className="font-mono font-semibold text-foreground">
              BK-{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </span>
          </p>
        </div>
        <DialogFooter className="sm:justify-center">
          <Button onClick={onClose} className="min-w-[140px]">
            New Booking
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
