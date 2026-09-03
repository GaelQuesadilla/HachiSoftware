import { ReactNode } from "react";

interface EditorContainerProps {
  children: ReactNode;
}

export const EditorContainer = ({ children }: EditorContainerProps) => {
  return <div className="h-full w-full z-20">{children}</div>;
};
