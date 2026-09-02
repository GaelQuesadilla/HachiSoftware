export type TokenType =
  | "COMMENT"
  | "LABEL"
  | "NUMBER"
  | "KEYWORD"
  | "WHITESPACE"
  | "NEWLINE"
  | "UNKNOWN"
  | "DIRECTIVE";

export interface Token {
  type: TokenType;
  start: number;
  end: number;
  value: string;
}

const keywords = ["MOV", "ADD", "SUB", "DW", "SEGMENT"];

export const tokenizer = (code: string): Token[] => {
  let tokens: Token[] = [];

  // 1: COMMENTS, 2: LABELS, 3: NUMBERS, 4: WORDS, 6: NEWLINE, 6: WHITESPACES, , 7: UNKNOWN
  const regex =
    /(;.*\n)|([a-zA-Z_]\w*:)|(0x[0-9a-fA-F]+|\b\d+\b|[\da0-9a-fA-F]+h)|(\.*[a-zA-Z_]\w*)|(\n)+|(\t| )+|(.)/g;

  let match: RegExpExecArray | null;

  while ((match = regex.exec(code)) !== null) {
    const value = match[0];
    const start = match.index;
    const end = start + value.length;

    let type: TokenType = "UNKNOWN";

    if (match[1]) {
      type = "COMMENT";
    } else if (match[2]) {
      type = "LABEL";
    } else if (match[3]) {
      type = "NUMBER";
    } else if (match[4]) {
      if (value.startsWith(".")) {
        type = "DIRECTIVE";
      }
      if (keywords.includes(value.toUpperCase())) {
        type = "KEYWORD";
      }
    } else if (match[5]) {
      type = "NEWLINE";
    } else if (match[6]) {
      type = "WHITESPACE";
    }
    tokens.push({ type, value, start, end });
  }
  return tokens;
};
