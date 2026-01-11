import { defineCollection, defineConfig } from '@content-collections/core'
import { compileMarkdown } from '@content-collections/markdown'
import { z } from 'zod'

const about = defineCollection({
	name: 'about',
	directory: 'src/content/about',
	include: 'index.md',
	schema: z.object({
		title: z.string(),
		skills: z.array(z.string()),
		experiences: z.array(
			z.object({
				company: z.string(),
				role: z.string(),
				period: z.string(),
				location: z.string(),
				description: z.string(),
			}),
		),
	}),
	transform: async (document, context) => {
		const html = await compileMarkdown(context, document)
		return {
			...document,
			html,
		}
	},
})

const projects = defineCollection({
	name: 'projects',
	directory: 'src/content/projects',
	include: '**/*.md',
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
	transform: async (document, context) => {
		const html = await compileMarkdown(context, document)

		return {
			...document,
			html,
		}
	},
})

const posts = defineCollection({
	name: 'posts',
	directory: 'src/content/posts',
	include: '**/*.mdx',
	schema: z.object({
		title: z.string(),
		tags: z.array(z.string()),
		summary: z.string(),
		date: z
			.union([z.string(), z.date()])
			.transform(d => (d instanceof Date ? d.toISOString() : d)),
		published: z.boolean(),
		updatedAt: z.string().nullish(),
		imageId: z.string().optional(),
		imageAlt: z.string().optional(),
		imageCredit: z.string().optional(),
		content: z.string(),
	}),
	transform: async (document, context) => {
		const postName = document._meta.directory
		return {
			...document,
			slug: postName,
			content: document.content,
		}
	},
})

export default defineConfig({
	collections: [about, projects, posts],
})
