"use client";

import { Button } from "@/components/ui/button";
import { useGameStore } from "@/stores/game";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPopup,
  DialogTitle,
} from "@/components/ui/dialog";

type ResetConfirmDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ResetConfirmDialog({ open, onOpenChange }: ResetConfirmDialogProps) {
  const resetGame = useGameStore((s) => s.resetGame);
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogPopup>
        <DialogHeader>
          <DialogTitle>Reset game?</DialogTitle>
          <DialogDescription>
            This resets teams to Team 1 and Team 2 and clears all scores and used cards. Your
            settings stay the same. This cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose render={<Button variant="outline" size="sm" />}>Cancel</DialogClose>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              resetGame();
              onOpenChange(false);
            }}
          >
            Reset game
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
