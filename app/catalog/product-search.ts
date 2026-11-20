export function searchWords(value: string): string[] {
  return value.normalize("NFKD").toLowerCase().replace(/\p{M}/gu, "").match(/[\p{L}\p{N}]+/gu) ?? [];
}

export function matchesSearch(terms: string[], fields: (string | undefined)[]) {
  const words = searchWords(fields.join(" "));
  return terms.every((term) => words.some((word) => word.includes(term)));
}
