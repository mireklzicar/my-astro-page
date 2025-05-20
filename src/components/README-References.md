# Enhanced Citations for Astro MDX

This set of components allows you to place citations/references where you want them in your MDX files, rather than having them automatically appended as footnotes.

## Problem Solved

In standard Markdown/MDX, when you use footnote syntax like `[^label]`, the footnotes are automatically collected and appended to the end of the document in a "Footnotes" section. These components give you control over where your citations appear.

## Components

This solution includes three components:

1. `References.astro` - Container for your citations
2. `Citation.astro` - Individual citation definition
3. `Cite.astro` - Citation reference in the text

## Features

- **Automatic numbering** - Citations are automatically numbered in the order they appear in the References section
- **Smooth scrolling** - Clicking on a citation reference smoothly scrolls to the citation definition
- **Back-to-reference links** - Each citation includes a "back" link that returns to where it was cited
- **Highlight effect** - Citations are briefly highlighted when navigated to
- **Dark mode support** - Styling adapts to light and dark modes
- **Responsive design** - Citations look good on all screen sizes

## Usage

1. Import the components in your MDX file:

```mdx
import References from '@components/References.astro';
import Citation from '@components/Citation.astro';
import Cite from '@components/Cite.astro';
```

2. Use the Cite component to reference citations in your content:

```mdx
This is a citation <Cite id="smith2025" /> in your text.

Another citation <Cite id="jones2024" /> here.
```

3. Place the References component with Citation components where you want your references to appear:

```mdx
<References title="References">
  <Citation id="smith2025">
    Smith, J. (2025). *Title of the paper*. Journal Name, 10(2), 123-145.
  </Citation>
  
  <Citation id="jones2024">
    Jones, A. (2024). *Another important paper*. Conference Proceedings, 45-67.
  </Citation>
</References>
```

## Props

### References Component

- `title` (optional): The heading text for the references section. Defaults to "References" if not provided.
- `className` (optional): Additional CSS classes to apply to the container.

### Citation Component

- `id` (required): The unique identifier for the citation, used to link from Cite components.

### Cite Component

- `id` (required): The identifier of the citation being referenced.
- `showId` (optional): Whether to show the ID in the citation or just a number. Defaults to false.

## Examples

### Basic Usage

```mdx
import References from '@components/References.astro';
import Citation from '@components/Citation.astro';
import Cite from '@components/Cite.astro';

## Introduction

This is my content with a citation <Cite id="smith" />.

<References title="References">
  <Citation id="smith">
    Smith, J. (2025). *Title of the paper*. Journal Name, 10(2), 123-145.
  </Citation>
</References>
```

### Custom Title

```mdx
<References title="Bibliography">
  <Citation id="smith">
    Smith, J. (2025). *Title of the paper*. Journal Name, 10(2), 123-145.
  </Citation>
</References>
```

## How It Works

This citation system:

1. Provides components for both citation references and definitions
2. Automatically numbers citations in the order they appear in the References section
3. Creates proper links between citations and their definitions with smooth scrolling
4. Adds "back to reference" links for easy navigation
5. Gives you complete control over where citations appear in your document
6. Adapts to light and dark modes automatically

## Demo

For a complete demonstration, see these example files:
- `src/content/blog/test/citations-example.mdx` - Basic usage example
- `src/content/blog/test/references-demo.mdx` - More detailed demonstration
- `src/content/blog/memecoins/index.mdx` - Real-world usage example