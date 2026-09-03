import { CodeProvider } from "@/components/contexts/codeContext";
import { Workspace } from "@/components/global/workspace";
import { Navbar } from "@/navbar/atoms/navbar";

export default function Home() {
  return (
    <>
      <CodeProvider>
        <Navbar />
        <Workspace />
      </CodeProvider>
    </>
  );
}
