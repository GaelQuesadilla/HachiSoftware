"use client";

import { useCodeEditor } from "./hooks/useCodeEditor";
import CodeTextArea from "./atoms/codeTextArea";
import { EditorContainer } from "./atoms/editorContainer";

export default function CodeArea() {
  const { code, setCode } = useCodeEditor("");
  return (
    <>
      <EditorContainer>
        <CodeTextArea code={code} setCode={setCode} />
      </EditorContainer>
    </>
  );
}
