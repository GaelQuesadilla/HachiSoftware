import { useState } from "react";

export const useCodeEditor = (inputCode = "") => {
  const [code, setCode] = useState(inputCode);

  return { code, setCode };
};
