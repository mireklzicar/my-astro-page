import type { Site, Page, Links, Socials } from "@types"

// Global
export const SITE: Site = {
  TITLE: "Miroslav Lžičař",
  DESCRIPTION: "Welcome to personal website of Miroslav Lzicar – CTO and Co-Founder of Deep MedChem.",
  AUTHOR: "Miroslav Lzicar",
}

// Work Page
export const WORK: Page = {
  TITLE: "Work",
  DESCRIPTION: "Places I have worked.",
}

// Blog Page
export const BLOG: Page = {
  TITLE: "Blog",
  DESCRIPTION: "Writing on topics I am passionate about.",
}

export const PUBLICATIONS: Page = {
  TITLE: "Publications",
  DESCRIPTION: "Recent publications I have worked on.",
}

export const TALKS: Page = {
  TITLE: "Talks",
  DESCRIPTION: "Recent talks where I have been.",
}



// Projects Page 
export const PROJECTS: Page = {
  TITLE: "Projects",
  DESCRIPTION: "Recent projects I have worked on.",
}

// Search Page
export const SEARCH: Page = {
  TITLE: "Search",
  DESCRIPTION: "Search all posts and projects by keyword.",
}

// Links
export const LINKS: Links = [
  { 
    TEXT: "Home", 
    HREF: "/", 
  },
  // { 
  //   TEXT: "Work", 
  //   HREF: "/work", 
  // },
  { 
    TEXT: "Blog", 
    HREF: "/blog", 
  },
  { 
    TEXT: "Publications", 
    HREF: "/publications", 
  },
  { 
    TEXT: "Projects", 
    HREF: "/projects", 
  },
  { 
    TEXT: "Talks", 
    HREF: "/talks", 
  },
]

// Socials
export const SOCIALS: Socials = [
  { 
    NAME: "Email",
    ICON: "email", 
    TEXT: "mireklzicar seznam cz",
    HREF: "https://mireklzicar.com/contact",
  },
  { 
    NAME: "Github",
    ICON: "github",
    TEXT: "mireklzicar",
    HREF: "https://github.com/mireklzicar"
  },
  { 
    NAME: "LinkedIn",
    ICON: "linkedin",
    TEXT: "miroslavlzicar",
    HREF: "https://www.linkedin.com/in/miroslavlzicar/",
  },
  { 
    NAME: "Twitter",
    ICON: "twitter-x",
    TEXT: "miroslavlzicar",
    HREF: "https://twitter.com/miroslavlzicar",
  },
  { 
    NAME: "Orcid",
    ICON: "orcid",
    TEXT: "0000-0003-3192-8007",
    HREF: "http://orcid.org/0000-0003-3192-8007",
  },
]

