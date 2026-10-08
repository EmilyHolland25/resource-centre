import type { Resource } from '../../types/resource'

interface ResourceDetailsProps {
  resource: Resource
  onClose: () => void
}

function ResourceDetails({ resource, onClose }: ResourceDetailsProps) {
  return (
    <div role="dialog" aria-modal="true" aria-labelledby="resource-title">
      <button type="button" onClick={onClose} aria-label="Close">
        Close
      </button>

      <img src={resource.thumbnail} alt={resource.title} />

      <p>{resource.category}</p>

      <h2 id="resource-title">{resource.title}</h2>

      <p>{resource.description}</p>

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
    </div>
  )
}

export default ResourceDetails