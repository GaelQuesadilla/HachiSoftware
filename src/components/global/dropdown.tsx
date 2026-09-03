"use client";

import { useState, useRef, useEffect, ReactNode } from "react";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const Dropdown = ({ isOpen, onClose, children }: DropdownProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className="absolute left-0 mt-2 w-48 rounded-md bg-stone-900 border border-stone-800 shadow-lg py-1 z-50"
    >
      {children}
    </div>
  );
};
