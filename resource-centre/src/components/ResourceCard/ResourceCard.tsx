import type { MouseEvent } from 'react'
import type { Resource } from '../../types/resource'

interface ResourceCardProps {
  resource: Resource
  onClick: (event: MouseEvent<HTMLButtonElement>) => void
}

function ResourceCard({ resource, onClick }: ResourceCardProps) {
  return (
    <article>
      <button
        type="button"
        onClick={onClick}
        aria-label={resource.title}
      >
        <img src={resource.thumbnail} alt="" />

        <p>{resource.category}</p>

        <h2>{resource.title}</h2>

        <p>{resource.duration} minutes</p>

        <p>
          {new Date(resource.dateUploaded).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
        </p>

        <div>
          {resource.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </button>
    </article>
  )
}

export default ResourceCard