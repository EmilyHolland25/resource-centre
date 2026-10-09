import { useEffect, useRef } from 'react'
import type { Resource } from '../../types/resource'

interface ResourceDetailsProps {
  resource: Resource
  onClose: () => void
}

function ResourceDetails({ resource, onClose }: ResourceDetailsProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
  closeButtonRef.current?.focus()
}, [])

 useEffect(() => {
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      onClose()
      return
    }

    if (event.key !== 'Tab') {
      return
    }

    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    const focusableElements = dialog.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )

    if (focusableElements.length === 0) {
      event.preventDefault()
      return
    }

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  document.addEventListener('keydown', handleKeyDown)

  return () => {
    document.removeEventListener('keydown', handleKeyDown)
  }
}, [onClose])

const dialogRef = useRef<HTMLDivElement>(null)

  return (
   <div
  ref={dialogRef}
  role="dialog"
  aria-modal="true"
  aria-labelledby="resource-title"
>
     <button
  ref={closeButtonRef}
  type="button"
  onClick={onClose}
  aria-label="Close"
>
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