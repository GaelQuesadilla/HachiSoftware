"use client";

import { useState, ReactNode, MouseEvent } from "react";
import { NavItem } from "./navItem";
import { Dropdown } from "@/components/global/dropdown";

interface NavDropdownProps {
  label: ReactNode;
  children: ReactNode;
}

export const NavDropdown = ({ label, children }: NavDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block">
      <NavItem onMouseDown={handleMouseDown}>
        {label}
        <span className="text-xs"></span>
      </NavItem>

      <Dropdown isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {children}
      </Dropdown>
    </div>
  );
};
