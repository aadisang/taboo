import { describe, expect, it } from "vite-plus/test";
import reviewedExpansion from "../corpus/expansion.json";
import { expansionCardTuples } from "@/data/expansion-cards";
import { allCardIds, getCardById, tabooCards } from "@/data/taboo-cards";

function normalized(text: string): string {
  return text
    .normalize("NFKD")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "");
}

describe("playable corpus", () => {
  it("contains unique targets and five distinct, nonempty traps per card", () => {
    const targets = tabooCards.map((card) => normalized(card.word));
    expect(new Set(targets).size).toBe(targets.length);
    for (const card of tabooCards) {
      expect(card.word, `target ${card.id}`).toBe(card.word.trim().toUpperCase());
      expect(normalized(card.word)).not.toBe("");
      expect(card.tabooWords, card.word).toHaveLength(5);
      const bans = card.tabooWords.map(normalized);
      expect(new Set(bans).size, card.word).toBe(5);
      expect(bans, card.word).not.toContain("");
      expect(bans, card.word).not.toContain(normalized(card.word));
      for (const ban of card.tabooWords) {
        expect(ban, card.word).toBe(ban.trim().toUpperCase());
      }
    }
  });

  it("ships exactly the reviewed expansion without its editorial notes", () => {
    expect(expansionCardTuples).toEqual(reviewedExpansion.map((row) => [row[1], row[2]]));
    expect(
      tabooCards
        .slice(-expansionCardTuples.length)
        .map(({ word, tabooWords }) => [word, tabooWords]),
    ).toEqual(expansionCardTuples);
    for (const card of tabooCards) {
      expect(Object.keys(card).sort()).toEqual(["id", "tabooWords", "word"]);
    }
  });

  it("makes every card reachable through the game's deck and lookup", () => {
    expect(allCardIds).toEqual(tabooCards.map((card) => card.id));
    expect(new Set(allCardIds).size).toBe(tabooCards.length);
    for (const [index, card] of tabooCards.entries()) {
      expect(card.id).toBe(index);
      expect(getCardById(card.id)).toBe(card);
    }
    expect(getCardById(-1)).toBeUndefined();
    expect(getCardById(tabooCards.length)).toBeUndefined();
  });

  it("appends new cards after the original ID range", () => {
    expect(getCardById(0)?.word).toBe("CAT");
    expect(getCardById(1279)?.word).toBe("SLANT");
    expect(getCardById(1280)?.word).toBe(expansionCardTuples[0][0]);
    expect(tabooCards).toHaveLength(1280 + expansionCardTuples.length);
  });
});
