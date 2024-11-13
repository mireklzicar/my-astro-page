import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function copyImages() {
  const contentDir = path.join(__dirname, '../src/content');
  const publicDir = path.join(__dirname, '../public/content');

  try {
    // Clear existing content directory in public
    await fs.remove(publicDir);

    // Read all content directories
    const contentTypes = await fs.readdir(contentDir);

    for (const type of contentTypes) {
      const typeDir = path.join(contentDir, type);
      const stats = await fs.stat(typeDir);
      
      if (!stats.isDirectory()) continue;

      // Read all project directories
      const entries = await fs.readdir(typeDir);

      for (const entry of entries) {
        const entryDir = path.join(typeDir, entry);
        const stats = await fs.stat(entryDir);
        
        if (!stats.isDirectory()) continue;

        // Create target directory
        const publicEntryDir = path.join(publicDir, type, entry);
        await fs.ensureDir(publicEntryDir);

        // Copy images
        const files = await fs.readdir(entryDir);
        for (const file of files) {
          if (/\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file)) {
            await fs.copy(
              path.join(entryDir, file),
              path.join(publicEntryDir, file)
            );
          }
        }
      }
    }

    console.log('✓ Images copied successfully');
  } catch (error) {
    console.error('Error copying images:', error);
    process.exit(1);
  }
}

copyImages();