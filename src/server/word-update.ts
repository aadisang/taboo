import { createServerFn } from "@tanstack/react-start";
import { getCookie, setResponseHeader } from "@tanstack/react-start/server";
import { latestWordUpdate, wordUpdateCookie } from "@/config/word-update";

export const getWordUpdateDismissed = createServerFn({ method: "GET" }).handler(() => {
  setResponseHeader("Cache-Control", "private, no-store");
  return getCookie(wordUpdateCookie) === latestWordUpdate.id;
});
