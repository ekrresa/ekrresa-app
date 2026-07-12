import type { SVGProps } from 'react'

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string
  strokeWidth?: number | string
}

export type UiIcon = (props: IconProps) => React.JSX.Element

function iconSvgProps({ size = 24, strokeWidth = 2, className, ...rest }: IconProps) {
  return {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    className,
    'aria-hidden': rest['aria-hidden'] ?? true,
    ...rest,
  }
}

export const ArrowUpRight: UiIcon = props => (
  <svg {...iconSvgProps(props)}>
    <path d="M7 7h10v10" />
    <path d="M7 17 17 7" />
  </svg>
)

export const Briefcase: UiIcon = props => (
  <svg {...iconSvgProps(props)}>
    <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    <rect width="20" height="14" x="2" y="6" rx="2" />
  </svg>
)

export const House: UiIcon = props => (
  <svg {...iconSvgProps(props)}>
    <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
    <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
)

export const Menu: UiIcon = props => (
  <svg {...iconSvgProps(props)}>
    <path d="M4 5h16" />
    <path d="M4 12h16" />
    <path d="M4 19h16" />
  </svg>
)

export const MoonIcon: UiIcon = props => (
  <svg {...iconSvgProps(props)}>
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
  </svg>
)

export const MoonStar: UiIcon = props => (
  <svg {...iconSvgProps(props)}>
    <path d="M18 5h4" />
    <path d="M20 3v4" />
    <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401" />
  </svg>
)

export const Newspaper: UiIcon = props => (
  <svg {...iconSvgProps(props)}>
    <path d="M15 18h-5" />
    <path d="M18 14h-8" />
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2" />
    <rect width="8" height="4" x="10" y="6" rx="1" />
  </svg>
)

export const SunIcon: UiIcon = props => (
  <svg {...iconSvgProps(props)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
)

export const X: UiIcon = props => (
  <svg {...iconSvgProps(props)}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
)
