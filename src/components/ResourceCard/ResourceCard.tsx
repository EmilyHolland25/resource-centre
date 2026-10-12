import type { MouseEvent } from 'react'
import type { Resource } from '../../types/resource'

interface ResourceCardProps {
  resource: Resource
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

function ResourceCard({ resource, onClick }: ResourceCardProps) {
 return (
  <article className="h-full">
    <button
      type="button"
      onClick={onClick}
      aria-label={resource.title}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-[#dce5ea] bg-white text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[rgb(50,161,179)]"
    >
      <img
        src={resource.thumbnail}
        alt=""
        className="aspect-[16/10] w-full object-cover transition duration-300 group-hover:scale-[1.02]"
      />

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex items-center justify-between gap-3">
          <span className="rounded-full bg-[#e5f4f5] px-3 py-1 text-xs font-semibold text-[rgb(36,73,104)]">
            {resource.category}
          </span>

          <span className="shrink-0 text-sm text-slate-500">
            {resource.duration} min
          </span>
        </div>

        <h3 className="mb-2 text-xl font-bold leading-snug text-[rgb(36,73,104)] transition-colors group-hover:text-[rgb(50,161,179)]">
          {resource.title}
        </h3>

        <p className="mb-4 text-sm leading-6 text-slate-600">
          {resource.description}
        </p>

        <div className="mt-auto flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600"
            >
              {tag}
            </span>
          ))}
        </div>

        <p className="mb-0 mt-4 border-t border-[#edf1f3] pt-3 text-xs text-slate-500">
         
          {new Date(resource.dateUploaded).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>
      </div>
    </button>
  </article>
)
}

export default ResourceCard