# Building a better Taboo corpus

Research and editorial pass: 2026-10-11.

The useful unit is a playable card, not a dictionary entry. A good card makes a player recognize the answer immediately, reach for an obvious clue, notice it is forbidden, and find another way through. Obscurity should not supply the difficulty.

## What shipped

- 200 new cards, bringing the deck from 1,280 to 1,480 cards. Twenty additions in each of ten categories prevent this batch becoming mostly animals, food, or movie references.
- Five forbidden words and two written escape routes for each addition. `expansion.json` is the editorial source. The routes are examples of permitted descriptions, not hints shown during play.
- 19 repaired legacy cards, including three duplicate concepts replaced in their existing slots. See the repair ledger below.
- A reproducible real-word candidate importer and corpus checks. The raw vocabulary is never added to the game automatically.
- The pinned EFF list yields 7,296 distinct unreviewed candidates after removing normalized deck matches and source duplicates. It corroborates 98 new targets exactly.

These are agent-authored, editorially reviewed cards, not human-playtested cards. Two written routes establish that a description is possible. They do not establish a solve rate, enjoyment score, or fairness across groups. The original 1,280 cards have received a structural audit and targeted repairs, not a complete semantic rewrite.

## The standard

The repository previously specified the five-word card shape and gameplay rules, but no editorial rubric. This pass uses the following standard for a mixed group of English-speaking teens and adults. It is a working product assumption, not a claim that every age or language level will know every target.

| Gate             | Accept when                                                                                            | Reject or rewrite when                                                                            |
| ---------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Recognition      | A general player can picture the object, action, situation, or idea                                    | The challenge is knowing an obscure term, local celebrity, or specialist fact                     |
| One clear answer | There is a conventional name and a usable intended meaning                                             | A typo, unnatural translation, arbitrary phrase, or ambiguous fragment supplies the answer        |
| Natural traps    | All five bans are things someone would plausibly say while describing it                               | A ban is filler, irrelevant, misspelled, or present only to fill slot five                        |
| Useful coverage  | Bans obstruct several obvious routes, such as appearance, use, context, or synonym                     | Five close synonyms cover only one route, or two bans spend slots on the same inflection          |
| Remaining routes | Two actual descriptions remain possible without spelling, rhyming, gesture, or forbidden word families | All identifying details are forbidden, or the only escape needs specialist trivia                 |
| Variety          | The card adds a distinct experience to the existing deck                                               | It is a plural, spacing change, alternate spelling, or near-identical concept already represented |
| Audience fit     | The intended meaning works in a general party setting                                                  | A niche reference or adult-only meaning would surprise the default group                          |

Not every trap must cover a different semantic category. `FONDUE` reasonably blocks both CHEESE and CHOCOLATE. But five generic adjectives such as NICE, GOOD, GREAT, FUN, and POPULAR do not make a meaningful card.

For multiple meanings, prefer two familiar meanings over five scattered ones. `BLUFF` can be a poker tactic or a steep cliff. Both are recognizable routes. Do not combine obscure senses merely to claim the card is solvable.

## How to create and algorithmize cards

1. **Collect candidate targets.** Start with concrete everyday vocabulary, common activities and recognizable situations. Add some feelings and abstract ideas. Keep target selection separate from forbidden-word creation. Record the source and reuse terms for every imported list.
2. **Normalize and deduplicate.** Compare case, accents, spaces, hyphens and punctuation. Then review plurals, inflections, aliases and equivalent concepts manually. Do not blindly strip a final S: GLASSES and GLASS can be different things. Existing aliases such as VACUUM and VACUUM CLEANER still need a broader editorial pass.
3. **Check recognition and meaning.** Dictionary membership is evidence that a word exists, not that a party guest recognizes it. Frequency, concreteness, and age-of-acquisition evidence can rank candidates. Proper names, regional slang and specialist words need deliberate audience decisions. A phrase such as JET LAG can be a better target than a dictionary lemma.
4. **Write an ordinary first description.** Before inventing bans, explain the target naturally. Then list roughly 8 to 12 associations: synonyms, appearance, function, location, parts, habitual actions and common cultural references. Discard weak associations rather than stretching to five.
5. **Choose five useful traps.** Start with the words most likely to occur in an ordinary explanation. Merge inflections and redundant synonyms. Never spend a slot on the target itself or a component already forbidden by the word-parts convention. Ensure that several obvious descriptions are made harder.
6. **Try to escape.** Write two complete descriptions that avoid the target, bans and their obvious word families. At least one should use ordinary general knowledge. Check that neither route depends on gestures, initials, rhyme or spelling. Prefer genuinely different approaches, such as a use versus a scene, over paraphrases of the same sentence.
7. **Review the batch.** Look for repeated templates, domain overload, stale brands, accidental adult material, ambiguous meanings and near-duplicate targets. A category count is a guard against monotonous expansion, not a measured model of the ideal whole deck.
8. **Run checks, then playtest.** Structural checks can reject broken data. Only players can establish whether the difficulty and pacing work.

