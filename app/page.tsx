import { BookingForm } from "@/components/booking-form";
import { ReservationsTable } from "@/components/reservations-table";
import { BookingChart } from "@/components/booking-chart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hotel, CalendarRange, BarChart3 } from "lucide-react";

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Hotel className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-foreground md:text-xl">
                Luxe Hotels
              </h1>
              <p className="hidden text-xs text-muted-foreground md:block">
                Premium Booking Experience
              </p>
            </div>
          </div>
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="hidden md:inline">Welcome back</span>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 md:px-6 md:py-10">
        <div className="mb-8">
          <h2 className="text-balance text-2xl font-bold tracking-tight text-foreground md:text-3xl lg:text-4xl">
            Book Your Perfect Stay
          </h2>
          <p className="mt-2 text-pretty text-muted-foreground md:text-lg">
            Select your room, choose your dates, and complete your reservation in just a few steps.
          </p>
        </div>

        <Tabs defaultValue="booking" className="flex flex-col gap-6">
          <TabsList className="w-fit">
            <TabsTrigger value="booking" className="gap-2">
              <CalendarRange className="h-4 w-4" />
              <span className="hidden md:inline">New Booking</span>
            </TabsTrigger>
            <TabsTrigger value="reservations" className="gap-2">
              <Hotel className="h-4 w-4" />
              <span className="hidden md:inline">Reservations</span>
            </TabsTrigger>
            <TabsTrigger value="statistics" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden md:inline">Statistics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="booking">
            <BookingForm />
          </TabsContent>

          <TabsContent value="reservations">
            <ReservationsTable />
          </TabsContent>

          <TabsContent value="statistics">
            <BookingChart />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="border-t bg-card">
        <div className="container mx-auto px-4 py-6 md:px-6">
          <p className="text-center text-sm text-muted-foreground">
            Luxe Hotels Booking App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
