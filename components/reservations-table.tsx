"use client";

import * as React from "react";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import type { Reservation, BookingStatus } from "@/types/booking";
import { formatBookingPrice } from "@/types/booking";
import { mockReservations } from "@/lib/data";
import { cn } from "@/lib/utils";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const statusStyles: Record<BookingStatus, string> = {
  confirmed: "bg-chart-3/10 text-chart-3 border-chart-3/20",
  pending: "bg-accent/10 text-accent border-accent/20",
  cancelled: "bg-destructive/10 text-destructive border-destructive/20",
};

export function ReservationsTable() {
  const [reservations, setReservations] =
    React.useState<Reservation[]>(mockReservations);
  const [sortField, setSortField] = React.useState<
    keyof Reservation | null
  >(null);
  const [sortDirection, setSortDirection] = React.useState<"asc" | "desc">(
    "asc"
  );

  const handleSort = (field: keyof Reservation) => {
    if (sortField === field) {
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedReservations = React.useMemo(() => {
    if (!sortField) return reservations;
    return [...reservations].sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDirection === "asc"
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      if (typeof aVal === "number" && typeof bVal === "number") {
        return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  }, [reservations, sortField, sortDirection]);

  const handleStatusChange = (id: string, newStatus: BookingStatus) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Recent Reservations
        </h3>
        <p className="text-sm text-muted-foreground">
          Manage and track all bookings
        </p>
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">ID</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 -ml-3"
                  onClick={() => handleSort("guestName")}
                >
                  Guest
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead className="hidden md:table-cell">Room</TableHead>
              <TableHead className="hidden lg:table-cell">Check-in</TableHead>
              <TableHead className="hidden lg:table-cell">Check-out</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="gap-1 -mr-3"
                  onClick={() => handleSort("totalPrice")}
                >
                  Total
                  <ArrowUpDown className="h-3.5 w-3.5" />
                </Button>
              </TableHead>
              <TableHead className="w-[50px]">
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedReservations.map((reservation) => (
              <TableRow key={reservation.id} className="group">
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {reservation.id}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {reservation.guestName}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <div>
                    <p className="text-sm text-foreground">{reservation.roomName}</p>
                    <p className="text-xs capitalize text-muted-foreground">
                      {reservation.roomType}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-foreground">
                  {reservation.checkIn}
                </TableCell>
                <TableCell className="hidden lg:table-cell text-sm text-foreground">
                  {reservation.checkOut}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "capitalize",
                      statusStyles[reservation.status]
                    )}
                  >
                    {reservation.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-semibold text-foreground">
                  {formatBookingPrice(reservation.totalPrice)}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(reservation.id, "confirmed")
                        }
                      >
                        Confirm
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleStatusChange(reservation.id, "pending")
                        }
                      >
                        Set Pending
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() =>
                          handleStatusChange(reservation.id, "cancelled")
                        }
                      >
                        Cancel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
