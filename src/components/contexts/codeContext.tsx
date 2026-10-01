"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCode } from "./hooks/useCode";

interface CodeContextType {
  code: string; // Estado con debounce (para análisis/vistas pesadas)
  rawCode: string; // Estado en tiempo real (para el textarea/editor)
  setCode: Dispatch<SetStateAction<string>>;
}

interface CodeContextProvider {
  children?: ReactNode;
}

export const CodeContext = createContext<CodeContextType | undefined>(
  undefined,
);

export const CodeProvider = ({ children }: CodeContextProvider) => {
  // 1. rawCode maneja la escritura en tiempo real (0ms de retraso)
  const { code: rawCode, setCode } = useCode("");

  // 2. code almacena el valor debouneado
  const [debouncedCode, setDebouncedCode] = useState<string>("");

  // 3. Efecto para retrasar la actualización de debouncedCode
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedCode(rawCode);
    }, 300); // Retraso de 300ms

    return () => clearTimeout(timer); // Limpia el temporizador si rawCode cambia antes del límite
  }, [rawCode]);

  return (
    <CodeContext.Provider
      value={{
        code: debouncedCode, // Los visores usarán esta propiedad optimizada
        rawCode, // El editor usará esta propiedad inmediata
        setCode,
      }}
    >
      {children}
    </CodeContext.Provider>
  );
};

export const useCodeContext = () => {
  const context = useContext(CodeContext);
  if (!context) {
    throw new Error("useCodeContext debe usarse dentro de un CodeProvider");
  }
  return context;
};
