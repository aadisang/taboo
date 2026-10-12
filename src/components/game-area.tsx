"use client";

import { GameCard } from "@/components/game-card";
import { Rules } from "@/components/rules";
import { Button } from "@/components/ui/button";
import { getCardById } from "@/data/taboo-cards";
import { useGameStore } from "@/stores/game";

type GameAreaProps = {
  isPaused: boolean;
  onStartRound: () => void;
  onTogglePause: () => void;
};

export function GameArea({ isPaused, onStartRound, onTogglePause }: GameAreaProps) {
  const gameStarted = useGameStore((s) => s.gameStarted);
  const hasPlayed = useGameStore((s) => s.roundNumber > 0);
  const currentCard = useGameStore((s) =>
    s.currentCardId === null ? undefined : getCardById(s.currentCardId),
  );
  const previousCard = useGameStore((s) => {
    const id = s.previewingPrevious ? s.usedCardIds.at(-2) : undefined;
    return id === undefined ? undefined : getCardById(id);
  });
  const onCorrect = useGameStore((s) => s.handleCorrect);
  const onSkip = useGameStore((s) => s.handleSkip);
  if (gameStarted && isPaused) {
    return (
      <section id="main-content" className="text-center">
        {previousCard ? (
          <>
            <GameCard card={previousCard} />
            <p className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
              Previous card · paused
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-semibold tracking-tight">Round paused</h2>
          </>
        )}
        <Button className="mt-8" onClick={onTogglePause}>
          Resume round
        </Button>
      </section>
    );
  }

  if (gameStarted && currentCard) {
    return (
      <section id="main-content">
        <GameCard card={currentCard} />
        <div className="mt-10 grid grid-cols-2 gap-2">
          <Button variant="outline" size="lg" onClick={onSkip}>
            Skip
          </Button>
          <Button size="lg" onClick={onCorrect}>
            Correct
          </Button>
        </div>
      </section>
    );
  }

  if (!hasPlayed) {
    return (
      <section id="main-content" className="space-y-8">
        <div className="w-full rounded-xl border border-border bg-muted/30 p-5">
          <h2 className="section-label mb-4">How to play</h2>
          <Rules />
        </div>
        <div className="flex justify-center">
          <Button size="lg" onClick={onStartRound}>
            Start round
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="main-content" className="flex justify-center">
      <Button size="lg" onClick={onStartRound}>
        Start round
      </Button>
    </section>
  );
}
