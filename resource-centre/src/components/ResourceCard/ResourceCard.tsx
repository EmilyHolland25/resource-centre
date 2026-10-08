import type { Resource } from '../../types/resource'

interface ResourceCardProps {
  resource: Resource
}

function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article>
      <img src={resource.thumbnail} alt={resource.title} />

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
    </article>
  )
}

export default ResourceCard