"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import React, { Dispatch, SetStateAction, useState } from "react";
import { departments } from "../data/departments.js";

const courses = [
  { label: "CS101", value: "CS101" },
  { label: "MATH101", value: "MATH101" },
  { label: "ALG101", value: "ALG101" },
  { label: "MATH100", value: "MATH100" },
];

export function CourseSelector({
  setCourse,
}: {
  setCourse: Dispatch<SetStateAction<string>>;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={false}
          className="relative w-[200px] justify-between"
        >
          <p className="block w-36 overflow-hidden whitespace-nowrap text-start">
            {value
              ? courses.find((course) => course.value === value)?.value
              : `Select class...`}
          </p>
          <ChevronsUpDown className="absolute right-4 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search classes..." />
          <CommandList>
            <CommandEmpty>No departments found</CommandEmpty>
            <CommandGroup>
              {courses.map((course) => (
                <CommandItem
                  key={course.value}
                  value={course.value}
                  onSelect={(currentValue) => {
                    setOpen(false);
                    setValue(currentValue === value ? "" : currentValue);
                    setCourse(currentValue);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === course.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                  {course.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
