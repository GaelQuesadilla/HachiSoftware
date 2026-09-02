import { TokenType, Token } from "@/utils/tokenizer";

interface ChipProps {
  token: Token;
}
export const Chip = ({ token }: ChipProps) => {
  if (token.type === "COMMENT") return <></>;
  if (token.type === "NEWLINE")
    return (
      <span className="text-stone-500 px-5">
        {"\\n"}
        <br />
      </span>
    );
  if (token.type === "WHITESPACE")
    return <span className="text-stone-500 px-2">_</span>;

  if (token.type === "KEYWORD")
    return <span className="text-rose-500">{token.value}</span>;
  if (token.type === "DIRECTIVE")
    return <span className="text-emerald-600">{token.value}</span>;
  if (token.type === "LABEL")
    return <span className="text-fuchsia-700">{token.value}</span>;
  if (token.type === "NUMBER")
    return <span className="text-indigo-700">{token.value}</span>;

  return <span className="text-white">{token.value}</span>;
};
