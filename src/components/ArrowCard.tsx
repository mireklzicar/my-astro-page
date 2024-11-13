import { formatDate } from "@lib/utils"
import type { CollectionEntry } from "astro:content"

type Props = {
  entry: CollectionEntry<"blog"> | CollectionEntry<"projects"> | CollectionEntry<"publications">
  pill?: boolean
}

function getThumbnailPath(entry: Props['entry']) {
  const basePath = './src/content'
  return `${basePath}/${entry.collection}/${entry.slug}/${entry.data.thumbnail}`
}


export default function ArrowCard({ entry, pill }: Props) {
  return (
    <a 
      href={`/${entry.collection}/${entry.slug}`} 
      class="group p-5 flex flex-col border rounded-lg hover:bg-black/5 hover:dark:bg-white/10 border-black/15 dark:border-white/20 transition-colors duration-300 ease-in-out"
    >
      <div class="flex justify-between items-start gap-4">
        <div class="flex-grow min-w-0">
          <div class="flex flex-wrap items-center gap-2">
            {pill && (
              <div class="text-sm capitalize px-2 py-0.5 rounded-full border border-black/15 dark:border-white/25">
                {entry.collection === "blog" ? "post" : entry.collection === "projects" ? "project" : "publication"}
              </div>
            )}
            <div class="text-sm uppercase">
              {formatDate(entry.data.date)}
            </div>
          </div>
          <div class="font-semibold mt-3 text-black dark:text-white text-lg">
            {entry.data.title}
          </div>
          <div class="text-sm line-clamp-2 mt-2 group-hover:text-black group-hover:dark:text-white blend">
            {entry.data.summary}
          </div>
        </div>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke-width="2.5" 
          stroke-linecap="round" 
          stroke-linejoin="round" 
          class="stroke-current group-hover:stroke-black group-hover:dark:stroke-white flex-shrink-0"
        >
          <line 
            x1="5" 
            y1="12" 
            x2="19" 
            y2="12" 
            class="scale-x-0 group-hover:scale-x-100 translate-x-4 group-hover:translate-x-1 transition-all duration-300 ease-in-out" 
          />
          <polyline 
            points="12 5 19 12 12 19" 
            class="translate-x-0 group-hover:translate-x-1 transition-all duration-300 ease-in-out" 
          />
        </svg>
      </div>
      
      {entry.data.thumbnail && (
        <div class="mt-4 w-full aspect-[2/1] overflow-hidden rounded-md">
          <img 
            src={getThumbnailPath(entry)}
            alt={`Thumbnail for ${entry.data.title}`}
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-300 ease-in-out"
            loading="lazy"
          />
        </div>
      )}

      <ul class="flex flex-wrap mt-4 gap-1.5">
        {entry.data.tags.map((tag: string, index: number) => (
          <li class="text-xs uppercase py-0.5 px-2 rounded bg-black/5 dark:bg-white/20 text-black/75 dark:text-white/75">
            {tag}
          </li>
        ))}
      </ul>
    </a>
  )
}