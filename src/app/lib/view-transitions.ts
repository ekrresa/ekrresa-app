export function articleImageTransitionName(slug: string) {
  return `article-image-${slug.replace(/[^a-zA-Z0-9-]/g, '-')}`
}
