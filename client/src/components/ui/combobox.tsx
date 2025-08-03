"use client";

import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Items } from "@/types/misc";

export function ComboboxPopover({
  items,
  placeholder,
  label,
  selectedValue,
  onChange,
  trigger,
}: {
  items: Items[];
  label?: string;
  defaultValue?: string;
  selectedValue?: string;
  trigger?: React.ReactNode;
  placeholder?: string;
  onChange?: (value: string) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const selectedItem = items.find((item) => item.value === selectedValue);

  return (
    <div className="flex items-center space-x-4 w-full">
      <p className="text-muted-foreground text-sm">{label}</p>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          {trigger ? (
            trigger
          ) : (
            <Button
              variant="outline"
              className="justify-between grow flex items-center"
            >
              <span>
                {selectedItem ? (
                  <>{selectedItem.label}</>
                ) : (
                  <>{placeholder ?? "Select Item"}</>
                )}
              </span>
              <ChevronDownIcon className="ml-2 h-4 w-4 text-muted-foreground" />
            </Button>
          )}
        </PopoverTrigger>
        <PopoverContent
          className="p-0"
          //   side="right"
          align="start"
        >
          <Command defaultValue={selectedValue}>
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.value}
                    value={item.value}
                    onSelect={(value) => {
                      if (onChange) {
                        onChange(value);
                      }
                      setOpen(false);
                    }}
                  >
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
