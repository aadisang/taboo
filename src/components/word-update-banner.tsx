"use client";

import { X } from "@phosphor-icons/react";
import { useState, type MouseEvent } from "react";
import { Alert, AlertAction, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { latestWordUpdate, wordUpdateCookie } from "@/config/word-update";

export function WordUpdateBanner({ initiallyDismissed }: { initiallyDismissed: boolean }) {
  const [dismissed, setDismissed] = useState(initiallyDismissed);

  function dismiss(event: MouseEvent<HTMLButtonElement>) {
    document.cookie = `${wordUpdateCookie}=${latestWordUpdate.id}; Path=/; Max-Age=31536000; SameSite=Lax${location.protocol === "https:" ? "; Secure" : ""}`;
    setDismissed(true);
    if (event.detail === 0) {
      document.querySelector<HTMLButtonElement>("main header button")?.focus();
    }
  }

  if (dismissed) return null;

  return (
    <Alert variant="banner" role="region" aria-label="Game update">
      <AlertTitle className="col-start-2 py-2 text-center">
        Updated! Added {latestWordUpdate.addedWords} new words.
      </AlertTitle>
      <AlertAction className="col-start-3 justify-self-end">
        <Button
          variant="ghost"
          size="icon"
          className="size-11 rounded-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-4 focus-visible:outline-foreground focus-visible:ring-0 active:bg-foreground/10 sm:size-11"
          aria-label="Dismiss word update"
          onClick={dismiss}
        >
          <X aria-hidden="true" />
        </Button>
      </AlertAction>
    </Alert>
  );
}
