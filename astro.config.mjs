import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import solidJs from "@astrojs/solid-js";
import partytown from "@astrojs/partytown";
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';

export default defineConfig({
  site: "https://mireklzicar.com",
  base: '.',
  integrations: [
    mdx({
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, {
          behavior: 'append',
          properties: {
            className: ['anchor-link'],
            ariaHidden: true,
            tabIndex: -1
          }
        }],
      ],
      remarkPlugins: [],
      extendMarkdownConfig: true,
      gfm: true,
    }),
    sitemap(),
    solidJs(),
    tailwind({ applyBaseStyles: false }),
    partytown({ config: { forward: ["dataLayer.push"] } }),
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
  },
  markdown: {
    syntaxHighlight: 'prism',
    remarkPlugins: [],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, {
        behavior: 'append',
        properties: {
          className: ['anchor-link'],
          ariaHidden: true,
          tabIndex: -1
        }
      }],
    ],
  },
});
