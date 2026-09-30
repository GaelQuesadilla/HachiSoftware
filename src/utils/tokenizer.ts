export type TokenType =
  | "COMMENT"
  | "NEWLINE"
  | "WHITESPACE"
  | "LABEL"
  | "DIRECTIVE" // .model .code .data .stack ...
  | "KEYWORD" // flat stdcall proto proc invoke endp end DB DW DD DQ DT (+ extras)
  | "DATA_TYPE" // BYTE SBYTE WORD ... REAL10
  | "REGISTER_GP" // EAX EBX ECX EDX EBP ESP ESI EDI
  | "REGISTER_CONTROL" // EFLAGS EIP
  | "REGISTER_SEGMENT" // CS SS DS ES FS GS
  | "INSTRUCTION"
  | "NUMBER"
  | "STRING"
  | "IDENTIFIER"
  | "PUNCTUATION"
  | "UNKNOWN";

export type NumberBase = "hex" | "bin" | "oct" | "dec" | "real";

export interface Token {
  type: TokenType;
  start: number;
  end: number;
  value: string;
  base?: NumberBase;
  error?: string; 
}

const set = (s: string) => new Set(s.split(/\s+/));

const GP = set("EAX EBX ECX EDX EBP ESP ESI EDI");
const CONTROL = set("EFLAGS EIP");
const SEGMENT = set("CS SS DS ES FS GS");
const DATA_TYPES = set(
  "BYTE SBYTE WORD SWORD DWORD SDWORD FWORD QWORD TBYTE REALA REALS REAL10",
);

const KEYWORDS = set(
  "FLAT STDCALL PROTO PROC INVOKE ENDP END DB DW DD DQ DT SEGMENT ENDS DUP PTR",
);
const INSTRUCTIONS = set("MOV ADD SUB");

const LEXEME =
  /(?<comment>;[^\r\n]*)|(?<newline>\r?\n)|(?<ws>[ \t]+)|(?<string>'(?:[^'\r\n]|'')*'|"(?:[^"\r\n]|"")*")|(?<badString>['"][^\r\n]*)|(?<num>\d[\w]*(?:\.\d+(?:[eE][+-]?\d+)?)?)|(?<dot>\.[A-Za-z_]\w*\??)|(?<word>[A-Za-z_@$][\w@$?]*)(?<colon>:(?!:))?|(?<punct>[,+\-*/()\[\]:=<>!&|^~%?])|(?<other>[\s\S])/gy;

export const classifyNumber = (raw: string): NumberBase | null => {
  const s = raw.toLowerCase();
  if (/^\d+\.\d+(e[+-]?\d+)?$/.test(s)) return "real";
  if (/^\d[0-9a-f]*h$/.test(s)) return "hex";
  if (/^\d[0-9a-f]*r$/.test(s)) {
    const digits = s.slice(0, -1);
    const n = digits.startsWith("0") ? digits.length - 1 : digits.length;
    return [8, 16, 20].includes(n) || [8, 16, 20].includes(digits.length)
      ? "real"
      : null;
  }
  if (/^[01]+[by]$/.test(s)) return "bin";
  if (/^[0-7]+[qo]$/.test(s)) return "oct";
  if (/^\d+[dt]?$/.test(s)) return "dec";
  return null;
};

const classifyWord = (w: string): TokenType => {
  const u = w.toUpperCase();
  if (GP.has(u)) return "REGISTER_GP";
  if (CONTROL.has(u)) return "REGISTER_CONTROL";
  if (SEGMENT.has(u)) return "REGISTER_SEGMENT";
  if (DATA_TYPES.has(u)) return "DATA_TYPE";
  if (KEYWORDS.has(u)) return "KEYWORD";
  if (INSTRUCTIONS.has(u)) return "INSTRUCTION";
  return "IDENTIFIER";
};

export const tokenizer = (code: string): Token[] => {
  const tokens: Token[] = [];
  LEXEME.lastIndex = 0;
  let m: RegExpExecArray | null;

  while (LEXEME.lastIndex < code.length && (m = LEXEME.exec(code)) !== null) {
    const g = m.groups!;
    const value = m[0];
    const start = m.index;
    const tok: Token = { type: "UNKNOWN", value, start, end: start + value.length };

    if (g.comment !== undefined) tok.type = "COMMENT";
    else if (g.newline !== undefined) tok.type = "NEWLINE";
    else if (g.ws !== undefined) tok.type = "WHITESPACE";
    else if (g.string !== undefined) tok.type = "STRING";
    else if (g.badString !== undefined) tok.error = "Cadena sin cerrar";
    else if (g.num !== undefined) {
      const base = classifyNumber(value);
      if (base) {
        tok.type = "NUMBER";
        tok.base = base;
      } else tok.error = `Constante numérica inválida: ${value}`;
    } else if (g.dot !== undefined) {
      tok.type = "DIRECTIVE"; 
    } else if (g.word !== undefined) {
      tok.type = g.colon !== undefined ? "LABEL" : classifyWord(g.word);
    } else if (g.punct !== undefined) tok.type = "PUNCTUATION";
    else tok.error = "Carácter no reconocido";

    tokens.push(tok);
  }
  return tokens;
};
