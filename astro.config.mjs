import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import solidJs from "@astrojs/solid-js"
import partytown from '@astrojs/partytown';

export default defineConfig({
  site: "https://mireklzicar.com",
  // Add this if you're not using a custom domain:
  // base: '/repository-name',
  integrations: [
    mdx(), 
    sitemap(),
    solidJs(),
    tailwind({ applyBaseStyles: false }),
    partytown({config: {forward: ["dataLayer.push"],}})
  ],
})