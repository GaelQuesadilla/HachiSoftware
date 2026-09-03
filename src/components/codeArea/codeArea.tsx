import CodeTextArea from "./atoms/codeTextArea";
import { EditorContainer } from "./atoms/editorContainer";

export default function CodeArea() {
  return (
    <>
      <EditorContainer>
        <CodeTextArea />
      </EditorContainer>
    </>
  );
}
