"use client";
import { optimizedTokenizer, Token, tokenizer } from "@/utils/tokenizer";
import { useMemo } from "react";
import { Chip } from "./typeChips/chip";

interface TokenViewerProps {
  code: string;
}

export const LexicalView = ({ code }: TokenViewerProps) => {
  const tokens: Token[] = useMemo(() => optimizedTokenizer(code), [code]);

  console.log(tokens);
  return (
    <>
      <div className="bg-stone-800 p-5 text-amber-50 font-mono w-full h-full resize-none overflow-y-visible z-50 ">
        {tokens.map((token, index) => {
          return <Chip token={token} key={index} />;
        })}
      </div>
    </>
  );
};
