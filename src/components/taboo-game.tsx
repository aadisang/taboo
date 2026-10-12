"use client";

import { useMemo, useState } from "react";
import { useTimer } from "react-timer-hook";
import { GameArea } from "@/components/game-area";
import { GameHeader } from "@/components/game-header";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";
import { HelpDialog } from "@/components/dialogs/help-dialog";
import { ResetConfirmDialog } from "@/components/dialogs/reset-confirm-dialog";
import { SettingsDialog } from "@/components/dialogs/settings-dialog";
import { ScoreDisplay } from "@/components/score-display";
import { useGameKeyboard } from "@/hooks/use-game-keyboard";
import { useGameStore } from "@/stores/game";

export function TabooGame() {
  const [dialog, setDialog] = useState<"settings" | "help" | "reset" | null>(null);
  const gameStarted = useGameStore((s) => s.gameStarted);
  const timerDuration = useGameStore((s) => s.settings.timerDuration);
  const startRound = useGameStore((s) => s.startRound);
  const endRound = useGameStore((s) => s.endRound);

  // Placeholder expiry — useTimer needs an initial value, but autoStart is
  // false and handleStartRound calls restart() with a fresh expiry on every
  // round, so this is never actually counted down from.
  const initialExpiry = useMemo(() => new Date(Date.now() + timerDuration * 1000), [timerDuration]);
  const { totalSeconds, isRunning, pause, resume, restart } = useTimer({
    expiryTimestamp: initialExpiry,
    autoStart: false,
    onExpire: endRound,
  });

  const isPaused = gameStarted && !isRunning;

  function handleStartRound() {
    startRound();
    restart(new Date(Date.now() + timerDuration * 1000), true);
  }

  function handleTogglePause() {
    if (!gameStarted) return;
    if (isRunning) pause();
    else resume();
  }

  useGameKeyboard({
    onPause: handleTogglePause,
    onOpenHelp: () => setDialog("help"),
    onStartRound: handleStartRound,
    isPaused,
  });

  return (
    <>
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pt-12 pb-8 lg:max-w-3xl lg:py-8">
        <GameHeader
          timeRemaining={gameStarted ? totalSeconds : timerDuration}
          onOpenSettings={() => setDialog("settings")}
          onOpenHelp={() => setDialog("help")}
        />
        <div className="flex flex-1 flex-col justify-center gap-12">
          <ScoreDisplay />

          <GameArea
            isPaused={isPaused}
            onStartRound={handleStartRound}
            onTogglePause={handleTogglePause}
          />
        </div>
        <footer className="mt-12">
          <KeyboardShortcuts isPaused={isPaused} />
        </footer>
      </main>
      <SettingsDialog
        open={dialog === "settings"}
        onOpenChange={(open) => setDialog(open ? "settings" : null)}
        onResetRequest={() => setDialog("reset")}
      />
      <HelpDialog
        open={dialog === "help"}
        onOpenChange={(open) => setDialog(open ? "help" : null)}
      />
      <ResetConfirmDialog
        open={dialog === "reset"}
        onOpenChange={(open) => setDialog(open ? "reset" : null)}
      />
    </>
  );
}
