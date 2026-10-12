import type { ReactNode } from "react";
import { KeyboardShortcuts } from "@/components/keyboard-shortcuts";

type GameLayoutProps = {
  header: ReactNode;
  children: ReactNode;
  isPaused?: boolean;
  busy?: boolean;
};

export function GameLayout({ header, children, isPaused = false, busy = false }: GameLayoutProps) {
  return (
    <main
      aria-busy={busy || undefined}
      className="mx-auto flex w-full max-w-2xl flex-1 flex-col px-6 pt-12 pb-8 lg:max-w-3xl lg:py-8"
    >
      {header}
      <div className="flex flex-1 flex-col justify-center gap-12">{children}</div>
      <footer className="mt-12">
        <KeyboardShortcuts isPaused={isPaused} />
      </footer>
    </main>
  );
}