### A ranking model for a future larger pipeline

For a target `t` and an associated term `a`, collect ordinary descriptions from independent people who have not seen proposed bans. Estimate `P(a | t)` as the fraction of descriptions using that term or an agreed word family. This is a suggestion for future collection; no such measurements were collected in this pass.

Select a set of five bans that balances:

```text
natural-description coverage
+ coverage of distinct clue routes
- redundant word families
- irrelevant or obscure associations
- cost of eliminating every usable escape route
```

Use measured frequency to rank candidates, then enforce the two-route gate. Do not simply choose the five nearest embedding neighbors: similarity is not the same as what someone actually says. A thesaurus mostly supplies synonyms; strong Taboo traps also include functions, settings and memorable properties. Association datasets can suggest terms, but their licenses and cultural biases matter.

This repository implements structural gates, reproducible vocabulary discovery and written route evidence. It does not pretend to implement semantic quality scoring, English lemmatization, or automated fun detection. The two-route check catches exact phrases and simple suffixes; a reviewer must still catch irregular forms, compounds and semantic loopholes.

### Worked examples

`HAMMOCK`: SWING, SLEEP, TREE, HANG, NET. These block movement, use, support and material. A legal route is "A suspended bed for a lazy afternoon outdoors." Another is "You lie in this fabric sling between two posts."

`PROCRASTINATE`: DELAY, LATER, PUT OFF, WORK, TOMORROW. The situation still carries the answer: "Clean your entire kitchen rather than begin the essay due tonight." Familiar behavior makes an abstract verb playable.

The existing `CUPID` card banned HEART twice. It now uses LOVE for the fifth trap. The existing `TYPEWRITER` duplicated COMPUTER and used ELECTRONIC. Its new bans are KEYBOARD, RIBBON, PAPER, MANUAL and LETTER.

## Comparable games and card collections

These are first-party pages inspected during this pass. Counts are publisher claims at the time of access. The judgments below apply to the inspected pages and examples, not exhaustive audits of each site's catalog. None of their decks was bulk imported.

