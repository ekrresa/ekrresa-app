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
      my-10 block overflow-hidden rounded-3xl border border-black/8 bg-white/72
      shadow-[0_14px_40px_rgba(24,21,17,0.06)]
      dark:border-white/10 dark:bg-white/6
      dark:shadow-[0_16px_40px_rgba(0,0,0,0.24)]
    ">
      <img src={src} alt={alt} className="h-auto w-full" {...props} />
      {alt && (
        <span className="
          block border-t border-black/8 bg-black/2 px-4 py-3 text-center text-sm
          text-muted
          dark:border-white/10 dark:bg-white/5 dark:text-[#c7d1e8]
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
