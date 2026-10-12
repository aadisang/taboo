import { createFileRoute } from "@tanstack/react-router";
import { TabooGame } from "@/components/taboo-game";
import { WordUpdateBanner } from "@/components/word-update-banner";
import { siteMetadata } from "@/config/site";
import { getWordUpdateDismissed } from "@/server/word-update";

export const Route = createFileRoute("/")({
  ssr: "data-only",
  pendingMinMs: 0,
  loader: () => getWordUpdateDismissed(),
  head: () => ({
    meta: [
      { title: siteMetadata.title },
      { name: "description", content: siteMetadata.description },
      { name: "keywords", content: siteMetadata.keywords.join(", ") },
      { property: "og:title", content: siteMetadata.socialTitle },
      { property: "og:description", content: siteMetadata.description },
      { property: "og:url", content: siteMetadata.origin },
      { name: "twitter:title", content: siteMetadata.socialTitle },
      { name: "twitter:description", content: siteMetadata.description },
      { name: "twitter:url", content: siteMetadata.origin },
    ],
    links: [{ rel: "canonical", href: siteMetadata.origin }],
  }),
  component: HomePage,
});

function HomePage() {
  const updateDismissed = Route.useLoaderData();

  return (
    <div className="flex min-h-dvh flex-col">
      <WordUpdateBanner initiallyDismissed={updateDismissed} />
      <TabooGame />
    </div>
  );
}
