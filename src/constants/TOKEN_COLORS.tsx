import { TokenType } from "@/utils/tokenizer";

export const TOKEN_TEXT_COLORS: Record<TokenType, string> = {
  RESERVED: "text-[#ffa6c7]",
  DIRECTIVE: "text-[#c9e6ff]",
  LABEL: "text-[#e0ffd1]",
  NUMBER: "text-[#dcc7ff]",
  UNKNOWN: "text-[#f8f8f2]",
  COMMENT: "text-[#88846f]",
  NEWLINE: "text-[#88846f] opacity-80",
  WHITESPACE: "text-[#3f413d]",
  REGISTER: "",
  TYPE: "",
  MNEMONICS: "",
  VARIABLE: "",
  SECTION: "",
};

export const TOKEN_CHIP_COLORS: Record<TokenType, string> = {
  RESERVED: "bg-[#ffa6c7] text-[#1b1c19]",
  DIRECTIVE: "bg-[#c9e6ff] text-[#1b1c19]",
  LABEL: "bg-[#e0ffd1] text-[#1b1c19]",
  NUMBER: "bg-[#dcc7ff] text-[#1b1c19]",
  UNKNOWN: "bg-[#f8f8f2] text-[#1b1c19]",
  VARIABLE: "bg-[#f8f8f2] text-[#1b1c19]",
  REGISTER: "",
  TYPE: "bg-[#c04080] text-[#1b1c19]",
  MNEMONICS: "",
  SECTION: "",
  COMMENT: "",
  WHITESPACE: "",
  NEWLINE: "",
};
