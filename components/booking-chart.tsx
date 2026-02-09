"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

import { bookingChartData } from "@/lib/data";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart";

const chartConfig = {
  standard: {
    label: "Standard",
    color: "hsl(var(--chart-1))",
  },
  premium: {
    label: "Premium",
    color: "hsl(var(--chart-2))",
  },
  apartment: {
    label: "Apartment",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export function BookingChart() {
  return (
    <div className="animate-fade-in">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Booking Statistics
        </h3>
        <p className="text-sm text-muted-foreground">
          Monthly reservations by room type
        </p>
      </div>
      <div className="rounded-lg border bg-card p-4 md:p-6">
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <AreaChart
            data={bookingChartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Area
              type="monotone"
              dataKey="standard"
              stackId="1"
              stroke="var(--color-standard)"
              fill="var(--color-standard)"
              fillOpacity={0.4}
            />
            <Area
              type="monotone"
              dataKey="premium"
              stackId="1"
              stroke="var(--color-premium)"
              fill="var(--color-premium)"
              fillOpacity={0.4}
            />
            <Area
              type="monotone"
              dataKey="apartment"
              stackId="1"
              stroke="var(--color-apartment)"
              fill="var(--color-apartment)"
              fillOpacity={0.4}
            />
          </AreaChart>
        </ChartContainer>
      </div>
    </div>
  );
}
