import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const constitutionArticle = /\bArticle\s+\d+(?:\s*\(\d+\))?\s*,?\s*(?:of\s+)?(?:the\s+)?Constitution(?:\s+of\s+Kenya)?(?:,?\s+2010)?/gi;

test("links Article citations only when the Constitution is explicit", () => {
  assert.equal([... "Article 47".matchAll(constitutionArticle)].length, 0);
  assert.equal([... "Article 47 of the Constitution".matchAll(constitutionArticle)].length, 1);
  assert.equal([... "Article 47, Constitution of Kenya, 2010".matchAll(constitutionArticle)].length, 1);
  assert.equal([... "Article 47(1) of the Constitution".matchAll(constitutionArticle)].length, 1);
});

test("scenario text is passed through the linked renderer exactly once", async () => {
  const workspace = await readFile("components/session-workspace.tsx", "utf8");
  const topicPage = await readFile("src/app/topics/[slug]/page.tsx", "utf8");

  assert.match(workspace, /<LegalLinkedText text={scenario\.factPattern} \/>/);
  assert.match(workspace, /<LegalLinkedText text={scenario\.instructions} \/>/);
  assert.doesNotMatch(workspace, /\{scenario\.factPattern\}/);
  assert.doesNotMatch(workspace, /\{scenario\.instructions\}/);
  assert.match(topicPage, /<LegalLinkedText text={scenario\.fact_pattern} \/>/);
  assert.doesNotMatch(topicPage, /\{scenario\.fact_pattern\}/);
});
