import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vite-plus/test";
import { GameLoadingShell } from "@/components/game-loading-shell";
import { TabooGame } from "@/components/taboo-game";

describe("initial game rendering", () => {
  it("keeps server/loading layout identical to the fresh interactive game", () => {
    const loading = document.createElement("div");
    loading.innerHTML = renderToString(<GameLoadingShell />);
    const interactive = document.createElement("div");
    interactive.innerHTML = renderToString(<TabooGame />);

    // Loading changes readiness, not text, styles, controls, or page geometry.
    loading.querySelector("main")?.removeAttribute("aria-busy");
    expect(loading.innerHTML).toBe(interactive.innerHTML);
    expect(loading.querySelector("footer")).not.toBeNull();
    expect(loading.querySelectorAll("header button")).toHaveLength(2);
    expect(loading.querySelector("#main-content")).not.toBeNull();
  });
});
