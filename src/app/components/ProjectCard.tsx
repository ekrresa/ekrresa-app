import { ArrowUpRight } from 'lucide-react'
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
          group -mx-3 block translate-x-0 rounded-3xl px-3 py-4 transition-all
          duration-300 ease-out
          hover:translate-x-1 hover:bg-black/3
          sm:py-5
          dark:hover:bg-white/4
        "
      >
        <div className="min-w-0">
          <div className="
            flex flex-col gap-3
            sm:flex-row sm:items-center sm:gap-4
          ">
            <h3 className="
              font-display text-3xl leading-none tracking-[-0.04em] text-ink
              transition-colors duration-300 ease-out
              group-hover:text-accent
              dark:group-hover:text-[#d9c8f1]
            ">
              {project.title}
            </h3>
            <span className="
              inline-flex w-fit items-center gap-1.5 rounded-full border
              border-black/8 px-3 py-1 text-[0.65rem] font-medium
              tracking-[0.24em] text-muted/80 uppercase transition-colors
              duration-300 ease-out
              group-hover:border-black/14 group-hover:text-muted
              dark:border-white/10 dark:text-[#c7d1e8]
              dark:group-hover:border-white/16 dark:group-hover:text-[#e3e9fb]
            ">
              {formatProjectHost(project.link)}
              <ArrowUpRight
                aria-hidden="true"
                className="
                  size-3 shrink-0 transition-transform duration-300 ease-out
                  group-hover:translate-x-0.5 group-hover:-translate-y-0.5
                "
              />
            </span>
          </div>
          <p className="
            mt-4 max-w-2xl text-sm/7 text-muted
            sm:text-base
            dark:text-[#c7d1e8]
          ">
            {project.summary}
          </p>
        </div>
      </a>
    </article>
  )
}
