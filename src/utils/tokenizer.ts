import {
  dataDirective,
  dataType,
  mnemonics,
  registers,
  reserved,
  dotDirective,
  sections,
} from "@/constants/ASSEMBLY";

export type TokenType =
  | "COMMENT"
  | "LABEL"
  | "NUMBER"
  | "RESERVED"
  | "REGISTER"
  | "TYPE"
  | "DIRECTIVE"
  | "MNEMONIC"
  | "WHITESPACE"
  | "NEWLINE"
  | "VARIABLE"
  | "SECTION"
  | "UNKNOWN";

export interface Token {
  type: TokenType;
  start: number;
  end: number;
  value: string;
}

export const tokenizer = (code: string): Token[] => {
  let tokens: Token[] = [];

  // 1: COMMENTS, 2: LABELS, 3: NUMBERS, 4: WORDS, : NEWLINE, 6: WHITESPACES, , 7: UNKNOWN
  const regex =
    /(;.*)|([a-zA-Z_]\w*:)|(\b[0-9][0-9a-fA-F]*[hqodbrtyHQODBRTY]?\b)|(\.*[a-zA-Z_]\w*)|(\n)+|(\t| )+|(.)/g;

  let match: RegExpExecArray | null;

  while ((match = regex.exec(code)) !== null) {
    const value = match[0];
    const value_upper = match[0].toUpperCase();

    const start = match.index;
    const end = start + value.length;

    let type: TokenType = "UNKNOWN";

    if (match[1]) {
      type = "COMMENT";
    } else if (match[2]) {
      type = "LABEL";
    } else if (match[3]) {
      type = "NUMBER";

      let i = tokens.length - 1;
      while (i >= 0 && tokens[i].type === "WHITESPACE") i--; // i representa el índice del último token que no sea considerado un espacio en blanco

      if (tokens[i].type == "SECTION") {
        if (reserved.includes(value)) {
          type = "RESERVED";
        }
      }
    } else if (match[4]) {
      type = "VARIABLE";

      if (value.startsWith(".")) {
        type = "UNKNOWN";

        if (dotDirective.includes(value_upper)) {
          type = "DIRECTIVE";
        } else if (sections.includes(value_upper)) {
          type = "SECTION";
        }
      }
      // Directives
      else if (dataDirective.includes(value_upper)) {
        type = "DIRECTIVE";
      }
      //Mnemonics
      else if (mnemonics.includes(value_upper)) {
        type = "MNEMONIC";
      }
      // Registers
      else if (registers.includes(value_upper)) {
        type = "REGISTER";
      }
      // Data types
      else if (dataType.includes(value_upper)) {
        type = "TYPE";
      }
      // Reserved words
      else if (reserved.includes(value_upper)) {
        type = "RESERVED";
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

export const optimizedTokenizer = (code: string): Token[] => {
  /**
   * Devuelve una lista de tokens optimizados eliminando espacios en blanco y saltos de línea
   */

  let tokens = tokenizer(code);

  let optimizedTokens: Token[] = [];

  for (const token of tokens) {
    if (token.type === "COMMENT") {
      continue;
    }

    if (token.type === "NEWLINE") {
      const lastToken = optimizedTokens[optimizedTokens.length - 1];

      if (lastToken && lastToken.type === "NEWLINE") {
        lastToken.value += token.value;
        lastToken.end = token.end;
        continue;
      }
    }

    optimizedTokens.push(token);
  }
  return optimizedTokens;
};
