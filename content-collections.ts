import { defineCollection, defineConfig } from "@content-collections/core";
import { compileMarkdown } from "@content-collections/markdown";
import { z } from "zod";
 
const projects = defineCollection({
  name: "projects",
  directory: "src/content/projects",
  include: "**/*.md",
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    content: z.string(),
    image: z.string(),
    stack: z.array(z.string()),
    link: z.string(),
    archived: z.boolean(),
    order: z.number(),
  }),
  transform:async(document, context)=> {
    const html = await compileMarkdown(context, document);

    // Extract project name from document path and convert image path
    const projectName = document._meta.directory;
    const imagePath = document.image === 'cover.png' 
      ? `/content/cover-${projectName}.png`
      : document.image;

    return {
      ...document,
      html,
      image: imagePath,
    };
  },
});
 
export default defineConfig({
  collections: [projects],
});