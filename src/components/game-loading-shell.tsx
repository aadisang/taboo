import { GameArea } from "@/components/game-area";
import { GameHeader } from "@/components/game-header";
import { GameLayout } from "@/components/game-layout";
import { ScoreDisplay } from "@/components/score-display";
import { DEFAULT_SETTINGS, DEFAULT_TEAMS } from "@/types/game";

const waitForGame = () => {};

export function GameLoadingShell() {
  return (
    <GameLayout
      busy
      header={
        <GameHeader
          gameStarted={false}
          hasPlayed={false}
          activeTeamName={DEFAULT_TEAMS[0]?.name}
          timeRemaining={DEFAULT_SETTINGS.timerDuration}
          onOpenSettings={waitForGame}
          onOpenHelp={waitForGame}
        />
      }
    >
      <ScoreDisplay teams={DEFAULT_TEAMS} currentTeamIndex={0} />
      <GameArea
        gameStarted={false}
        isPaused={false}
        currentCard={null}
        previousCard={null}
        hasPlayed={false}
        onCorrect={waitForGame}
        onSkip={waitForGame}
        onStartRound={waitForGame}
        onTogglePause={waitForGame}
      />
    </GameLayout>
  );
}
