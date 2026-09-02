"use client";

import { Dispatch, SetStateAction } from "react";
import { useCodeEditor } from "../hooks/useCodeEditor";

interface CodeTextAreaProps {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}

export default function CodeTextArea({ code, setCode }: CodeTextAreaProps) {
  return (
    <>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        rows={20}
        className="bg-stone-800 p-5 text-amber-50 font-mono w-full h-full resize-none overflow-auto"
        name="code-area"
        autoComplete="false"
      ></textarea>
    </>
  );
}
