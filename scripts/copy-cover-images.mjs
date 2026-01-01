import { readdir, copyFile, mkdir, access } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, "..");

const projectsDir = join(rootDir, "src/content/projects");
const publicContentDir = join(rootDir, "public/content");

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function moveCoverImages() {
  try {
    // Ensure public/content directory exists
    await mkdir(publicContentDir, { recursive: true });

    // Read all project directories
    const entries = await readdir(projectsDir, { withFileTypes: true });
    const projectDirs = entries.filter((entry) => entry.isDirectory());

    let movedCount = 0;
    let skippedCount = 0;

    for (const projectDir of projectDirs) {
      const projectName = projectDir.name;
      const coverPath = join(projectsDir, projectName, "cover.png");
      const destPath = join(publicContentDir, `cover-${projectName}.png`);

      // Check if source file exists
      if (!(await fileExists(coverPath))) {
        console.log(`⚠️  Skipping ${projectName}: cover.png not found`);
        continue;
      }

      // Check if destination already exists (idempotent)
      if (await fileExists(destPath)) {
        console.log(
          `⏭️  Skipping ${projectName}: already exists at ${destPath}`
        );
        skippedCount++;
        continue;
      }

      // Copy the file (we use copy instead of move to keep source for git)
      await copyFile(coverPath, destPath);
      console.log(`✅ Moved ${projectName}: ${coverPath} → ${destPath}`);
      movedCount++;
    }

    console.log(`\n📊 Summary: ${movedCount} moved, ${skippedCount} skipped`);
  } catch (error) {
    console.error("❌ Error moving cover images:", error);
    process.exit(1);
  }
}

moveCoverImages();
