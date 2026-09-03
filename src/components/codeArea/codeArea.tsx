import CodeTextArea from "./atoms/codeTextArea";
import { EditorContainer } from "./atoms/editorContainer";
import { Dispatch, SetStateAction } from "react";
import { useCodeContext } from "@/components/contexts/codeContext";

export default function CodeArea() {
  const { code, setCode } = useCodeContext();
  return (
    <>
      <EditorContainer>
        <CodeTextArea />
      </EditorContainer>
    </>
  );
}
