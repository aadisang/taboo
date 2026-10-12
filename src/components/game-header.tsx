"use client";

import { GearIcon, QuestionIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { formatGameTime } from "@/utils/time";
import { useGameStore } from "@/stores/game";

type GameHeaderProps = {
  timeRemaining: number;
  onOpenSettings: () => void;
  onOpenHelp: () => void;
};

export function GameHeader({ timeRemaining, onOpenSettings, onOpenHelp }: GameHeaderProps) {
  const gameStarted = useGameStore((s) => s.gameStarted);
  const hasPlayed = useGameStore((s) => s.roundNumber > 0);
  const activeTeamName = useGameStore((s) => s.teams[s.currentTeamIndex]?.name);
  const label = hasPlayed ? (activeTeamName ?? "Taboo") : "Taboo";

  return (
    <header className="mb-10 flex flex-wrap items-center justify-between gap-3 lg:mb-8">
      <h1 className="min-w-0 max-w-full flex-1 basis-32 wrap-anywhere text-base font-semibold tracking-tight">
        <bdi>{label}</bdi>
      </h1>
      <div className="flex max-w-full flex-wrap items-center gap-1">
        {gameStarted ? (
          <span
            role="timer"
            aria-label={`Time remaining ${formatGameTime(timeRemaining)}`}
            className="me-3 tabular text-sm text-foreground"
          >
            {formatGameTime(timeRemaining)}
          </span>
        ) : null}
        <Button
          variant="ghost"
          size="icon"
          className="size-11 sm:size-11"
          onClick={onOpenHelp}
          aria-label="How to play"
        >
          <QuestionIcon className="size-4" weight="regular" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="size-11 sm:size-11"
          onClick={onOpenSettings}
          aria-label="Open settings"
        >
          <GearIcon className="size-4" weight="regular" />
        </Button>
      </div>
      <span role="status" className="sr-only">
        {gameStarted && timeRemaining === 10 ? "10 seconds remaining" : ""}
      </span>
    </header>
  );
}
