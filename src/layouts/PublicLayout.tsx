import React from "react";
import { usePortfolio } from "../hooks/api/usePortfolio";

import SubTempLayout from "../templates/subTemp/layouts/TempLayout";

const THEME_REGISTRY: Record<string, React.ElementType> = {
  subTemp: SubTempLayout,
};

export default function MainLayout() {
  const portfolioData = usePortfolio();

  const { profile, error } = portfolioData;

  const themeName = profile?.theme || "subTemp";

  const SelectedThemeLayout =
    THEME_REGISTRY[themeName] || THEME_REGISTRY["subTemp"];

  if (error) {
    return (
      <div className="flex flex-col h-screen items-center justify-center bg-zinc-950">
        <h2 className="text-4xl font-bold text-red-500 font-mono mb-2">404</h2>
        <p className="text-zinc-400">{error}</p>
        <a
          href="/"
          className="mt-6 px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-700"
        >
          Back to Home
        </a>
      </div>
    );
  }

  return <SelectedThemeLayout portfolioData={portfolioData} />;
}
