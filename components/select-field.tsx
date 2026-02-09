"use client";

import * as React from "react";
import type { SelectOption } from "@/types/booking";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// ─── Generic Component ───
interface SelectFieldProps<T extends string> {
  options: SelectOption<T>[];
  value: T | undefined;
  onValueChange: (value: T) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function SelectField<T extends string>({
  options,
  value,
  onValueChange,
  placeholder = "Select an option",
  disabled = false,
  className,
}: SelectFieldProps<T>) {
  return (
    <Select
      value={value}
      onValueChange={(val) => onValueChange(val as T)}
      disabled={disabled}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
