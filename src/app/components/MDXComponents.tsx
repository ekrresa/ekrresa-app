import type { ComponentPropsWithoutRef } from 'react'

function CustomLink({ href, children, ...props }: ComponentPropsWithoutRef<'a'>) {
  const isInternalLink = href?.startsWith('/') || href?.startsWith('#')

  if (isInternalLink) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  )
}

function CustomImage({ src, alt, ...props }: ComponentPropsWithoutRef<'img'>) {
  return (
    <span className="
      my-10 block overflow-hidden rounded-3xl border border-ui-line bg-ui-surface
      shadow-ui-md
    ">
      <img src={src} alt={alt} className="h-auto w-full" {...props} />
      {alt && (
        <span className="
          block border-t border-ui-line bg-ui-line/20 px-4 py-3 text-center text-sm text-ui-muted
        ">
          {alt}
        </span>
      )}
    </span>
  )
}

export const components = {
  a: CustomLink,
  img: CustomImage,
}
