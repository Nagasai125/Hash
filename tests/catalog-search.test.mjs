import assert from "node:assert/strict";
import test from "node:test";
import { matchesSearch, searchWords } from "../app/catalog/product-search.ts";

test("catalog search matches words across fields regardless of case, order, punctuation, and accents", () => {
  const fields = ["Geek Bar Pulse X2 50K · Miami Mint", "Vapes", "Limited Édition"];
  assert.ok(matchesSearch(searchWords(" MINT, geek 50k "), fields));
  assert.ok(matchesSearch(searchWords("edition vape"), fields));
  assert.ok(matchesSearch(searchWords(""), fields));
  assert.ok(!matchesSearch(searchWords("mint cigar"), fields));
});
