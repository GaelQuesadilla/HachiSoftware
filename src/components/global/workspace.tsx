"use client";
import CodeArea from "../codeArea/codeArea";
import { LexicalView } from "../lexicalView/lexicalView";
import { useCodeEditor } from "../codeArea/hooks/useCodeEditor";

export const Workspace = () => {
  const { code, setCode } = useCodeEditor("");

  return (
    <>
      <div
        id="workspace"
        className="grid grid-cols-2 h-max, w-full overflow-hidden"
      >
        <CodeArea code={code} setCode={setCode} />
        <LexicalView code={code} />
      </div>
    </>
  );
};
