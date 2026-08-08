import { allPosts } from 'content-collections'
import { env } from 'cloudflare:workers'
import { ImageResponse } from 'workers-og'

const OG_IMAGE_WIDTH = 1200
const OG_IMAGE_HEIGHT = 630

function getTitleFontSize(title: string) {
  if (title.length > 75) return 48
  if (title.length > 55) return 56
  if (title.length > 35) return 64
  return 72
}

async function loadFont(request: Request, pathname: string) {
  const response = await env.ASSETS.fetch(new URL(pathname, request.url))

  if (!response.ok) {
    throw new Error(`Unable to load OG image font: ${pathname}`)
  }

  return response.arrayBuffer()
}

export async function ArticleOgImage({
  params,
  request,
}: {
  params: { slug: string }
  request: Request
}) {
  const post = allPosts.find(article => article.slug === params.slug)

  if (!post) {
    return new Response('Article not found', { status: 404 })
  }

  const [zodiak, generalSans] = await Promise.all([
    loadFont(request, '/fonts/zodiak.ttf'),
    loadFont(request, '/fonts/general-sans.ttf'),
  ])

  return new ImageResponse(
    <div
      style={{
        alignItems: 'flex-start',
        backgroundColor: '#F3F0E9',
        boxSizing: 'border-box',
        color: '#152D4A',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
        padding: '32px',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          fontFamily: 'Zodiak',
          fontSize: getTitleFontSize(post.title),
          fontWeight: 600,
          letterSpacing: '-0.04em',
          lineHeight: 1.05,
          maxWidth: '1080px',
        }}
      >
        {post.title}
      </div>

      <div
        style={{
          bottom: '32px',
          left: '32px',
          fontFamily: 'General Sans',
          fontSize: 24,
          fontWeight: 500,
          position: 'absolute',
        }}
      >
        ekrresa.com
      </div>
    </div>,
    {
      height: OG_IMAGE_HEIGHT,
      width: OG_IMAGE_WIDTH,
      fonts: [
        { data: zodiak, name: 'Zodiak', style: 'normal', weight: 600 },
        { data: generalSans, name: 'General Sans', style: 'normal', weight: 500 },
      ],
      headers: {
        'Cache-Control': 'public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400',
      },
    }
  )
}