| Source                                                                    | Evidence inspected                                                                                                                                                                         | Fit against our standard                                                                                                                                                                                             |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [PlayTabooGame](https://playtaboogame.com/cards)                          | Advertises 6,720 English cards with five bans. The visible sample includes PRISON with CALABOOSE and GAOL; AMYGDALA with throat-surgery associations; POSSUM with skunk-like associations. | Useful proof of scale, but the sample fails our familiarity and semantic-accuracy gates. AMYGDALA is a brain structure, not a tonsil. Copying the catalog would import quality problems.                             |
| [Dronk](https://dronkapp.com/games/taboo/)                                | Advertises 200 original cards across eight categories, five bans per card, with rules covering parts and inflections. Includes an explicitly adult category.                               | A bounded, categorized deck is a good precedent. General objects are useful target inspiration. Adult cards and regional pop culture require separate audience treatment. No deck reuse permission established here. |
| [CardYard](https://www.cardyard.ai/taboo-word-generator)                  | Generator landing page, concrete examples, custom themes, and advice to review cards that feel too easy or obscure.                                                                        | Its "obvious enough to be dangerous" description fits the game. The page does not establish that generated outputs consistently meet that bar. Generator output needs the same review as ours.                       |
| [ESL Active](https://eslactive.com/esl-taboo-words/)                      | Over 300 vocabulary targets in eight categories, with three bans per target and learner-level explanations.                                                                                | Strong source of familiar target ideas and sensible domains. Three-ban classroom cards cannot become our five-ban cards by adding two arbitrary words. Paired regional synonyms need normalization.                  |
| [ESL Vault](https://eslvault.com/taboo-esl-game/)                         | Describes 60 printable cards, an upper-intermediate audience, and a beginner variant that turns forbidden words into positive clues.                                                       | Good evidence that audience level changes difficulty. The alternate beginner rules do not match our game. Reviewed the explanatory page, not every card in the printable sheets.                                     |
| [Lingolex Lingo-Taboo](https://lingolex.com/games/taboo/index.php?list=1) | Describes 60-second rounds, ordinary explanatory words as traps, no drawing or gesture, and a BOOKS example with four bans.                                                                | Its design explanation supports obstructing habitual descriptions. The four-ban example is useful research, not a ready-made five-ban import.                                                                        |

## Real-word lists and association data

| Resource                                                                            | What it offers                                                                                                                                                                                          | Decision                                                                                                                                                                                                                                                                                                       |
| ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [EFF long wordlist](https://www.eff.org/files/2016/07/18/eff_large_wordlist.txt)    | 7,776 entries. [Joseph Bonneau's methodology](https://www.eff.org/deeplinks/2016/07/new-wordlists-random-passphrases) prioritizes recognition and concreteness, with spelling and memorability filters. | Used for lexical corroboration and the candidate pool. Exactly 98 of the 200 new targets occur in it. The other 102 are independently authored target choices. EFF's password-specific exclusions make this an incomplete source for a game; its remaining inflections and specialist words still need review. |
| [ESDB, formerly SCOWL](https://wordlist.aspell.net/)                                | Spelling, dialect, variants, basic part of speech and inflection information; configurable spellchecker dictionaries.                                                                                   | Promising spelling and alias checker. Not a measure of playability. Pin an actual release and inspect its bundled notices before importing. No ESDB data shipped here.                                                                                                                                         |
| [wordfreq](https://github.com/rspeer/wordfreq)                                      | Multi-source frequency estimates and small/large lists. Code is Apache-2.0; included data uses CC-BY-SA-4.0 with source-specific attribution described in its README.                                   | Useful future familiarity ranking, not a five-ban generator. Data reuse needs the data attribution/share-alike terms, not just the code license. No package or frequency data added.                                                                                                                           |
| [Small World of Words](https://smallworldofwords.org/en/project/research)           | Human word associations. Its [English release repository](https://github.com/SimonDeDeyne/SWOWEN-2018) describes 12,292 cues and over three million responses.                                          | Closely matches how traps should be discovered. The published CC-BY-NC-ND terms are not suitable for assuming unrestricted adaptation into a game deck. No data imported.                                                                                                                                      |
| [Google 10,000 English words](https://github.com/first20hours/google-10000-english) | An unmaintained web-frequency list derived from Peter Norvig's compilation.                                                                                                                             | Useful research lead, but web frequency admits non-game vocabulary and the inspected overview did not establish a clean reuse path for all variants. Not imported.                                                                                                                                             |
| [Moby Word Lists](https://www.gutenberg.org/ebooks/3201)                            | Large word and phrase lists, listed by Project Gutenberg as public domain in the USA.                                                                                                                   | Useful broad candidate reservoir. Too broad to treat as party vocabulary. No bulk import; public-domain status is not a familiarity score.                                                                                                                                                                     |
| [dolph/dictionary](https://github.com/dolph/dictionary)                             | README describes 25,322 entries in `popular.txt`, intersecting ENABLE with television/movie-script frequency lists.                                                                                     | Smaller than a full dictionary, but its claim that everyone knows the words is not player evidence. The inspected page did not settle all source reuse terms. Not imported.                                                                                                                                    |

The EFF importer is attributed to the Electronic Frontier Foundation and Joseph Bonneau. EFF's [current copyright policy](https://www.eff.org/copyright) grants CC-BY-4.0 for original material unless otherwise noted. The generated candidate file carries that attribution, links, source checksum and a description of our transformations. No EFF endorsement is implied. The game cards' forbidden words and routes were authored for this project; the importer does not obtain prewritten cards from EFF or competitors.

## Reproduce the workflow

Python 3 is needed for the corpus commands. It uses only the standard library.

```sh
vp run corpus:audit
vp run corpus:words
vp run corpus:build
vp check
vp test run
vp run build
```

- `corpus:words` downloads the EFF list once, verifies the SHA-256 in `eff-source.json`, and caches the unchanged source under `corpus/.cache/`. It fails if the content changes. Remove the cache to retry the original URL; review a changed source before changing the pin.
- It writes `corpus/candidates.json`, carrying source metadata and an explicit unreviewed status. Case, punctuation and spacing duplicates are removed against the current deck and within the source. Inflections and semantic aliases are still candidates for manual rejection.
- Both cache and candidate output are gitignored. They are local research artifacts, not runtime inputs. Rerunning the command reconstructs them.
- `expansion.json` contains `[category, target, five bans, two routes]` per row. Edit this source, then run `corpus:build`. The generated `src/data/expansion-cards.ts` contains only target/bans tuples, keeping editorial notes out of the client bundle.
- `corpus:audit` checks the expansion's shape, spelling format, distinct bans, duplicate targets, target-component bans and simple forbidden-word leaks in routes. It does not claim to spellcheck English or judge semantics.
- `tests/corpus.test.ts` checks the full playable deck, exact agreement with the editorial source, lookup/deck reachability, and the original ID boundary. A stale generated deck fails the test.

### Why the importer stops at candidates

EFF includes terms such as REHYDRATE and UNTHAWED, along with families such as OVERCOOK, OVERCROWD and OVERDRESS. Their presence in a real list does not give us five good traps. Prefix restrictions designed for password uniqueness also omit excellent short game words. Bulk acceptance would produce padding, repeated concepts and weak clue sets.

There is no justified "maximum good deck size" without player evidence. This pass stops at 200 newly authored cards with written route evidence rather than claiming that thousands of unreviewed words are ready.

## Legacy repair ledger

IDs are zero-based and retain their original positions. New cards start at ID 1280.

| IDs                    | Repair                                                                                                                                                                                                                  |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 803, 810, 830, 984     | CHUTES AND LADDERS, MINNIE MOUSE, TRANSCRIPT, FLINTSTONES spelling                                                                                                                                                      |
| 1035, 1041, 1048, 1098 | CUBICLE, THESAURUS, CHANDELIER, GRAFFITI spelling; GRAFFITI's THUG trap replaced with TAG                                                                                                                               |
| 1173, 1273             | LEPRECHAUN and NIECE spelling                                                                                                                                                                                           |
| 1010, 1039, 1200       | DIAMOND, TYPEWRITER and CUPID receive five distinct traps                                                                                                                                                               |
| 1233, 1245, 1271       | DELIVER and LEPRECHAUN clue spellings; stray period removed from BEAUTIFUL                                                                                                                                              |
| 928                    | TOUNGE duplicated TONGUE after correcting its typo. Replaced with TONSIL. Routes: "One of the little lumps at the back of your tongue" and "Doctors sometimes remove these after repeated bouts of painful swallowing." |
| 994                    | FORREST's clues described the existing FOREST target. Replaced with MEADOW. Routes: "An open sunny clearing full of wild blooms" and "A butterfly-filled expanse between stretches of woodland."                        |
| 1167                   | SUN GLASSES duplicated SUNGLASSES. Replaced with SUNSCREEN. Routes: "What you rub on before spending the afternoon at the beach" and "A cream that filters ultraviolet rays."                                           |

These substitutions keep the rest of the ID-indexed deck stable. They are three replacement concepts, not three extra appended cards.

### Remaining legacy review work

The older deck still has plural/alias pairs such as COW/COWS, CLOUD/CLOUDS, BOTTLE/BOTTLES, ROSE/ROSES, TRAFFIC LIGHT/STOP LIGHT and VACUUM/VACUUM CLEANER. It also has dated brands such as CINGULAR, regional university names, compressed phrases such as GOODLUCK, and weak traps such as ANT's FORMIC. These should be reviewed with the same rubric before claiming the entire corpus meets it. Exact and punctuation-normalized duplicates are now checked automatically; semantic equivalents are not.

## Playtest before claiming balance

Try a mixed sample of legacy and new cards with at least three independent groups. Do not show the written escape routes to clue-givers. Record the target, group, familiar/unfamiliar response, correct/skip/buzz outcome, seconds spent, and any dispute or "that was a good one" reaction. Keep unknown-word skips separate from difficulty caused by bans.

Suggested first review flags, not validated thresholds:

- Two independent groups fail to recognize a target: move it out of the general deck or replace it.
- Two groups call a trap unrelated or dispute the intended meaning: rewrite it.
- Repeated instant solves using the same unblocked obvious clue: consider blocking that route if the card is meant to be challenging.
- Several knowledgeable groups spend most of a round stuck: relax a trap or replace the card.

Use the existing deck as a comparison rather than optimizing for a made-up universal solve rate. Some easy cards keep rounds moving. Some harder cards make a satisfying recovery possible. The aim is a varied sequence of recognizable problems, with misses caused by the clue challenge rather than unfamiliar vocabulary.
