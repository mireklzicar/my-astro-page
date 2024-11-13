import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function ensureDir(dir) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function removeDir(dir) {
  try {
    await fs.rm(dir, { recursive: true, force: true });
  } catch (error) {
    if (error.code !== 'ENOENT') {
      throw error;
    }
  }
}

async function copyImages() {
  const contentDir = path.join(__dirname, '../src/content');
  const publicDir = path.join(__dirname, '../public/content');

  try {
    // Clear existing content directory in public
    await removeDir(publicDir);
    await ensureDir(publicDir);

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
        await ensureDir(publicEntryDir);

        // Copy images
        const files = await fs.readdir(entryDir);
        for (const file of files) {
          if (/\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file)) {
            await fs.copyFile(
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