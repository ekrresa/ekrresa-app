import { ArrowUpRight } from './ui-icons'
import { type Project } from 'content-collections'

interface ProjectCardProps {
  project: Project
}

function formatProjectHost(link: string) {
  return new URL(link).hostname.replace(/^www\./, '')
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article>
      <a
        href={project.link}
        target="_blank"
        rel="noreferrer"
        className="
          group -mx-3 block translate-x-0 rounded-2xl px-3 py-4 transition-all duration-300 ease-out
          hover:translate-x-1 hover:bg-ui-line/40
        "
      >
        <div className="min-inline-0">
          <div
            className="
              flex flex-col gap-3
              sm:flex-row sm:items-center sm:gap-4
            "
          >
            <h3
              className="
                font-display text-3xl leading-none tracking-[-0.04em] text-ui-ink transition-colors
                duration-300 ease-out
                group-hover:text-ui-accent
              "
            >
              {project.title}
            </h3>
            <span
              className="
                inline-flex items-center gap-1.5 rounded-full border border-ui-line px-3 py-1 text-[0.65rem]
                font-medium tracking-[0.24em] text-ui-muted/80 uppercase transition-colors
                duration-300 ease-out inline-fit
                group-hover:border-ui-line group-hover:text-ui-muted
              "
            >
              {formatProjectHost(project.link)}
              <ArrowUpRight
                aria-hidden="true"
                className="
                  shrink-0 transition-transform duration-300 ease-out block-3 inline-3
                  group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                "
              />
            </span>
          </div>
          <p
            className="
              mbs-4 text-sm/7 text-ui-muted max-inline-2xl
              sm:text-base
            "
          >
            {project.summary}
          </p>
        </div>
      </a>
    </article>
  )
}
