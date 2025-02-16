"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { icons } from "@/lib/static";

interface ModalProps {
  children: React.ReactNode;
  triggerLabel?: string;
  triggerIcon?: keyof typeof icons;
  title: string;
  description?: string;
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  className?: string;
  triggerSize?: "sm" | "lg" | "icon";
  iconSize?: number;
}

export function Modal({
  children,
  triggerLabel,
  triggerIcon,
  title,
  description,
  isOpen,
  onClose,
  onOpen,
  className,
  triggerSize,
  iconSize,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <Button
        className={className}
        onClick={onOpen}
        icon={triggerIcon}
        size={triggerSize}
        iconSize={iconSize}
      >
        {triggerLabel}
      </Button>

      <DialogContent className="sm:max-w-[425px] max-h-[60vh] overflow-auto">
        {(title || description) && (
          <DialogHeader>
            {title && <DialogTitle className="capitalize">{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}

        <div>{children}</div>
      </DialogContent>
    </Dialog>
  );
}
