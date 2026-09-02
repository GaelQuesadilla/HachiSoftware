import { useCodeEditor } from "./hooks/useCodeEditor";
import CodeTextArea from "./atoms/codeTextArea";
import { EditorContainer } from "./atoms/editorContainer";
import { Dispatch, SetStateAction } from "react";

interface CodeArea {
  code: string;
  setCode: Dispatch<SetStateAction<string>>;
}

export default function CodeArea({ code, setCode }: CodeArea) {
  return (
    <>
      <EditorContainer>
        <CodeTextArea code={code} setCode={setCode} />
      </EditorContainer>
    </>
  );
}
