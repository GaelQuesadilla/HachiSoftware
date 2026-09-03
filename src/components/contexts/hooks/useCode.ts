"use client";
import { useState } from "react";

export const useCode = (inputCode = "") => {
  const [code, setCode] = useState(inputCode);

  return { code, setCode };
};
