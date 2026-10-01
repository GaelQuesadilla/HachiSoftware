"use client";

import { useRef, ChangeEvent } from "react";
import { Brand } from "./atoms/brand";
import { NavDropdown } from "./atoms/navDropdown";
import { NavItem } from "./atoms/navItem";
import { useCodeContext } from "@/components/contexts/codeContext";

const readFile = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve((event.target?.result as string) ?? "");
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsText(file);
  });
};

export const Navbar = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { setCode } = useCodeContext();

  const handleOpenClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const content = await readFile(file);
      setCode(content);
    } catch (error) {
      console.error("Error al leer el archivo:", error);
    } finally {
      e.target.value = "";
    }
  };

  return (
    <div className="h-10 p-2 bg-sky-600 text-white flex items-center">
      <Brand />

      <div>
        <NavDropdown label="Archivo">
          <NavItem className="block w-full" onClick={handleOpenClick}>
            Abrir archivo
          </NavItem>
        </NavDropdown>

        {/* Input invisible para abrir el selector de archivos */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".txt, .asm"
          className="hidden"
        />
      </div>
    </div>
  );
};
