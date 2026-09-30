import type { Token, TokenType } from "@/utils/tokenizer";

interface ChipProps {
  token: Token;
  showComments?: boolean;
}

const STYLES: Record<TokenType, string> = {
  COMMENT: "text-stone-500 italic",
  NEWLINE: "text-stone-500",
  WHITESPACE: "text-stone-500",
  LABEL: "text-fuchsia-400",
  DIRECTIVE: "text-emerald-400",
  KEYWORD: "text-rose-400",
  DATA_TYPE: "text-amber-300",
  REGISTER_GP: "text-sky-400",
  REGISTER_CONTROL: "text-cyan-300",
  REGISTER_SEGMENT: "text-teal-300",
  INSTRUCTION: "text-orange-400",
  NUMBER: "text-indigo-300",
  STRING: "text-lime-300",
  IDENTIFIER: "text-stone-100",
  PUNCTUATION: "text-stone-400",
  UNKNOWN: "text-red-400 underline decoration-wavy",
};

export const Chip = ({ token, showComments = false }: ChipProps) => {
  if (token.type === "COMMENT" && !showComments) return null;

  if (token.type === "NEWLINE")
    return (
      <span className={`${STYLES.NEWLINE} px-5`}>
        {"\\n"}
        <br />
      </span>
    );
  if (token.type === "WHITESPACE")
    return <span className={`${STYLES.WHITESPACE} px-2`}>_</span>;

  return (
    <span
      className={STYLES[token.type]}
      title={token.error ?? (token.base ? `${token.type} (${token.base})` : token.type)}
    >
      {token.value}
    </span>
  );
};

