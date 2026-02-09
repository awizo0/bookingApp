// ─── Union Types ───
export type RoomType = "standard" | "premium" | "apartment";
export type BookingStatus = "pending" | "confirmed" | "cancelled";
export type PaymentMethod = "credit-card" | "debit-card" | "bank-transfer";
export type StepIndex = 0 | 1 | 2;

// ─── Base interfaces ───
export interface BaseRoom {
  id: string;
  name: string;
  type: RoomType;
  pricePerNight: number;
  maxGuests: number;
  description: string;
  amenities: string[];
  imageUrl: string;
}

export interface PremiumFeatures {
  hasJacuzzi: boolean;
  hasBalcony: boolean;
  floorLevel: number;
  conciergeService: boolean;
}

// ─── Intersection Type ───
export type PremiumRoom = BaseRoom & PremiumFeatures;

// ─── Type Predicate ───
export function isPremiumRoom(room: BaseRoom): room is PremiumRoom {
  return (
    room.type === "premium" &&
    "hasJacuzzi" in room &&
    "hasBalcony" in room
  );
}

// ─── Built-in Generic Types ───
export type PartialRoom = Partial<BaseRoom>;
export type RoomWithoutId = Omit<BaseRoom, "id">;
export type RoomPriceMap = Record<RoomType, number>;

// ─── Booking Data ───
export interface BookingStepOneData {
  roomId: string;
  roomType: RoomType;
  checkIn: Date;
  checkOut: Date;
  guests: number;
}

export interface BookingStepTwoData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  postalCode: string;
  specialRequests: string;
}

export interface BookingStepThreeData {
  paymentMethod: PaymentMethod;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  acceptTerms: boolean;
  recaptchaToken: string;
}

export interface FullBookingData
  extends BookingStepOneData,
    BookingStepTwoData,
    BookingStepThreeData {}

// ─── Reservation (for table) ───
export interface Reservation {
  id: string;
  guestName: string;
  roomName: string;
  roomType: RoomType;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  totalPrice: number;
}

// ─── Chart Data ───
export interface BookingChartData {
  month: string;
  standard: number;
  premium: number;
  apartment: number;
}

// ─── Function Overloading ───
export function formatBookingPrice(amount: number): string;
export function formatBookingPrice(amount: number, currency: string): string;
export function formatBookingPrice(
  amount: number,
  currency: string,
  locale: string
): string;
export function formatBookingPrice(
  amount: number,
  currency: string = "USD",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);
}

// ─── Generic SelectOption ───
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}
