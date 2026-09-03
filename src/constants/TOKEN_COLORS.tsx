import { TokenType } from "@/utils/tokenizer";

export const TOKEN_TEXT_COLORS: Record<TokenType, string> = {
  KEYWORD: "text-[#f92672]",
  DIRECTIVE: "text-[#66d9ef]",
  LABEL: "text-[#a6e22e]",
  NUMBER: "text-[#ae81ff]",
  UNKNOWN: "text-[#f8f8f2]",
  COMMENT: "text-[#88846f]",
  NEWLINE: "text-[#88846f] opacity-80",
  WHITESPACE: "text-[#3f413d]",
};
export const TOKEN_CHIP_COLORS: Partial<Record<TokenType, string>> = {
  KEYWORD: "bg-[#f92672] text-[#272822]",
  DIRECTIVE: "bg-[#66d9ef] text-[#272822]",
  LABEL: "bg-[#a6e22e] text-[#272822]",
  NUMBER: "bg-[#ae81ff] text-[#272822]",
  UNKNOWN: "bg-[#f8f8f2] text-[#272822]",
};
