const { toString } = Object.prototype;
const errorToString = Error.prototype.toString;
const regExpToString = RegExp.prototype.toString;
const symbolToString =
  typeof Symbol !== "undefined" ? Symbol.prototype.toString : () => "";

const SYMBOL_REGEXP = /^Symbol\((.*)\)(.*)$/;

function printNumber(val: any): string {
  if (val != +val) return "NaN";
  const isNegativeZero = val === 0 && 1 / val < 0;
  return isNegativeZero ? "-0" : `${val}`;
}

function printSimpleValue(
  val: any,
  quoteStrings: boolean = false
): string | null {
  if (val == null || val === true || val === false) return `${val}`;

  const typeOf = typeof val;
  if (typeOf === "number") return printNumber(val);
  if (typeOf === "string") return quoteStrings ? `"${val}"` : val;
  if (typeOf === "function") {
    return `[Function ${val.name || "anonymous"}]`;
  }
  if (typeOf === "symbol") {
    return symbolToString.call(val).replace(SYMBOL_REGEXP, "Symbol($1)");
  }

  const tag = toString.call(val).slice(8, -1);
  if (tag === "Date") {
    return isNaN(val.getTime()) ? `${val}` : val.toISOString(val);
  }
  if (tag === "Error" || val instanceof Error) {
    return `[${errorToString.call(val)}]`;
  }
  if (tag === "RegExp") return regExpToString.call(val);

  return null;
}

function printValue(value: any, quoteStrings: boolean): string {
  const result = printSimpleValue(value, quoteStrings);
  if (result !== null) return result;

  return JSON.stringify(
    value,
    function (key: string, value: any) {
      const result = printSimpleValue(this[key], quoteStrings);
      if (result !== null) return result;
      return value;
    },
    2
  );
}

export const mixed = {
  default: "O campo é inválido.",
  required: "O campo é obrigatório.",
  oneOf: "O campo deve ter um dos seguintes valores: ${values}.",
  notOneOf: "O campo não deve ter nenhum dos seguintes valores: ${values}.",
  notType: ({ type, value, originalValue }: any) => {
    const isCast = originalValue != null && originalValue !== value;
    let msg = `${
      `O campo deve ser do tipo \`${type}\`, ` +
      `mas o valor final é: \`${printValue(value, true)}\``
    }${
      isCast ? ` (cast do valor \`${printValue(originalValue, true)}\`).` : "."
    }`;

    if (value === null) {
      msg +=
        '\nSe a intenção era usar "null" como um valor em branco marque o esquema como `.nullable()`.';
    }

    return msg;
  },
  defined: "O campo não deve ser indefinido.",
};

export const string = {
  length: ({ length }: any) =>
    `O campo deve ter exatamente ${length} ${
      length === 1 ? "caractere" : "caracteres"
    }.`,
  min: ({ min }: any) =>
    `O campo deve ter pelo menos ${min} ${
      min === 1 ? "caractere" : "caracteres"
    }.`,
  max: ({ max }: any) =>
    `O campo deve ter no máximo ${max} ${
      max === 1 ? "caractere" : "caracteres"
    }.`,
  matches: 'O campo deve corresponder ao padrão: "${regex}".',
  email: "O campo deve ser um e-mail válido.",
  url: "O campo deve ser uma URL válida.",
  trim: "O campo não deve conter espaços adicionais no início nem no fim.",
  lowercase: "O campo deve estar em letras minúsculas.",
  uppercase: "O campo deve estar em letras maiúsculas.",
};

export const number = {
  min: "O campo deve ser maior ou igual a ${min}.",
  max: "O campo deve menor ou igual a ${max}.",
  lessThan: "O campo deve ser menor que ${less}.",
  moreThan: "O campo deve ser maior que ${more}.",
  notEqual: "O campo não deve ser igual a ${notEqual}.",
  positive: "O campo deve ser um número positivo.",
  negative: "O campo deve ser um número negativo.",
  integer: "O campo deve ser um número inteiro.",
};

export const date = {
  min: "O campo deve ser posterior a ${min}.",
  max: "O campo deve ser anterior a ${max}.",
};

export const boolean = {};

export const object = {
  noUnknown: "O campo tem chaves desconhecidas: ${unknown}.",
};

export const array = {
  min: ({ min }: any) =>
    `O campo deve ter pelo menos ${min} ${min === 1 ? "item" : "itens"}.`,
  max: ({ max }: any) =>
    `O campo deve ter no máximo ${max} ${max === 1 ? "item" : "itens"}.`,
};
