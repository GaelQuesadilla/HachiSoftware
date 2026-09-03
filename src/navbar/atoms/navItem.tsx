"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";

interface NavItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export const NavItem = ({
  children,
  className = "",
  ...props
}: NavItemProps) => {
  return (
    <button
      className={`px-3 py-1.5 text-sm rounded-md text-stone-200 transition-colors flex items-center gap-2 hover:brightness-125${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
