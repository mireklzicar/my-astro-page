import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import partytown from "@astrojs/partytown";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const base = isGitHubPages ? '/my-astro-page' : '';

export default defineConfig({
  site: "https://mireklzicar.com",
  base, // Dynamically set the base path
  integrations: [
    mdx(),
    sitemap(),
    solidJs(),
    tailwind({ applyBaseStyles: false }),
    partytown({ config: { forward: ["dataLayer.push"] } }),
  ],
  vite: {
    define: {
      'import.meta.env.BASE_PATH': JSON.stringify(base),
    },
  },
});