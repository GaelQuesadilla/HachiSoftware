"use client";

import { useCodeContext } from "@/components/contexts/codeContext";

export default function CodeTextArea() {
  // Consumimos `rawCode` para la respuesta inmediata al escribir
  const { rawCode, setCode } = useCodeContext();

  return (
    <textarea
      value={rawCode}
      onChange={(e) => setCode(e.target.value)}
      rows={20}
      className="bg-stone-800 p-5 text-amber-50 font-mono w-full h-full resize-none overflow-auto z-20"
      name="code-area"
      autoComplete="off"
    />
  );
}
