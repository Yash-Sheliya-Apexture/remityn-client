"use client";

import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Assuming your select component is in "@/components/ui/select"
import { cn } from "@/lib/utils";

interface Option {
  value: string;
  label: string;
}

interface ReusableDropdownProps {
  options: Option[];
  value?: string; // Optional initial value
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  size?: "sm" | "default";
  className?: string;
  condition: boolean; // Prop for conditional rendering
}

const ReusableDropdown: React.FC<ReusableDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled,
  size = "default",
  className,
  condition,
}) => {
  if (!condition) {
    return null; // Conditionally render: if condition is false, return null
  }

  return (
    <Select onValueChange={onChange} value={value} disabled={disabled}>
      <SelectTrigger
        className={cn(className)}
        size={size}
      >
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default ReusableDropdown;