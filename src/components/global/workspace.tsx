"use client";
import CodeArea from "@/components/codeArea/codeArea";
import { LexicalView } from "../lexicalView/lexicalView";
import { useCodeContext } from "../contexts/codeContext";

export const Workspace = () => {
  return (
    <>
      <div
        id="workspace"
        className="grid grid-cols-2 h-max, w-full overflow-hidden"
      >
        <CodeArea />
        <LexicalView />
      </div>
    </>
  );
};
