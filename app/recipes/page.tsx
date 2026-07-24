import type { Metadata } from "next";

import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Recipes" };

export default function RecipesPage() {
  return <ComingSoon title="Recipes" />;
}
