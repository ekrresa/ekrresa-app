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

async function processDirectory(sourceDir, typeName) {
  try {
    // Read all directories in the source folder
    const entries = await readdir(sourceDir, { withFileTypes: true });
    const dirs = entries.filter((entry) => entry.isDirectory());

    let movedCount = 0;
    let skippedCount = 0;

    for (const dir of dirs) {
      const dirName = dir.name;
      const coverPath = join(sourceDir, dirName, "cover.png");
      const destPath = join(publicContentDir, `cover-${dirName}.png`);

      // Check if source file exists
      if (!(await fileExists(coverPath))) {
        // Only log if it's missing in projects, might be optional for posts initially
        if (typeName === "project") {
          console.log(
            `⚠️  Skipping ${typeName} ${dirName}: cover.png not found`
          );
        }
        continue;
      }

      // Check if destination already exists (idempotent)
      if (await fileExists(destPath)) {
        console.log(
          `⏭️  Skipping ${typeName} ${dirName}: already exists at ${destPath}`
        );
        skippedCount++;
        continue;
      }

      // Copy the file
      await copyFile(coverPath, destPath);
      console.log(
        `✅ Moved ${typeName} ${dirName}: ${coverPath} → ${destPath}`
      );
      movedCount++;
    }

    return { moved: movedCount, skipped: skippedCount };
  } catch (error) {
    console.error(`❌ Error processing ${typeName}s:`, error);
    throw error;
  }
}

async function moveCoverImages() {
  try {
    // Ensure public/content directory exists
    await mkdir(publicContentDir, { recursive: true });

    console.log("Processing Projects...");
    const projectsResult = await processDirectory(projectsDir, "project");

    const totalMoved = projectsResult.moved;
    const totalSkipped = projectsResult.skipped;

    console.log(`\n📊 Summary: ${totalMoved} moved, ${totalSkipped} skipped`);
  } catch (error) {
    console.error("❌ Error moving cover images:", error);
    process.exit(1);
  }
}

moveCoverImages();
