"use client";

import * as React from "react";
import { useFormContext } from "react-hook-form";
import { Users, Wifi, Tv, Wind, Coffee, Sparkles, Car, UtensilsCrossed } from "lucide-react";

import type { BaseRoom, PremiumRoom, RoomType, SelectOption } from "@/types/booking";
import { isPremiumRoom, formatBookingPrice } from "@/types/booking";
import type { StepOneFormData } from "@/lib/schemas";
import { rooms } from "@/lib/data";

import { BookingCard } from "@/components/booking-card";
import { DatePicker } from "@/components/date-picker";
import { SelectField } from "@/components/select-field";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const amenityIcons: Record<string, React.ReactNode> = {
  "Wi-Fi": <Wifi className="h-3.5 w-3.5" />,
  "TV": <Tv className="h-3.5 w-3.5" />,
  "Air Conditioning": <Wind className="h-3.5 w-3.5" />,
  "Mini Bar": <Coffee className="h-3.5 w-3.5" />,
  "Room Service": <UtensilsCrossed className="h-3.5 w-3.5" />,
  "Spa Access": <Sparkles className="h-3.5 w-3.5" />,
  "Parking": <Car className="h-3.5 w-3.5" />,
};

const guestOptions: SelectOption<string>[] = Array.from({ length: 10 }, (_, i) => ({
  label: `${i + 1} ${i === 0 ? "Guest" : "Guests"}`,
  value: String(i + 1),
}));

export function StepOneRoom() {
  const form = useFormContext<StepOneFormData>();
  const selectedRoomId = form.watch("roomId");
  const checkInDate = form.watch("checkIn");

  const handleRoomSelect = (room: BaseRoom | PremiumRoom) => {
    form.setValue("roomId", room.id, { shouldValidate: true });
    form.setValue("roomType", room.type as RoomType, { shouldValidate: true });
  };

  return (
    <div className="animate-fade-in flex flex-col gap-8">
      {/* Room Selection */}
      <div>
        <h3 className="mb-1 text-lg font-semibold text-foreground">
          Select Your Room
        </h3>
        <p className="mb-4 text-sm text-muted-foreground">
          Choose from our available rooms
        </p>
        <FormField
          control={form.control}
          name="roomId"
          render={() => (
            <FormItem>
              <FormControl>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {rooms.map((room) => {
                    const isSelected = selectedRoomId === room.id;
                    const premium = isPremiumRoom(room);

                    return (
                      <BookingCard
                        key={room.id}
                        isSelected={isSelected}
                        onClick={() => handleRoomSelect(room)}
                        role="button"
                        tabIndex={0}
                        aria-pressed={isSelected}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            handleRoomSelect(room);
                          }
                        }}
                      >
                        <BookingCard.Header>
                          {premium && (
                            <BookingCard.Badge>Premium</BookingCard.Badge>
                          )}
                          <BookingCard.Image
                            src={room.imageUrl}
                            alt={`${room.name} - ${room.type} room`}
                          />
                        </BookingCard.Header>
                        <BookingCard.Body>
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h4 className="font-semibold text-foreground">
                              {room.name}
                            </h4>
                            <Badge variant="secondary" className="shrink-0 capitalize">
                              {room.type}
                            </Badge>
                          </div>
                          <p className="mb-3 text-sm leading-relaxed text-muted-foreground">
                            {room.description}
                          </p>
                          <TooltipProvider>
                            <div className="flex flex-wrap gap-1.5">
                              {room.amenities.slice(0, 4).map((amenity) => (
                                <Tooltip key={amenity}>
                                  <TooltipTrigger asChild>
                                    <span className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground">
                                      {amenityIcons[amenity] || null}
                                      {amenity}
                                    </span>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>{amenity} included</p>
                                  </TooltipContent>
                                </Tooltip>
                              ))}
                              {room.amenities.length > 4 && (
                                <span className="inline-flex items-center rounded-md bg-secondary px-2 py-1 text-xs text-muted-foreground">
                                  +{room.amenities.length - 4} more
                                </span>
                              )}
                            </div>
                          </TooltipProvider>
                          {premium && (
                            <div className="mt-3 flex flex-wrap gap-1.5">
                              {room.hasJacuzzi && (
                                <Badge variant="outline" className="text-xs">Jacuzzi</Badge>
                              )}
                              {room.hasBalcony && (
                                <Badge variant="outline" className="text-xs">Balcony</Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                Floor {room.floorLevel}
                              </Badge>
                            </div>
                          )}
                        </BookingCard.Body>
                        <BookingCard.Footer>
                          <div className="flex items-center gap-1.5 text-muted-foreground">
                            <Users className="h-4 w-4" />
                            <span className="text-sm">
                              Up to {room.maxGuests} guests
                            </span>
                          </div>
                          <p className="text-lg font-bold text-foreground">
                            {formatBookingPrice(room.pricePerNight)}
                            <span className="text-sm font-normal text-muted-foreground">
                              /night
                            </span>
                          </p>
                        </BookingCard.Footer>
                      </BookingCard>
                    );
                  })}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Date & Guest Selection */}
      <div className="grid gap-4 md:grid-cols-3">
        <FormField
          control={form.control}
          name="checkIn"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check-in Date</FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value}
                  onSelect={field.onChange}
                  placeholder="Select check-in"
                  disabledDates={(date) => date < new Date()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="checkOut"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Check-out Date</FormLabel>
              <FormControl>
                <DatePicker
                  date={field.value}
                  onSelect={field.onChange}
                  placeholder="Select check-out"
                  disabledDates={(date) =>
                    checkInDate ? date <= checkInDate : date <= new Date()
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="guests"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Guests</FormLabel>
              <FormControl>
                <SelectField<string>
                  options={guestOptions}
                  value={field.value ? String(field.value) : undefined}
                  onValueChange={(val) => field.onChange(Number(val))}
                  placeholder="Number of guests"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
