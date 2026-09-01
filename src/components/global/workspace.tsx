import { ReactNode } from "react";

interface WorkspaceProps {
  children: ReactNode;
}
export const Workspace = ({ children }: WorkspaceProps) => {
  return (
    <>
      <div id="workspace" className="grid grid-cols-2">
        {children}
      </div>
    </>
  );
};
